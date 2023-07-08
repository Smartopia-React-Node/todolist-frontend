import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';


function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getAllTodos = async ()=>{
      await axios.get("https://to-do-list-backend-0wqa.onrender.com/api/list").then((res)=>{
          console.log(res.data);
          setItems([...res.data]); //expanding the array

      }).catch((err)=>{
          console.log(err);
      })
    }
    getAllTodos()
  }, [])

  //helper function
 async function addItem() {

    if (!newItem) {
      alert("please enter something");
      return;
    }

    const obj = {
     
      item: newItem
    };
        console.log(obj);
     await axios.post("https://to-do-list-backend-0wqa.onrender.com/api/list",obj).then((response)=>{

    console.log(response.data);
    setItems(oldList => [response.data, ...oldList]);
    setNewItem("");

    })
 
  }

  function deleteitem(id){

    const newarray=items.filter(item=>item._id!==id);
    console.log(newarray);
    setItems(newarray);
  }
 const submit=(e)=>{

  e.preventDefault();
  axios.post("https://to-do-list-backend-0wqa.onrender.com/api/list",{}).then((response)=>{
console.log(response.data);

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
    
        {items.map(ele => {
          return (
            <tr className="tab1">
          <td className="tab1"  key={ele._id}>{ele.item}<button onClick={()=>deleteitem(ele._id)}> X</button></td>
          </tr>
          )
        })}
       
        </table>
    </div>
  );
}

export default App;

