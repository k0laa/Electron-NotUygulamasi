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

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Sil';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.onclick = () => {
        li.remove();
        deleteNote(noteText);
    };

    li.appendChild(deleteBtn);
    noteList.appendChild(li);
}

function deleteNote(noteText) {
    if (!fs.existsSync(notesFilePath)) return;

    const data = fs.readFileSync(notesFilePath, 'utf8');
    let notes = JSON.parse(data);

    // Sadece ilk eşleşmeyi sil
    const index = notes.indexOf(noteText);
    if (index !== -1) {
        notes.splice(index, 1);
        fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
    }
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
