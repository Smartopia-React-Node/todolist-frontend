import React, { useState } from 'react';
import './App.css';
import axios from 'axios';


function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  //helper function
  function addItem() {

    if (!newItem) {
      alert("please enter something");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem
    };
    setItems(oldList => [...oldList, item]);
    setNewItem("");
  }

  function deleteitem(id){

    const newarray=items.filter(item=>item.id!==id);
    console.log(newarray);
    setItems(newarray);
  }
 const submit=(e)=>{

  e.preventDefault();
  axios.post("https://to-do-list-backend-aied.onrender.com/api/ylist",items).then((response)=>{
console.log(response);

  })
 }
  return (
    <div className="main">
      {/* header */}
      <h1>ToDo List App</h1>

      {/* input */}
      <input
        type='text'
        placeholder='add a text...'
        value={newItem}
        onChange={e => setNewItem(e.target.value)}

      />
      <button onClick={() => addItem()}>Add</button>
          <button onClick={submit}>Add To  Database </button>
      <table className="tab2">
      <tr className="tab1">
      <th className="tab1">task</th>
      <th>Date</th>

      </tr>
    
        {items.map(item => {
          return (
            <tr className="tab1">
          <td className="tab1"  key={item.id}>{item.value}<button onClick={()=>deleteitem(item.id)}> X</button></td>
          </tr>
          )
        })}
       
        </table>
    </div>
  );
}

export default App;
