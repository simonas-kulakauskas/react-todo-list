import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts'
import './App.css'

/* ✅/❌
* 1. Get data from 'data.js' and render as list items on unordered list.              [✅] 
* 2. Add the ability to add items to our own state list.                              [✅] 
* 3. Add checkmarks and ability to check / cross-out tasks that have been completed.  [✅]     
* 4. Add the ability to save to-do items locally.                                     [✅] 
* 5. Individual delete buttons for items                                              [✅]
*   5b. Fix delete buttons...                                                         [✅]
* 6. Reduce the return code for DisplayListItems()                                    [✅]
*/

function App() {

  const [listItems, setListItems] = useLocalStorage('TODO_LIST_ITEMS', []); // Grab local todo list, otherwise set to empty array
  
  useEffect(() => { // Stores todo list locally after every re-render
    window.localStorage.setItem('TODO_LIST_ITEMS', JSON.stringify(listItems))
  }, [listItems])

  function toggleCheckBox(itemKey) { 
    setListItems(listItems.map((item) => {
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
    setListItems(listItems.filter((item) => item.key !== itemKey))
  }

  function DisplayListItems() {
    if (listItems.length === 0) { // Show hint if todo list is empty
        return (
          <h3>Please add an item to your list to begin!</h3>
        )
    }

    return (
      listItems.map((item) => { // Render's list items with style and values depending on the item's own properties
        return (
          <li key={item.key}>
            <input type="checkbox" id={item.key} onChange={() => toggleCheckBox(item.key)} checked={item.checked}></input> 
            <label htmlFor={item.key} style={item.checked ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}>{item.value}</label>
            <button onClick={() => deleteListItem(item.key)}>X</button>
          </li>
        );
      })
    )
  }
  
  function AddListItem() {
    const resetInputBox = () => document.getElementById("todoItemInputBox").value = "";
    const getNextKey = () => listItems.length ? (listItems[listItems.length-1].key + 1) : (0);

    function handleAddItem(newValue) {
      resetInputBox();
      if (newValue.trim() !== "") { // Don't add item if it's empty...
        setListItems([
          ...listItems,
          {
            key: getNextKey(),
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