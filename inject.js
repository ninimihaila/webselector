var hoverClass = "web-selector-ext-mouse-hover";
var selectedListClass = "web-selector-ext-selected-list";
var extensionClass = "web-selector-ext-list";
var listClass = "web-selector-ext-li";
var removeEntryClass = "web-selector-ext-remove-btn";

var prev = null;
var selectedList = null;

document.addEventListener("mousemove", function (e) {
  var srcElement = e.srcElement;

  if (prev != null) {
    prev.classList.remove(hoverClass);
  }
  if (srcElement.className.indexOf(extensionClass) !== -1) {
    return;
  }
  srcElement.classList.add(hoverClass);

  prev = srcElement;
}, false);

chrome.storage.local.set({"selected": {}});  // TODO: remove after testing

var createListEntry = function (text, position) {
  var entry = document.createElement('li');
  var entryContent = document.createElement('div');
  var entryBtn = document.createElement('span');
  entryBtn.textContent = 'X';
  entryBtn.position = position;
  entryBtn.classList = extensionClass;
  entryBtn.classList += ' ' + removeEntryClass;
  entryBtn.onclick = function(el){
    removeEntry(el.srcElement.position);
  }
  entryContent.textContent = text;
  entryContent.classList = extensionClass;
  entryContent.appendChild(entryBtn);
  entry.appendChild(entryContent);
  entry.classList = extensionClass;
  entry.classList += ' ' + listClass;
  return entry
}

var drawSelectedList = function (list) {
  if (list.length > 0) {
    selectedList = document.createElement('div');
    selectedList.classList = selectedListClass;
    selectedList.classList += ' ' + extensionClass;
    document.body.appendChild(selectedList);
    for(var i=0; i<list.length; i++){
      var entry = createListEntry(list[i], i);
      selectedList.appendChild(entry);
    }
    console.log('list drawn');
  } else {
    document.body.removeChild(selectedList);
    console.log('list removed');
  }
}

var xpath = function (el, queryType=5) {
  if (typeof el == "string") return document.evaluate(el, document, null, queryType, null)
  if (!el || el.nodeType != 1) return ''
  if (el.id) return "//*[@id='" + el.id + "']"
  //if (el.hasAttribute("class")) return "//*[@class='" + el.getAttribute("class") + "']"
  var sames = [].filter.call(el.parentNode.children, function (x) { return x.tagName == el.tagName })
  return xpath(el.parentNode) + '/' + el.tagName.toLowerCase() + (sames.length > 1 ? '['+([].indexOf.call(sames, el)+1)+']' : '')
}

document.addEventListener("click", function (e) {
  // Don't include the displayed list
  if (e.srcElement.className.indexOf(extensionClass) !== -1) {
    return;
  }

  chrome.storage.local.get({"selected": {}}, function(list) {
    console.log(list);
    list = list["selected"];
    // var url = document.location.host;  // Just the host
    var url = document.location.href;
    if (!list[url]){
      console.log('no list');
      list[url] = [];
    }
    list[url].push(xpath(e.srcElement));
    chrome.storage.local.set({"selected": list});
    console.log(list);
    drawSelectedList(list[url]);
  });
  e.preventDefault();
}, false);