const container = document.querySelector(".books");
const addButton = document.querySelector(".add");
const bookTitle = document.querySelector("#title");
const author = document.querySelector("#author");
const pageNum = document.querySelector("#pageNum");
const readStatus = document.querySelector("#selectStatus");
const close = document.querySelector("[data-close-button]");
const overlay = document.querySelector('#overlay');
const modal = document.querySelector(".addBook");
const modalButton = document.querySelector(".openModal");
bookTitle.value = "Toras"; 
author.value = "Zeba";
pageNum.value = "250";
let bookArr = [{
    "name": "Toras",
    "author": "Zeba",
    "page_number": "250",
    "status": "Read"
}, {
    "name": "Zaibas",
    "author": "Zeba",
    "page_number": "250",
    "status": "Read"
}];

let addBook = function(){
//a stetement that checks if all of the elements are filled
    if(bookTitle.value == "" || author.value == "" || pageNum.value == "" || readStatus.options[readStatus.selectedIndex].value == ""){
        console.log("please fill in all of the fields to add a book")
    }
    else{    
        //creating the new book object with the information given   
        bookArr.push(new Book(bookTitle.value, author.value, pageNum.value, readStatus.options[readStatus.selectedIndex].text));
        //displaying the new book object on the DOM
        displayBooks(bookTitle.value, author.value, pageNum.value, readStatus.value);
    }
}

//a function that goes over the entire loop of the books array
// and displays all of them one by one
function createBooks(){
    for(x in bookArr){
        //creating the elements for the book
        const div = document.createElement("div");
        const title = document.createElement("h2");
        const author = document.createElement("h3");
        const pageNum = document.createElement("p");
        const readStatus = document.createElement("p");
        const deleteButton = document.createElement("button");
        //giving text and information to the elements
        deleteButton.innerText = "Remove Book";
        title.innerText = bookArr[x].name;
        author.innerText = bookArr[x].author;
        pageNum.innerText = bookArr[x].page_number;
        readStatus.innerText = bookArr[x].status;
        div.classList.add("book", `${title.innerText}`);
        //adding the elements to the dom object
        div.appendChild(title);
        div.appendChild(author);
        div.appendChild(pageNum);
        div.appendChild(readStatus);
        div.appendChild(deleteButton);
        container.appendChild(div);
        //delete books event listener that goes over the entire array of books
        //and deleted the one that matches the delete button that was clicked
        deleteButton.addEventListener("click", (e) => {
            for(x in bookArr)
            {
                if(bookArr[x].name === e.path[1].classList[1]){
                    e.path[1].remove();
                    bookArr.splice(x, 1);
                    break;
                };
            }
        })

    }
}
//the function to clear the screen display the books on the screen
let displayBooks = function(bTitle, bAuthor, pages, rStatus){
    container.textContent = "";
    createBooks();
}
let closeModal = function() {
    overlay.classList.remove("active");
    modal.classList.remove("active");
}
let openModal = function(){
    overlay.classList.add("active");
    modal.classList.add("active");
}
//the constructor for the book objects
function Book(name, author, pageNum, status){
    this.name = name;
    this.author = author;
    this.page_number = pageNum;
    this.status = status;
}
//adding the event listener to the add button
addButton.addEventListener("click", addBook);
// initializing the books that are stored in code
close.addEventListener("click", closeModal);
modalButton.addEventListener("click", openModal);
displayBooks();
