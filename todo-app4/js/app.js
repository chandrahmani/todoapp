const playerNamInput = document.querySelector('#player-nam-input');
const addBtn = document.querySelector('#add-btn');
const txtContainer = document.querySelector('.txt-container ul');
const txtError = document.querySelector('#txt-error')

playerNamInput.focus();

const todoListFromLS = localStorage.getItem("todoList");

const storedTodoList = todoListFromLS ? JSON.parse(todoListFromLS) :
    [
    ];

// data Structure or Model
const playerInputList = [...storedTodoList];


function init() {
    addDom();
}

init();

playerNamInput.addEventListener("keyup", () => {
    txtError.classList.remove('active');
});

// Ye add function hai
function add() {
    const todoTxtInptVal = playerNamInput.value;

    //  validate a text 
    if (todoTxtInptVal !== '') {
        if (todoTxtInptVal.length >= 15) {

            txtError.innerHTML = 'Please Enter Your 15 letters';
            txtError.classList.add('active');
            return;
        }

        // add an item to the list

        playerInputList.push(todoTxtInptVal)

        addDom();


        playerNamInput.value = '';
        playerNamInput.focus();
    } else {
        txtError.innerHTML = "Plase Enter Your Any Text";
        txtError.classList.add('active');
    }

}

// Yaha Pe Ek Dom Add Kar Rhe Hai
function addDom() {

    txtContainer.innerHTML = '';

    txtContainer.classList.add('xyz', 'btn');

    for (let b = 0; b < playerInputList.length; b++) {

        const todoTxtInptItem = `
        <li>
            <div>${playerInputList[b]}</div>

            <div id="edit-container">
                <input type="text" id="updatedPlayerNam-${b}" value="${playerInputList[b]}"/>
                <button type="button" id="btnUpdate-${b}">Update </button>
            </div>
  
            <div> 
                <button onclick="updatePlayerNam(event,${b})">✒️</button>
                <button onclick="deleteTodo(${b})">🗑️</button></div>
            </li>

        `;
        // Element Ko Add Karna Add Element
        txtContainer.insertAdjacentHTML('beforeend', todoTxtInptItem)
    }


    // store in browser
    localStorage.setItem("todoList", JSON.stringify(playerInputList));
};

// Click Event Add Karna Ke Liye

addBtn.addEventListener('click', (e) => {
    //default Acction ko rokta hai preventDefault
    addBtn.classList.add('abc')
    e.preventDefault();

    add();
});


function updatePlayerNam(e, index) {
    // YE Function Update ke liye hai 


    // ya pe update form Show ho raha hai
    e.target.parentElement.previousElementSibling.classList.add("isUpdate");

    //  select control
    const updatedInput = document.querySelector(`#updatedPlayerNam-${index}`);
    const btnUpdate = document.querySelector(`#btnUpdate-${index}`);

    // get all the values 
    const updatedTxt = updatedInput.value;
    let mytxt = updatedTxt;

    // event to update the text value
    updatedInput.addEventListener("keyup", (e) => {
        mytxt = e.target.value;
    });


    // jese he button Fire hoga to new value add kar dega
    btnUpdate.addEventListener("click", () => {
        // update an array
        playerInputList.splice(index, 1, mytxt);
        addDom();

    });

}


// Ye Delete Function Hai

function deleteTodo(index) {
    const confirmMe = confirm(`kya ap ${playerInputList[index]} delete karna chate hai`);

    // delete item from array 
    playerInputList.splice(index, 1);

    console.log(playerInputList)

    if (confirmMe) {
        addDom();

    }
}