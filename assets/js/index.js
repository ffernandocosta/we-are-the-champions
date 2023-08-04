import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-the-champions-af4aa-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsements");

const endorsementFormEl = document.getElementById('endorsement--form');
const endorsementTextareaEl = document.getElementById('endorsement-textarea');
const endorsementInputToEl = document.getElementById('input-to');
const endorsementInputFromEl = document.getElementById('input-from');
const endorsementPostsEl = document.getElementById('endorsement--posts');

endorsementFormEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const endorsementObject = getEndorsementObject();

    clearEndorsementsPostsEl();
    clearInputFieldsEl();

    push(endorsementsInDB, endorsementObject);
});


function getEndorsementObject() {
    const endorsementObject = {
        endorsementContent: endorsementTextareaEl.value,
        to: endorsementInputToEl.value,
        from: endorsementInputFromEl.value,
        isLiked: false,
        likeCount: 0
    }

    return endorsementObject
}

onValue(endorsementsInDB, (snapshot) => {
    if(snapshot.exists()) {
        const endorsementsArray = Object.entries(snapshot.val());

        clearEndorsementsPostsEl();

        for (let i = 0; i < endorsementsArray.length; i++) {
            const currentEndorsement = endorsementsArray[i];
            appendPostToEndorsementPostsEl(currentEndorsement);
        }
    }
});

function appendPostToEndorsementPostsEl(post) {
    const postID = post[0];
    const postValue = post[1];

    const newPostEl = document.createElement('article');
    
    newPostEl.classList.add('endorsement--post');

    let postLikedIconClass = '';

    newPostEl.innerHTML = `
        <span class="post-to">To ${postValue.to}</span>
        <p class="post-content">${postValue.endorsementContent}</p>
        <span class="post-from">From ${postValue.from}</span>
        <span class="post-heart">
            <i class="fa-solid fa-heart like-icon ${postValue.isLiked ? postLikedIconClass = 'liked' : ''}"></i>
            <span class="like-count">${postValue.likeCount ? postValue.likeCount : ''}</span>
        </span>
    `

    endorsementPostsEl.insertBefore(newPostEl, endorsementPostsEl.firstElementChild);

    newPostEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('like-icon')) {
            if (postValue.isLiked) {
                postValue.likeCount--
            }
            else {
                postValue.likeCount++
            }
            
            postValue.isLiked = !postValue.isLiked
            
            const updateData = {
                likeCount: postValue.likeCount,
                isLiked: postValue.isLiked
            }

            update(ref(database, `endorsements/${postID}`), updateData);
        }
    })
}

const clearEndorsementsPostsEl = () => endorsementPostsEl.innerHTML = "";

const clearInputFieldsEl = () => {
    endorsementInputFromEl.value = "";
    endorsementTextareaEl.value = "";
    endorsementInputToEl.value = "";
}