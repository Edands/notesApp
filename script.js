// TODO:
//  1. Update/Edit option
//  5. Make a button to switch back the display
//  6. Refactor switchDisplay() to make it just one function
//  3/2. Delete Option
//  2. Implement moment.js for the dates
//  3. Make it so when you try to update a note the placeholder becomes the older info
//  4. Make it so you can export/import Notes out of the browser or collect the data

// Generates a random unique id for new records
const uid = function () {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

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

//  Switches the display to add or edit notes

function switchDisplay() {
	document.querySelector("#notes").style.display = "none";
	document.querySelector("#new-container").style.display = "block";
}

function switchEditDisplay() {
	document.querySelector("#notes").style.display = "none";
	document.querySelector("#update-container").style.display = "block";
}

// Generate new Note HTML And Save written note

function saveNote() {
	// Get and store the new values

	let notetitle = document.querySelector("#new-note-title").value;
	let noteBody = document.querySelector("#new-note-body").value;

	// Clone the html template for new notes

	let noteTemplate = document.getElementById("noteTemplate");
	let noteClone = noteTemplate.cloneNode(true);
	let sotoredNotes = document.querySelector("#notes");
	sotoredNotes.appendChild(noteClone);
	let newNote = sotoredNotes.lastChild;

	// Catching the new note varibles

	let newNoteTitle = newNote.querySelector(".title");
	let newNoteContent = newNote.querySelector(".content");
	let newNoteDate = newNote.querySelector(".date");

	// Setting up the new values

	newNoteTitle.innerHTML = `${notetitle}`;
	newNoteContent.innerHTML = `${noteBody}`;
	newNote.id = uid();
	newNoteId = newNote.id;

	newNote.style.setProperty("display", "block");

	//Save to localStorage

	console.log(newNoteId);
	let newRecordHTML = document.getElementById(String(newNoteId)).outerHTML;
	console.log(newRecordHTML);
	localStorage.setItem(newNoteId, newRecordHTML);
	console.log(`${newNoteId} saved to local storage`);

	// Switching back the display

	document.querySelector("#notes").style.display = "block";
	document.querySelector("#new-container").style.display = "none";
}

parentElementID = "";

function updateNote(caller) {
	parentElementID = caller.parentNode.id;

	switchEditDisplay();
}

function saveUpdatedNote() {
	let noteToEdit = document.querySelector(`#${parentElementID}`);

	let updatedNotetitle = document.querySelector("#updated-note-title").value;
	let updatedNoteBody = document.querySelector("#updated-note-body").value;

	let noteTitle = noteToEdit.querySelector(".title");
	let noteContent = noteToEdit.querySelector(".content");
	let noteDate = noteToEdit.querySelector(".date");

	noteTitle.innerHTML = updatedNotetitle;
	noteContent.innerHTML = updatedNoteBody;

	// Update info in localStorage
	console.log(parentElementID);
	let newRecordHTML = noteToEdit.outerHTML;
	console.log(newRecordHTML);
	localStorage.setItem(parentElementID, newRecordHTML);
	console.log(`${parentElementID} edited in local storage`);

	// Reset parentElementID
	parentElementID = "";

	// Switching back the display
	document.querySelector("#notes").style.display = "block";
	document.querySelector("#update-container").style.display = "none";
}

function deleteNote(caller) {
	let parentElement = caller.parentNode.id;

	localStorage.removeItem(parentElement);
	document.getElementById(parentElement).remove();

	console.log(`Record ${parentElement} removed`);
}

// Event listeners

document.querySelector("#create-note").addEventListener("click", switchDisplay);
document.querySelector("#save-note").addEventListener("click", saveNote);
document
	.querySelector("#save-updated-note")
	.addEventListener("click", saveUpdatedNote);
