import { useState } from 'react'
import './App.css'
import { todoListItems } from './data';


function App() {
  const [newTodoListItems, setNewTodoListItems] = useState(todoListItems);

  function handleClick() {
    alert("I've been clicked!");
  }

  return (
    <>
      <h1>To Do List: </h1>

      <label for="newItemInput">New Note: </label>
      <input id="newItemInput" type="text" placeholder='Click add...'></input>
      <button id="addItem" style={{marginLeft: 5}} onClick={handleClick}>ADD</button>

      <ul>
        {newTodoListItems.map((item) => { // Iterating through all items.
          return (
            item.checkedOff ? <li key={item.key}><s>{item.itemValue}</s></li> : <li key={item.key}>{item.itemValue}</li> // Check off if needed.
          );
        })}
      </ul>
    </>
  );
}

export default App
