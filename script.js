const container = document.querySelector(".books");
const addButton = document.querySelector(".add");
const closeButton = document.querySelector("[data-close-button]");
const overlay = document.getElementById("overlay");


addButton.addEventListener("click", addBook());

addButton.addEventListener("click", () => {
    const modal = document.querySelector(button.dataser.modalTarget);
    openModal(modal);
})
close.Button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
})

overlay.addEventListener("click", () => {
    const modals = document.querySelectorAll(".modal.active");
    modals.forEach(modal => {
        closeModal(modal);
    })
})

function openModal(modal){
    if(modal==null){return}
    else{modal.classList.add("active");
overlay.classList.add("active")}

}
function closeModal(modal){
    if(modal==null){return}
    else{modal.classList.remove("active");
overlay.classList.remove("active")}

}

let addBook = function(){

}
