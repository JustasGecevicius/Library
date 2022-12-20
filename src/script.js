import { getFirebaseConfig } from "./firebase-config";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";

const firebaseAppConfig = getFirebaseConfig();
const app = initializeApp(firebaseAppConfig);
const db = getFirestore(app);

let userID;

const container = document.querySelector(".books");
const addButton = document.querySelector(".add");
const bookTitle = document.querySelector("#title");
const author = document.querySelector("#author");
const pageNum = document.querySelector("#pageNum");
const readStatus = document.querySelector("#selectStatus");
const close = document.querySelector("[data-close-button]");
const overlay = document.querySelector("#overlay");
const modal = document.querySelector(".addBook");
const modalButton = document.querySelector(".openModal");
const signInButton = document.querySelector(".singInButton");
const signOutButton = document.querySelector(".signOutButton");

const username = document.querySelector(".username");
const userDiv = document.querySelector(".user");

const BOOK_TEMPLATE =
  '<div class="book">' +
  '<h2 class="bookName"></h2>' +
  '<h3 class="bookAuthor"></h3>' +
  '<p class="bookPages"></p>' +
  '<p class="bookStatus"></p>' +
  '<button class="removeBookButton">Remove</button>' +
  "</div>";

const saveBook = async ({ name, author, pageNum, status }) => {
  //Add a new message entry to the Firebase database.
  try {
    await addDoc(collection(getFirestore(), userID), {
      bookName: name,
      bookAuthor: author,
      bookPages: pageNum,
      bookStatus: status,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error writing new message to Firebase Database", error);
  }
};

const loadBooks = async () => {
  if (userID) {
    const recentBooksQuery = query(collection(getFirestore(), userID));
    // Start listening to the query.
    onSnapshot(recentBooksQuery, function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        if (change.type === "removed") {
          deleteBook(change.doc.id);
        } else {
          var book = change.doc.data();
          displayBook(
            change.doc.id,
            book.timestamp,
            book.bookName,
            book.bookAuthor,
            book.bookPages,
            book.bookStatus
          );
        }
      });
    });
  }
};
const removeBook = async (e) => {
  console.log(e);
  const id = e.target.dataset.id;
  await deleteDoc(doc(db, userID, id));
};

function displayBook(
  id,
  timestamp,
  bookName,
  bookAuthor,
  bookPages,
  bookStatus
) {
  if (id) {
    var div = document.getElementById(id) || createAndInsertBook(id, timestamp);
    console.log("div", div);
    console.log("bookName", bookName);
    div.querySelector(".bookName").textContent = bookName;
    div.querySelector(".bookAuthor").textContent = bookAuthor;
    div.querySelector(".bookPages").textContent = bookPages + " pages";
    div.querySelector(".bookStatus").textContent = bookStatus;
    const button = div.querySelector(".removeBookButton");
    button.dataset.id = id;
    button.addEventListener("click", removeBook);
    // Show the card fading-in and scroll to view the new message.
    setTimeout(function () {
      div.classList.add("visible");
    }, 1);
  }
}

function deleteBook(id) {
  var div = document.getElementById(id);
  // If an element for that message exists we delete it.
  if (div) {
    div.parentNode.removeChild(div);
  }
}

function createAndInsertBook(id, timestamp) {
  const bookContainer = document.createElement("div");
  bookContainer.innerHTML = BOOK_TEMPLATE;
  const div = bookContainer.firstChild;
  div.setAttribute("id", id);

  // If timestamp is null, assume we've gotten a brand new message.
  // https://stackoverflow.com/a/47781432/4816918
  timestamp = timestamp ? timestamp.toMillis() : Date.now();
  div.setAttribute("timestamp", timestamp);

  // figure out where to insert new message
  const existingBooks = container;
  if (existingBooks.length === 0) {
    existingBooks.appendChild(div);
  } else {
    let booksListNode = existingBooks[0];

    while (booksListNode) {
      const bookListNodeTime = booksListNode.getAttribute("timestamp");

      if (!bookListNodeTime) {
        throw new Error(
          `Child ${booksListNode.id} has no 'timestamp' attribute`
        );
      }
      if (bookListNodeTime > timestamp) {
        break;
      }
      booksListNode = booksListNode.nextSibling;
    }
    container.insertBefore(div, booksListNode);
  }
  return div;
}

const signIn = async () => {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
};

const clearDiv = () => {
  while (container.firstChild) {
    container.firstChild.remove();
  }
};

const signOutUser = () => {
  // Sign out of Firebase.
  clearDiv();
  signOut(getAuth());
};

const initFirebaseAuth = () => {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), authStateObserver);
};

function getUserName() {
  return getAuth().currentUser.displayName;
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
async function authStateObserver(user) {
  if (user) {
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    userID = user.uid;
    var userName = getUserName();

    // Set the user's profile pic and name.

    username.textContent = userName;

    // Show user's profile and sign-out button.
    userDiv.classList.remove("inactive");
    signOutButton.classList.remove("inactive");

    // Hide sign-in button.
    signInButton.classList.add("inactive");
    //load Books from the Server
    loadBooks();
  } else {
    // User is signed out!
    // Show user's profile and sign-out button.
    userDiv.classList.add("inactive");
    signOutButton.classList.add("inactive");

    // Hide sign-in button.
    signInButton.classList.remove("inactive");
  }
}

const addBook = (e) => {
  if (
    bookTitle.value == "" ||
    author.value == "" ||
    pageNum.value == "" ||
    readStatus.value == ""
  ) {
    alert("Please fill in all of the fields to add a book");
    console.log("please fill in all of the fields to add a book");
  } else {
    const newBook = {
      name: bookTitle.value,
      author: author.value,
      pageNum: pageNum.value,
      status: readStatus.value,
    };

    saveBook({ ...newBook });
  }
  closeModal();
};

let closeModal = function () {
  overlay.classList.remove("active");
  modal.classList.remove("active");
  bookTitle.value = "";
  author.value = "";
  pageNum.value = "";
  readStatus.value = "";
};

let openModal = function () {
  overlay.classList.add("active");
  modal.classList.add("active");
};

addButton.addEventListener("click", addBook);
close.addEventListener("click", closeModal);
modalButton.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);
signInButton.addEventListener("click", signIn);
signOutButton.addEventListener("click", signOutUser);

initFirebaseAuth();
