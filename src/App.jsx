import { useState } from 'react'
import './App.css'
import { todoListItems } from './data';


function DisplayTodoList({ currentListItems }) { 
  return (
    <ul>
      {currentListItems.map((item) => { // Iterating through all items.
        return (
          item.checkedOff ? <li key={item.key}><s>{item.itemValue}</s></li> : <li key={item.key}>{item.itemValue}</li> // Check off if needed.
        );
      })}
    </ul>
  ); 
}

function DisplayListAddForm() {
  function handleClick() {
    alert("I've been pressed!")
  }

  return (
    <form>
          <label htmlFor=''>New Item: </label>
          <input type='text' id='itemInput' name='itemInput' placeholder='Enter here...'></input>
          <button onClick={handleClick}>Add</button>
    </form>
  );
}

function App() {
  return (
    <>
      <h1>To Do List: </h1>

      <DisplayListAddForm />
    
      <DisplayTodoList currentListItems={todoListItems}/>
    </>
  );
}

export default App
