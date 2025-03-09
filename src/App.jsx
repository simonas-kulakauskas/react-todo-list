import { useState } from 'react'
import './App.css'
import { todoListItems } from './data';


function App() {
  return (
    <>
      <h1>To Do List: </h1>
      <ul>
        {todoListItems.map((item) => { // Iterating through all items.
          return (
            item.checkedOff ? <li key={item.key}><s>{item.itemValue}</s></li> : <li key={item.key}>{item.itemValue}</li> // Check off if needed.
          );
        })}
      </ul>
    </>
  );
}

export default App
