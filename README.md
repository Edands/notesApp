# [notesApp](https://edands.github.io/notesApp/).
notesApp is a CRUD practice proyect using just HTML, CSS, the moment.js library and besides that everything else is mostly vanilla Javascript.

![app-screenshot](https://raw.githubusercontent.com/Edands/notesApp/master/resources/Screenshot_2021-01-20%20Notes%20App(1).png)

The first note is hardcoded for now. 

Making use of localStorage to save any new notes.

Making use of unix timestamps as id's for the notes through the moment.js library wich allows to have a unique id wich also stores the exact time when the note was created or last edited.
Also using the moment().fromNow() fuction to display how much time from now has passed since the note was created or last edited.

Implemented a dark mode switch by changing the class of the body wich sets new values to the css varibles wich control the colors on display. 

Currently working to futher improve it.
