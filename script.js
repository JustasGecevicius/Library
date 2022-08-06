const container = document.querySelector(".books");
const addButton = document.querySelector(".add");
const bookTitle = document.querySelector("#title");
const author = document.querySelector("#author");
const pageNum = document.querySelector("#pageNum");
const readStatus = document.querySelector("#status");
bookTitle.value = "Toras"; 
author.value = "Zeba";
pageNum.value = "250";
readStatus.value = "Read";
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
    if(bookTitle.value == "" || author.value == "" || pageNum.value == "" || readStatus.value == ""){
        console.log("please fill in all of the fields to add a book")
    }
    else{       
        bookArr.push(new Book(bookTitle.value, author.value, pageNum.value, readStatus.value));
        displayBooks(bookTitle.value, author.value, pageNum.value, readStatus.value);
    }
}
function createBooks(){
    for(x in bookArr){
        const div = document.createElement("div");
        const title = document.createElement("h2");
        const author = document.createElement("h3");
        const pageNum = document.createElement("p");
        const readStatus = document.createElement("p");
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Remove Book";
        title.innerText = bookArr[x].name;
        author.innerText = bookArr[x].author;
        pageNum.innerText = bookArr[x].page_number;
        readStatus.innerText = bookArr[x].status;
        div.classList.add("book", `${title.innerText}`);
        div.appendChild(title);
        div.appendChild(author);
        div.appendChild(pageNum);
        div.appendChild(readStatus);
        div.appendChild(deleteButton);
        container.appendChild(div);
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
let displayBooks = function(bTitle, bAuthor, pages, rStatus){
    container.textContent = "";
    createBooks();
}
displayBooks();

function Book(name, author, pageNum, status){
    this.name = name;
    this.author = author;
    this.page_number = pageNum;
    this.status = status;
}


addButton.addEventListener("click", addBook);
