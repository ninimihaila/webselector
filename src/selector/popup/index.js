import React, { useState } from "react";
import ReactDOM from "react-dom";
import './index.css';

const Popup = () => {
  const browser = chrome; ///Chrome/.test(navigator.userAgent) ? chrome : browser;

  let [selected, setSelected] = useState([]);

  browser.storage.local.get({"selected": {}}, function(list) {
    list = list["selected"];

    browser.tabs.query({active:true, lastFocusedWindow:true}, function(tabs){
      let tab = tabs[0];
      let msgs = [];
      list = list[tab.url];
      for(let el of list){
        msgs.push(el);
      }
      // renderList();
      setSelected(msgs)
    });
  });

  function toggle() {
    chrome.runtime.sendMessage({
      type: "toggle"
    }, resp => console.log('resp ', resp))
  }

  return (
    <div className="Popup" onClick={toggle} >
      This popup is just an example.<br/>
      Click it to open the user guide.
      <ul>
      {
        selected.map(sel => {
          return <li>{sel}</li>
        })
      }
      </ul>
    </div>
  );
};


ReactDOM.render(<Popup />, document.querySelector('main'));
