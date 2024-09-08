
let mainContent = document.querySelector('.main-content');
let addBtn = document.querySelector('.add-btn');
// let btn = document.querySelector('.btn');
const Library = [];

function formValidation(author, title, pages){
    if((author === '') || (title === '') || (pages === '')){
        alert('Please fill out all fields.');
        return false;
    } else {
        console.log('all good');
        return true;
    };
}

function Book(authorInput, titleInput, pagesInput, checkbox){
    this.author = authorInput;
    this.title = titleInput;
    this.pages = pagesInput;
    this.checkbox = checkbox;
}

//creates Book card with user entered data
function createBook(author, title, pages, checkbox){
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('bookDiv');
    mainContent.appendChild(bookDiv);

    const book = document.createElement('div');
    book.classList.add('book');
    bookDiv.appendChild(book);

    const titleOutput = document.createElement('h1');
    titleOutput.textContent = title;
    titleOutput.classList.add('titleOutput');
    book.appendChild(titleOutput);

    const authorOutput = document.createElement('h1');
    authorOutput.textContent = author;
    authorOutput.classList.add('authorOutput');
    book.appendChild(authorOutput);

    let result = pages > 1 ? pages + ' pages' : pages + ' page';
    const pagesOutput = document.createElement('h1');
    pagesOutput.textContent = result;
    pagesOutput.classList.add('pagesOutput');
    book.appendChild(pagesOutput);

    let toggleState = document.createElement('button');
    toggleState.classList.add('toggleState');
    if(checkbox.value == false){
        console.log('Second checkbox: ');
        console.log('Value: ' + checkbox.value);
        console.log('Checked: ' + checkbox.checked);
        toggleState.textContent = 'Read';
        toggleState.classList.add('positiveState');
    } else {
        console.log('Third checkbox: ');
        console.log('Value: ' + checkbox.value);
        console.log('Checked: ' + checkbox.checked);
        toggleState.textContent = 'Not Read';
        toggleState.classList.add('negativeState');
    };

    // toggleState.addEventListener('click', () => {
    //     if(toggleState.style.backgroundColor = 'red'){
    //         toggleState.style.backgroundColor = 'green';
    //     }
    //     if(toggleState.style.backgroundColor = 'green'){
    //         toggleState.style.backgroundColor = 'red';
    //     }
    // });

    // toggleState.style.backgroundColor = (checkbox.checked == false) ? 'red' : 'green';

    book.appendChild(toggleState);

    const dltBtn = document.createElement('button');
    dltBtn.textContent = 'Delete';
    dltBtn.classList.add('dltBtn');
    book.appendChild(dltBtn);
    // dltBtn.addEventListener('clicked', () => {
    //     bookDiv.style.display = 'none';
    //     Library[bookDiv].style.display = 'none';
    // });

    return bookDiv;
}


//one function has too many functionalities
function createObject(title, author, pages, checkbox){
    console.log('5th check: ');
    console.log('Value: ' + checkbox.value);
    console.log('Checked: ' + checkbox.checked);
    let newBook = new Book(title, author, pages, checkbox);
    Library.push(newBook);
    console.log('4th check: ');
    console.log('Value: ' + checkbox.value);
    console.log('Checked: ' + checkbox.checked);
    let bookPopUp = createBook(newBook.title, newBook.author, newBook.pages, newBook.checkbox);
    mainContent.appendChild(bookPopUp);
    bookPopUp.style.display = 'block';
}


//function for a popup
function createPopUp(){
    const popupDiv = document.createElement('dialog');
    popupDiv.classList.add('popupDiv');
    mainContent.appendChild(popupDiv);

    const childDiv = document.createElement('div');
    childDiv.classList.add('childDiv');
    popupDiv.appendChild(childDiv);

    const h1AddBook = document.createElement('h1');
    h1AddBook.textContent = 'Add a New Book';
    h1AddBook.classList.add('h1AddBook');
    childDiv.appendChild(h1AddBook);

    const authorInput = document.createElement('input');
    authorInput.placeholder = 'Author';
    authorInput.classList.add('authorInput');
    authorInput.setAttribute('type', 'text');
    childDiv.appendChild(authorInput);

    const titleInput = document.createElement('input');
    titleInput.placeholder = 'Title';
    titleInput.classList.add('titleInput');
    titleInput.setAttribute('type', 'text');
    childDiv.appendChild(titleInput);

    const pagesInput = document.createElement('input');
    pagesInput.placeholder = 'Pages';
    pagesInput.classList.add('pagesInput');
    pagesInput.setAttribute('type', 'number');
    childDiv.appendChild(pagesInput);

    let readDiv = document.createElement('div');
    readDiv.classList.add('readDiv');
    childDiv.appendChild(readDiv);

    const h1question = document.createElement('h1');
    h1question.textContent = 'Have you read it?';
    h1question.classList.add('h1question');
    readDiv.appendChild(h1question);

    let checkbox = document.createElement('input');
    checkbox.classList.add('checkbox');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = true;

    // checkbox.addEventListener('click', () => {
    //     console.log('checkbox was ticked off');
    //     checkbox.checked = !checkbox.checked;
    //     if(checkbox.checked = false){
    //         toggleState.style.backgroundColor = 'green';
    //     }
    //     if(toggleState.style.backgroundColor = 'green'){
    //         toggleState.style.backgroundColor = 'red';
    //     }
    // });
    readDiv.appendChild(checkbox);

    console.log('First checkbox: ');
    console.log('Value: ' + checkbox.value);
    console.log('Checked: ' + checkbox.checked);

    let submitBtn = document.createElement('button');
    submitBtn.classList.add('submitBtn');
    submitBtn.textContent = 'Create Book';
    childDiv.appendChild(submitBtn);
    submitBtn.addEventListener('click', () => {
        if(formValidation(authorInput.value, titleInput.value, pagesInput.value) === true){
            createObject(titleInput.value, authorInput.value, pagesInput.value, checkbox);
            popupDiv.style.display = 'none';
            popupDiv.close();
        };
    });

    return popupDiv;
}


function addBtnResponse(){
    let popUp = createPopUp();
    popUp.style.display = 'block';
    popUp.showModal();
    //add the ability for the user to click off
}

addBtn.addEventListener('click', addBtnResponse);

// btn.addEventListener('click', () => {
//     console.log('this one worked');
// });