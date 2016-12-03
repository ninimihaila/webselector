var msgs = [];

function renderList() {
  for(var i=0; i<msgs.length; i++){
    console.log(msgs);
 	 	document.getElementById('list').textContent += msgs[i] + "\n";
	}
}

document.addEventListener('DOMContentLoaded', function() {
	chrome.storage.local.get({"selected": []}, function(list) {
    console.log(list);
		list = list["selected"];
		for(var i=0; i<list.length; i++){
			msgs.push(list[i]);
		}
    renderList();
	});
});

