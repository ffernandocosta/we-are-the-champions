import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-the-champions-af4aa-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsements");

const endorsementFormEl = document.getElementById('endorsement--form');
const endorsementInputTextEl = document.getElementById('input-endorsement');
const endorsementInputToEl = document.getElementById('input-to');
const endorsementInputFromEl = document.getElementById('input-from');

endorsementFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const endorsementObject = getEndorsementObject();

    push(endorsementsInDB, endorsementObject);
});


function getEndorsementObject() {
    const endorsementObject = {
        endorsementContent: endorsementInputTextEl.value,
        to: endorsementInputToEl.value,
        from: endorsementInputFromEl.value,
        isLiked: false,
    }

    return endorsementObject
}