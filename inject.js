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

document.addEventListener("click", function (e) {
  chrome.storage.local.get({"selected": []}, function(list) {
    console.log(list);
    list = list["selected"];
    list.push(e.srcElement.nodeName);
    chrome.storage.local.set({"selected": list});
    console.log(list);
  });
  e.preventDefault();
}, false);