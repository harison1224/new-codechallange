document.addEventListener('DOMContentLoaded', () => {
    //GET DOM element
    const itemInput = document.getElementById('itemInput');
    const addButton = document.getElementById('addButton');
    const clearButton = document.getElementById('clearButton');
    const shoppingList = document.getElementById('shoppingList');
    // Retrieve items from local storage, default to empty array if none exist

    let items = JSON.parse(localStorage.getItem('shoppingListItems')) || [];

    //Function to update local storage with current items array
    const updateLocalStorage = () => {
        localStorage.setItem('shoppingListItems', JSON.stringify(items));
    };

    //Function to render the list of items in the DOM
    
    const renderList = () => {
        //Clear the existing list content
        shoppingList.innerHTML = '';
        // Loop through each item in the items array
        items.forEach((item, index) => {
            //Create a new list item element
            const listItem = document.createElement('li');
            // Create a span element to display the item name
            const textNode = document.createElement('span');
            textNode.textContent = item.name;
            listItem.appendChild(textNode);

            //Add 'purchased' class to list item if item.purchased is true

            listItem.classList.toggle('purchased', item.purchased);

              // Create an 'Edit' button for each item

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', (e) => {
                e.stopPropagation();
                //Prompt user to edit the item name
                const newName = prompt('Edit item name:', item.name);
                if (newName) {
                     // Update item name in items array
                    items[index].name = newName;
                    // Update local storage and re-render the list
                    updateLocalStorage();
                    renderList();
                }
            });

           // Create a 'Mark' button for each item

            const markButton = document.createElement('button');
            markButton.textContent = 'Mark';
            markButton.addEventListener('click', (e) => {
                e.stopPropagation();
                // Toggle the 'purchased' status of the item
                items[index].purchased = !items[index].purchased;
                //Update local storage and re-render the list
                updateLocalStorage();
                renderList();
            });

            // Create a 'Clear' button for each item
            const clearItemButton = document.createElement('button');
            clearItemButton.textContent = 'Clear';
            clearItemButton.addEventListener('click', (e) => {
                e.stopPropagation();
                //Remove the item from the items array
                items.splice(index, 1);
                // Update local storage and re-render the list
                updateLocalStorage();
                renderList();
            });
            //Append buttons to the list item

            listItem.appendChild(editButton);
            listItem.appendChild(markButton);
            listItem.appendChild(clearItemButton);
            //Append the list item to the shopping list
            shoppingList.appendChild(listItem);
        });
    };

//Event listener for the 'Add' button to add a new item 
    addButton.addEventListener('click', () => {
        const newItem = itemInput.value.trim(); //Get the value from the input
        if (newItem) {
            items.push({ name: newItem, purchased: false });
            itemInput.value = '';
            //Update local storage and re-render the list
            updateLocalStorage();
            renderList();
        }
    });
//Event listener for the 'Clear' button to clear all items
    clearButton.addEventListener('click', () => {
        items = [];
        updateLocalStorage();
        renderList();
    });
// // Initially render the list when the DOM content is loaded
    renderList();
});