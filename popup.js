var msgs = [];

function removeEntry(position) {
  console.log(position);
}

function createListEntry(text, position) {
  var entry = document.createElement('li');
  var entryContent = document.createElement('div');
  var entryBtn = document.createElement('button');
  entryBtn.textContent = 'Delete';
  entryBtn.position = position;
  entryBtn.onclick = function(el){
    removeEntry(el.srcElement.position);
  }
  entryContent.textContent = text;
  entryContent.appendChild(entryBtn);
  entry.appendChild(entryContent);
  return entry
}

function renderList() {
  for(var i=0; i<msgs.length; i++){
    var entry = createListEntry(msgs[i], i);
 	 	document.getElementById('list').appendChild(entry);
	}
}

document.addEventListener('DOMContentLoaded', function() {
	chrome.storage.local.get({"selected": {}}, function(list) {
		list = list["selected"];
    list = list["stackoverflow.com"];
		for(var i=0; i<list.length; i++){
			msgs.push(list[i]);
		}
    renderList();
	});
});

