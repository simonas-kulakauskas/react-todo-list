import { useState } from 'react'
import './App.css'
import { todoListItems } from './data';


function RenderListItems({ currentListItems }) { /* Render's the items of the list*/
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

function RenderTodoForm() { /* Renders the list and holds it's logic */
    const [currentListItems, setCurrentListItems] = useState(todoListItems);
  
    function handleClick(value) {
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
        <RenderListItems currentListItems={currentListItems}/>
      </>
    );
  }

function App() {
  return (
    <>
      <h1>To-do List: </h1>
      <RenderTodoForm />
    </>
  );
}

export default App
