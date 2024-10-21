let mainContent = document.querySelector('.main-content');
let addBtn = document.querySelector('.add-btn');
let showAllBtn = document.querySelector('.show-all-btn');
let newBook;
const library = [];

function formValidation(author, title, pages){
    if((author === '') || (title === '') || (pages === '')){
        alert('Please fill out all fields.');
        return false;
    } else {
        return true;
    };
};

const GUImanager = (function (){
    const checkFunction = (toggleBtn, hasRead) => {
        if(hasRead == true){
            toggleBtn.setAttribute('class', 'positiveState');
            toggleBtn.textContent = 'Read';
        };
        if(hasRead == false){
            toggleBtn.setAttribute('class', 'negativeState');
            toggleBtn.textContent = 'Not Read';
        };
    };

     //creates html instance with book object info
    const createBook = (bookObj) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('bookDiv');
        mainContent.appendChild(bookDiv);

        const book = document.createElement('div');
        book.classList.add('book');
        bookDiv.appendChild(book);

        const titleOutput = document.createElement('h1');
        titleOutput.textContent = bookObj.title;
        titleOutput.classList.add('titleOutput');
        book.appendChild(titleOutput);

        const authorOutput = document.createElement('h1');
        authorOutput.textContent = bookObj.author;
        authorOutput.classList.add('authorOutput');
        book.appendChild(authorOutput);

        let pages = bookObj.pages;
        let result = pages > 1 ? pages + ' pages' : pages + ' page';
        const pagesOutput = document.createElement('h1');
        pagesOutput.textContent = result;
        pagesOutput.classList.add('pagesOutput');
        book.appendChild(pagesOutput);

        let toggleBtn = document.createElement('button');
        toggleBtn.classList.add('negativeState');
        GUImanager.checkFunction(toggleBtn, bookObj.read);
        toggleBtn.addEventListener('click', function(){                      
            bookObj.read = !bookObj.read;
            GUImanager.checkFunction(toggleBtn, bookObj.read);
        });
        book.appendChild(toggleBtn);

        const dltBtn = document.createElement('button');
        dltBtn.textContent = 'Delete';
        dltBtn.classList.add('dltBtn');
        dltBtn.addEventListener('click', function(){
            bookDiv.remove();                                   
            bookObj.removeFromLibrary();   
        });
        book.appendChild(dltBtn);
        return bookDiv;
    }

    const createObject = (book) => {
        let bookPopUp = GUImanager.createBook(book);     
        mainContent.appendChild(bookPopUp);                                                  
        bookPopUp.style.display = 'block';
    }

    // function that displays all array elements
    const displayAll = () => {
        library.forEach((element) => {
            let bookPopUp = GUImanager.createBook(element);     
            mainContent.appendChild(bookPopUp);                                                             
            bookPopUp.style.display = 'block';
        });
    }

    return {checkFunction, createBook, createObject, displayAll};
})();


//book object constructor
class Book{
    constructor(title, author, pages, hasRead){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = hasRead;
        library.push(this);                                                                       
    } 

    removeFromLibrary(){             
        library.forEach((index) => {
            if(index === this){
                library.splice(index, 1);
            };
        });
    };
};

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
    checkbox.checked = false;
    readDiv.appendChild(checkbox);

    let submitBtn = document.createElement('button');
    submitBtn.classList.add('submitBtn');
    submitBtn.textContent = 'Create Book';
    childDiv.appendChild(submitBtn);
    submitBtn.addEventListener('click', () => {  
        if(formValidation(authorInput.value, titleInput.value, pagesInput.value) === true){
            newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, checkbox.checked);
            console.log(newBook);
            GUImanager.createObject(newBook); 
            popupDiv.remove();
        };
    });
    return popupDiv;
};


function addBtnResponse(){
    let popUp = createPopUp();
    popUp.style.display = 'block';
    popUp.showModal();

    popUp.addEventListener('click', (e) => {  
        if(popUp === e.target){
            function fadeOut(popUp){
                let opacity = 1;
                let interval = setInterval(function() {
                    if (opacity > 0) {
                       opacity -= 0.3;
                       popUp.style.opacity = opacity;
                    } else {
                        clearInterval(interval);
                        popUp.remove();
                    }
                }, 50);
            };
            fadeOut(popUp);
        };
    });
};

addBtn.addEventListener('click', addBtnResponse);
showAllBtn.addEventListener('click', function(){   
    GUImanager.displayAll();  
});
