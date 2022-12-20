# Personal Library

## Description

This was one of the first projects I completed. It is mainly focused on JavaScript, updating the DOM based on user inputs and the functions of modals. It allows for the user to add and remove books. The book cards have information about the name of the book, the author page number and if the book was read by you or not. Later I added the user sign-in functionality using firebase. This allows for the books and users to be saved on a server.

## Technologies used

### HTML/CSS/JavaScript

This project used basic HTML and CSS but relied heavily on JavaScript for the interaction with the firebase server and updating the DOM. Every time a user logs in or adds a book the firebase server and the DOM has to be updated.

### Firebase

Firebase is the cornerstone of this project. It is used both for user authentication and storing all the book information. The updating of the DOM also happens through the Firebase server. Instead of updating the DOM when a user adds a book, the website updated the information in server storage. Then the server sends a snapshot of the new information to the website and with that the website updates the DOM. 

## Problems Encountered

### Linking the User and Data on Firebase

### Updating the DOM after each event

There were several problems when deciding whether to update the DOM based on the information in the server or the current changes that were made by the user. Choosing one or the other could have caused mismatches in data if the server did not respond or the website crashed for example. This was solved (as mentioned previously) by doing everything through the Firebase storage. 

## Final Remarks

This project was a good introduction into Firebase's services and abilities, DOM updating and back-end/front-end communication.




