import { useState } from 'react'
import { todoListItems } from './data';
import './App.css'


/*
TODO: Should try to refactor some code to make it more legible, and better describe what functions are doing.
TODO: Should try to 'distil' down some of my functions to more simpler ones that do *ONE JOB*.

TODO: Still need to implement the 'checkedOff' feature
*/

function RenderListItems({ currentListItems }) { /* Render's the items of the list*/
  return (
    <>
      {currentListItems.map((item) => { // Iterating through all items.
        return (
          item.checkedOff ? <li key={item.key}><s>{item.itemValue}</s></li> : <li key={item.key}>{item.itemValue}</li> // Check off if needed.
        );
      })}
    </>
  ); 
}

function RenderTodoForm() { /* Renders the list and holds it's logic */
    const [currentListItems, setCurrentListItems] = useState(todoListItems);
    function handleClick(value) {
      document.getElementById('itemInput').value = "";
      setCurrentListItems([
        ...currentListItems,
        {
          key: currentListItems.length + 1,
          itemValue: value,
          checkedOff: false
        }
      ])
    }
    return (
      <>
        <form>
              <label htmlFor='itemInput'>New Item: </label>
              <input type='text' id='itemInput' name='itemInput' placeholder='Enter here...'></input>
              <button onClick={e => {
                e.preventDefault(); 
                handleClick(document.getElementById("itemInput").value)
                }}>Add</button>
        </form>
        <ul>
          <RenderListItems currentListItems={currentListItems}/>
        </ul>
      </>
    );
  }

export default function App() {
  return (
    <>
      <h1>To-do List: </h1>
      <RenderTodoForm />
    </>
  );
}
