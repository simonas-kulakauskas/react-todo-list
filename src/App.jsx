import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts'
import './App.css'

/* ✅/❌
* 1. Get data from 'data.js' and render as list items on unordered list.              [✅] 
* 2. Add the ability to add items to our own state list.                              [✅] 
* 3. Add checkmarks and ability to check / cross-out tasks that have been completed.  [✅]     
* 4. Add the ability to save to-do items locally.                                     [✅] 
* 5. Individual delete buttons for items                                              [✅]
*   5b. Fix delete buttons...                                                         [❌]
*/

function App() {

  const [newListItems, setNewListItems] = useLocalStorage('TODO_LIST_ITEMS', []);
  
  useEffect(() => {
    window.localStorage.setItem('TODO_LIST_ITEMS', JSON.stringify(newListItems))
  }, [newListItems])

  function toggleCheckBox(itemKey) {
    setNewListItems(newListItems.map((item) => {
      if (item.key === itemKey) {
        return {
          ...item,
          checked: !item.checked
        }
      } else {
        return item;
      }
    }))
  }

  function deleteListItem(itemKey) {
    setNewListItems(newListItems.filter((item) => item.key !== itemKey))
  }


  function DisplayListItems() {

    if (newListItems.length === 0) {
        return (
          <h3>Please add an item to your list to begin!</h3>
        )
    }

    return (
      newListItems.map((item, index) => {
        if (item.checked) {
          return (
            <li key={index}>
              <input type="checkbox" id={index} onChange={() => toggleCheckBox(item.key)} checked={true}></input> 
              <s><label htmlFor={index}>{item.value}</label></s>
              <button onClick={() => deleteListItem(item.key)}>X</button>
            </li>
          );
        } else {
          return (
            <li key={index}>
              <input type="checkbox" id={index} onChange={() => toggleCheckBox(item.key)} checked={false}></input> 
              <label htmlFor={index}>{item.value}</label>
              <button onClick={() => deleteListItem(item.key)}>X</button>
            </li>
          );
        }
      })
    );
  }
  
  function AddListItem() {
    const resetInputBox = () => document.getElementById("todoItemInputBox").value = "";

    function handleAddItem(newValue) {
      resetInputBox();
      if (newValue.trim() !== "") { // Don't add item if it's empty...
        setNewListItems([
          ...newListItems,
          {
            key: newListItems.length + 1,
            value: newValue,
            checked: false
          }
        ])
      }
    }
  
    return (
      <form>
        <input id="todoItemInputBox" type="text" placeholder="Enter item here..."></input>
        <button type="submit" onClick={(e) => {
          e.preventDefault();
          handleAddItem(document.getElementById("todoItemInputBox").value);
          }}>Click</button>
      </form>
    );
  }

  return (
    <>
      <h1>To-do List: </h1>
      
      {/* Inset code below*/}
      <AddListItem />
      <ul>
        <DisplayListItems />
      </ul>
    </>
  );
}

export default App;