var hover_class = "mouse_hover";

var prevDOM = null;

document.addEventListener("mousemove", function (e) {
  var srcElement = e.srcElement;

  if (prevDOM != null) {
    prevDOM.classList.remove(hover_class);
  }

  srcElement.classList.add(hover_class);

  prevDOM = srcElement;
}, false);

chrome.storage.local.set({"selected": {}});

document.addEventListener("click", function (e) {
  chrome.storage.local.get({"selected": {}}, function(list) {
    console.log(list);
    list = list["selected"];
    var url = document.location.host;
    if (!list[url]){
      console.log('no list');
      list[url] = [];
    }
    list[url].push(e.srcElement.nodeName);
    chrome.storage.local.set({"selected": list});
    console.log(list);
  });
  e.preventDefault();
}, false);