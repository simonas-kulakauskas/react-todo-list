// import { useState } from 'react'
import { todoListItems } from './data';
import { useState } from 'react';
import './App.css'


/* ✅/
* 1. Get data from 'data.js' and render as list items on unordered list.              [❌] 
* 2. Add the ability to add items to our own state list.                              [❌] 
* 3. Add checkmarks and ability to check / cross-out tasks that have been completed.  [❌]     
* 4. Add the ability to save to-do items locally.                                     [❌] 
*/


function DisplayListItems({ listItems }) {
  return (
    listItems.map((item) => {
      return (
        <li key={item.key}>{item.value}</li>
      );
    })
  );
}

function App() {
  return (
    <>
      <h1>To-do List: </h1>
      {/* Inset code below*/}
      <ul>
        <DisplayListItems listItems={todoListItems} />
      </ul>
    </>
  );
}

export default App;