// TODO:
//  0. Change the order of the display of notes so newer ones show up first
//  1. Consider making the site auto refresh after being idle for a certain ammount of time so the moment()
//   .fromNow() gets updated or changing the way dates show up
//  2. Add a popup or something similar to confirm note deletion
//  3. Save the dark-mode and arange status in a brwoser cookie
//  4. Remove all the console.log()
//  5. Make it so you can export/import notes out of the browser or collect the data.

// Load previously stored records in localStorage

function loadStoredNotes() {
	var localStoreItems = localStorage.length;
	console.log(localStoreItems);

	if (localStoreItems != 0) {
		for (i = 0; i < localStoreItems; i++) {
			let storageKeys = Object.keys(localStorage);
			let storedNotesElement = document.getElementById("notes");
			let storageValues = localStorage.getItem(storageKeys[i]);
			let stringToNode = document
				.createRange()
				.createContextualFragment(storageValues);
			storedNotesElement.appendChild(stringToNode);
			console.log[`appended ${storageKeys[i]} to notes`];
		}
	} else {
		console.log("theres is not items stored");
	}
}

// Switches the "create new" button so you can close the container and go back

function switchButton() {
	let createButton = document.querySelector("#create-note");

	if (createButton.innerHTML == "Create Note") {
		console.log("changing things");
		createButton.innerHTML = "Go back";
	} else {
		createButton.innerHTML = "Create Note";
	}
}

//  Switches the display to add or edit notes

function switchDisplay(button) {
	let container = "";
	let caller = "";
	let notesDisplay = document.querySelector("#notes");
	let updateContainer = document.querySelector("#update-container");
	let newContainer = document.querySelector("#new-container");

	// Switches the display showing either the container for new notes or the one for edits
	// depending on who called the event

	try {
		caller = switchDisplay.caller.name;
		console.log(`being called from ${caller}`);
	} catch (error) {
		console.log(`there is no caller function`);
	}

	if (caller == "saveNote") {
		container = newContainer;
	} else if (caller == "updateNote" || caller == "saveUpdatedNote") {
		container = updateContainer;
	} else if (
		button.target.id == "create-note" &&
		newContainer.style.display != "block" &&
		updateContainer.style.display != "block"
	) {
		container = newContainer;
	} else if (
		(button.target.id == "create-note" &&
			newContainer.style.display != "none") ||
		updateContainer.style.display != "none"
	) {
		container = null;
	}

	switchButton();

	if (container == null) {
		updateContainer.style.display = "none";
		newContainer.style.display = "none";
		notesDisplay.style.display = "block";
	} else if (notesDisplay.style.display != "none") {
		notesDisplay.style.display = "none";
		container.style.display = "block";
	} else {
		notesDisplay.style.display = "block";
		container.style.display = "none";
	}
}

// Generate new Note HTML And Save written note

function saveNote() {
	// Gets and store the new values

	let notetitle = document.querySelector("#new-note-title").value;
	let noteBody = document.querySelector("#new-note-body").value;

	// Clones the html template for new notes

	let noteTemplate = document.getElementById("noteTemplate");
	let noteClone = noteTemplate.cloneNode(true);
	let sotoredNotes = document.querySelector("#notes");
	sotoredNotes.appendChild(noteClone);
	let newNote = sotoredNotes.lastChild;

	// Catchs the new note varibles

	let newNoteTitle = newNote.querySelector(".title");
	let newNoteContent = newNote.querySelector(".content");
	let newNoteDate = newNote.querySelector(".date");

	// Sets up the new values

	newNoteTitle.innerHTML = `${notetitle}`;
	newNoteContent.innerHTML = `${noteBody}`;
	newNote.id = moment().valueOf();
	newNoteId = newNote.id;

	let momentNow = moment(parseInt(newNoteId));
	newNoteDate.innerHTML = moment(momentNow).fromNow();

	newNote.style.setProperty("display", "inline-block");

	//Saves to localStorage

	console.log(newNoteId);
	let newRecordHTML = document.getElementById(String(newNoteId)).outerHTML;
	console.log(newRecordHTML);
	localStorage.setItem(newNoteId, newRecordHTML);
	console.log(`${newNoteId} saved to local storage`);

	// Reset value to the placeholder
	document.querySelector("#new-note-title").value = "";
	document.querySelector("#new-note-body").value = "";

	// Switching back the display
	switchDisplay();
}

// Inserts the specified node after an existing one

function insertAfter(newNode, existingNode) {
	existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

// This varibale stores the id of the element wich is going to be edited
parentElementID = "";

function updateNote(caller) {
	// Set up the id of the note witch is going to be edited
	parentElementID = caller.parentNode.id;

	// This Shows the text of the note wich is going to be edited in the edit container

	let noteTitle = document
		.getElementById(`${parentElementID}`)
		.getElementsByClassName("title")[0].innerHTML;

	let noteBody = document
		.getElementById(`${parentElementID}`)
		.getElementsByClassName("content")[0].innerHTML;

	document.getElementById("updated-note-title").value = noteTitle;

	document.getElementById("updated-note-body").value = noteBody;

	// Switches to the edit container
	switchDisplay();
}

// Updates the info of an edited note

function saveUpdatedNote() {
	// The current target note
	let noteToEdit = document.getElementById(`${parentElementID}`);

	// Getting all the new values

	let updatedNotetitle = document.querySelector("#updated-note-title").value;
	let updatedNoteBody = document.querySelector("#updated-note-body").value;
	let dateSpan = document.createElement("span");
	let breakEl = document.createElement("br");

	let noteTitle = noteToEdit.querySelector(".title");
	let noteContent = noteToEdit.querySelector(".content");
	let noteDate = noteToEdit.querySelector(".date");
	let noteUpDate = noteToEdit.querySelector(".last-edited");

	noteTitle.innerHTML = updatedNotetitle;
	noteContent.innerHTML = updatedNoteBody;

	// Creates a unix timestamp with the current time
	let momentNow = moment().valueOf();

	// Updates the moment().fromNow() in the html
	noteDate.innerHTML = `created ${moment(
		parseInt(parentElementID)
	).fromNow()}.`;

	// Sets up a new <span> wich shows when was the last time the note was edited
	if (noteUpDate) {
		noteUpDate.innerHTML = `last edited ${moment(momentNow).fromNow()}.`;
	} else {
		dateSpan.innerHTML = `last edited ${moment(momentNow).fromNow()}.`;
		dateSpan.className = "last-edited";
		dateSpan.id = momentNow;
		insertAfter(dateSpan, noteDate);
		insertAfter(breakEl, noteDate);
	}

	// Updating info in localStorage
	console.log(parentElementID);
	let newRecordHTML = noteToEdit.outerHTML;
	console.log(newRecordHTML);
	localStorage.setItem(parentElementID, newRecordHTML);
	console.log(`${parentElementID} edited in local storage`);

	// Resets parentElementID
	parentElementID = "";

	// Switches back the display
	switchDisplay();
}

// Deletes the note from both the DOM and the localStorage

function deleteNote(caller) {
	let parentElement = caller.parentNode.id;

	localStorage.removeItem(parentElement);
	document.getElementById(parentElement).remove();

	console.log(`Record ${parentElement} removed`);
}

// Updates the moment().fromNow() dates showed in each note after a page refresh

function loadDates() {
	let notesDiv = document.getElementById("notes");
	let notesChilds = notesDiv.getElementsByTagName("a");

	for (i = 1; i < notesChilds.length; i++) {
		let currentChild = notesChilds[i];
		let childID = currentChild.id;
		let childCreation = currentChild.querySelector(".date");

		if (currentChild.querySelector(".last-edited")) {
			let childLastEdit = currentChild.querySelector(".last-edited");
			let lastEditId = childLastEdit.id;
			let editedDate = moment(parseInt(lastEditId));
			childLastEdit.innerHTML = `last edited ${moment(editedDate).fromNow()}`;
		} else {
			console.log(`there is no .last-edit in ${childID}`);
		}

		let creationDate = moment(parseInt(childID));
		childCreation.innerHTML = `created ${moment(creationDate).fromNow()} `;
	}
}

// Controls the switch buttons for dark mode and note arange

let dashboard = document.querySelector(".dashboard");
let agenda = document.querySelector(".agenda");

function darkModeSwitch() {
	let moonSwitch = document.querySelector(".moon-icon");
	let sunSwitch = document.querySelector(".sun-icon");
	let bodyClass = document.body.classList;

	if (!bodyClass.contains("dark-mode")) {
		bodyClass.add("dark-mode");
		moonSwitch.style.setProperty("display", "none");
		sunSwitch.style.setProperty("display", "block");
		dashboard.style.color = "#ffffff";
		agenda.style.color = "#ffffff";
	} else {
		bodyClass.remove("dark-mode");
		moonSwitch.style.setProperty("display", "block");
		sunSwitch.style.setProperty("display", "none");
		dashboard.style.color = "#121212";
		agenda.style.color = "#121212";
	}
}

function notesArangeSwitch() {
	let notesAll = document.querySelectorAll(".list-item");

	if (getComputedStyle(notesAll[0]).width == "calc(45% - 100px)") {
		for (i = 0; i < notesAll.length; i++) {
			notesAll[i].style.width = "calc(90% - 100px)";
		}
		dashboard.style.display = "block";
		agenda.style.display = "none";
	} else {
		for (i = 0; i < notesAll.length; i++) {
			notesAll[i].style.width = "calc(45% - 100px)";
		}
		dashboard.style.display = "none";
		agenda.style.display = "block";
	}
}

// Event listeners

document
	.querySelector(".dark-mode-btn")
	.addEventListener("click", darkModeSwitch);
document
	.querySelector(".note-style")
	.addEventListener("click", notesArangeSwitch);
document.querySelector("#create-note").addEventListener("click", switchDisplay);
document.querySelector("#save-note").addEventListener("click", saveNote);
document
	.querySelector("#save-updated-note")
	.addEventListener("click", saveUpdatedNote);
