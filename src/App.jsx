import { useState } from 'react'
import './App.css'
import { todoListItems } from './data';

function App() {

  return (
    <>
      <h1>To Do List: </h1>
      <ul> {/* Example List */}
        <li key={todoListItems[0].key} style={
          todoListItems[0].checkedOff && {textDecoration: 'line-through'} /* If it's checked off value is true, strike through it*/
        }>{todoListItems[0].itemValue}</li>
        <li key={todoListItems[1].key}>{todoListItems[1].itemValue}</li>
      </ul>
      <ul> {/* Actual List */}

      </ul>
    </>
  );
}

export default App
