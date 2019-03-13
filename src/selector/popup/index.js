import React, { useState } from "react";
import ReactDOM from "react-dom";
import './index.css';

const Popup = () => {
  const brow = /Chrome/.test(navigator.userAgent) ? chrome : browser;

  let [selected, setSelected] = useState([]);

  brow.storage.local.get({"selected": {}}, function(list) {
    list = list["selected"];

    brow.tabs.query({active:true, lastFocusedWindow:true}, function(tabs){
      let tab = tabs[0];
      let msgs = [];
      list = list[tab.url];
      for(let el of list){
        msgs.push(el);
      }
      console.log(list)
      // renderList();
      setSelected(msgs)
    });
  });

  return (
    <div className="Popup" /*onClick={openTheUserGuide}*/>
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
