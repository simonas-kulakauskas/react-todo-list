import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import './App.css';

function AddListItem({ listItems, setListItems }) {
  // Adding items onto the list
  const resetInputBox = () =>
    (document.getElementById('todoItemInputBox').value = '');
  const getNextKey = () =>
    listItems.length ? listItems[listItems.length - 1].key + 1 : 0;

  function handleAddItem(newValue) {
    resetInputBox();
    if (newValue.trim() !== '') {
      // Don't add item if it's empty...
      setListItems([
        ...listItems,
        {
          key: getNextKey(),
          value: newValue,
          checked: false,
        },
      ]);
    }
  }

  const deleteStrickenItems = () =>
    setListItems(listItems.filter((item) => !item.checked && item)); // Filter our items that are checked off.

  return (
    <form>
      <input
        id="todoItemInputBox"
        type="text"
        placeholder="Enter item here..."
        // style={{ marginRight: 10 }}
      ></input>
      <button
        type="submit"
        // style={{ marginRight: 10 }}
        onClick={(e) => {
          e.preventDefault();
          handleAddItem(document.getElementById('todoItemInputBox').value);
        }}
      >
        Click
      </button>
      <button
        id="clearFinishedButton"
        onClick={(e) => {
          e.preventDefault();
          deleteStrickenItems();
        }}
      >
        Clear Finished
      </button>
    </form>
  );
}

function DisplayListItems({ listItems, setListItems }) {
  if (listItems.length === 0) {
    // Show hint if todo list is empty
    return <h3>Please add an item to your list to begin!</h3>;
  }

  function deleteListItem(itemKey) {
    setListItems(listItems.filter((item) => item.key !== itemKey));
  }

  function handleToggleCheckBox(itemKey) {
    setListItems(
      listItems.map((item) => {
        if (item.key === itemKey) {
          return {
            ...item,
            checked: !item.checked,
          };
        } else {
          return item;
        }
      })
    );
  }

  function ListItem({ item, handleToggleCheckBox, deleteListItem }) {
    return (
      <li key={item.key} className="todo-list-items">
        <input
          type="checkbox"
          id={item.key}
          onChange={() => handleToggleCheckBox(item.key)}
          checked={item.checked}
          style={{ marginRight: 10 }}
        ></input>
        <label
          htmlFor={item.key}
          style={
            item.checked
              ? { textDecoration: 'line-through', marginRight: 10 }
              : { textDecoration: 'none', marginRight: 10 }
          }
        >
          {item.value}
        </label>
        <button
          onClick={() => deleteListItem(item.key)}
          style={{ marginBottom: 5 }}
        >
          X
        </button>
      </li>
    );
  }
  return listItems.map((item) => {
    // Render's list items with style and values depending on the item's own properties
    return (
      <ListItem
        key={item.key}
        item={item}
        handleToggleCheckBox={handleToggleCheckBox}
        deleteListItem={deleteListItem}
      ></ListItem>
    );
  });
}

export default function App() {
  const [listItems, setListItems] = useLocalStorage('TODO_LIST_ITEMS', []); // Grab local todo list, otherwise set to empty array

  useEffect(() => {
    // Stores todo list locally after every re-render
    window.localStorage.setItem('TODO_LIST_ITEMS', JSON.stringify(listItems));
  }, [listItems]);

  return (
    <>
      <h1>To-do List: </h1>
      <AddListItem listItems={listItems} setListItems={setListItems} />
      <ul>
        <DisplayListItems listItems={listItems} setListItems={setListItems} />
      </ul>
    </>
  );
}
