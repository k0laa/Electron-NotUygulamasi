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
        notes.forEach(note => addNoteToDOM(note.text));
    }
}

// Notu HTML'e ekle
function addNoteToDOM(noteText) {
    const li = document.createElement('li');

    // Notun tarih/saat bilgisini al
    const date = new Date();
    const dateString = date.toLocaleString(); // Örn: 03/05/2025, 15:30:00

    // Notu ve tarihi birlikte ekle
    li.textContent = `${noteText} (${dateString})`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Sil';
    deleteBtn.style.backgroundColor = 'red';
    deleteBtn.style.color = 'white';
    deleteBtn.style.border = 'none';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.onclick = () => {
        li.remove();
        deleteNote(noteText);
    };

    li.appendChild(deleteBtn);
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

    // Notla birlikte tarih bilgisini kaydediyoruz
    const date = new Date();
    const dateString = date.toLocaleString(); // Örn: 03/05/2025, 15:30:00
    const noteId = notes.length > 0 ? notes[notes.length - 1].id + 1 : 0 // ID'yi otomatik artırıyoruz
    notes.push({id: noteId, text: noteText, date: dateString});

    fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
}


function deleteNote(noteText) {
    if (!fs.existsSync(notesFilePath)) return;

    const data = fs.readFileSync(notesFilePath, 'utf8');
    let notes = JSON.parse(data);

    // Metni arayarak eşleşen notu bul
    const index = notes.findIndex(note => note.text === noteText);
    if (index !== -1) {
        notes.splice(index, 1);
        fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
    }
}


// Sayfa yüklendiğinde notları getir
window.onload = loadNotes;

window.addNote = addNote; // HTML'deki onclick için global hale getiriyoruz.
