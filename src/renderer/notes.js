const fs = require('fs');
const path = require('path');
const noteInput = document.getElementById('noteInput');
const noteList = document.getElementById('noteList');

const notesFilePath = path.join(__dirname, 'notes.json');

// Notları dosyadan yükle
function loadNotes() {
    if (fs.existsSync(notesFilePath)) {
        const data = fs.readFileSync(notesFilePath, 'utf8');
        const notes = JSON.parse(data);
        notes.forEach(note => addNoteToDOM(note));
    }
}

// Notu HTML'e ekle
function addNoteToDOM(noteText) {
    const li = document.createElement('li');
    li.textContent = noteText;
    noteList.appendChild(li);
}

// Not ekle ve kaydet
function addNote() {
    const noteText = noteInput.value.trim();
    if (noteText === '') return;

    addNoteToDOM(noteText);
    saveNote(noteText);
    noteInput.value = '';
}

// Notu dosyaya kaydet
function saveNote(noteText) {
    let notes = [];
    if (fs.existsSync(notesFilePath)) {
        const data = fs.readFileSync(notesFilePath, 'utf8');
        notes = JSON.parse(data);
    }
    notes.push(noteText);
    fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
}

// Sayfa yüklendiğinde notları getir
window.onload = loadNotes;

window.addNote = addNote; // HTML'deki onclick için global hale getiriyoruz.
