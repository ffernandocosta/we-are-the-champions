import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js"
import { getDatabase, ref, push, onValue, update } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB-6x2UHQ0u9dod96SVVFsCuzIBTzCATws",
    authDomain: "we-are-the-champions-af4aa.firebaseapp.com",
    databaseURL: "https://we-are-the-champions-af4aa-default-rtdb.firebaseio.com",
    projectId: "we-are-the-champions-af4aa",
    storageBucket: "we-are-the-champions-af4aa.appspot.com",
    messagingSenderId: "306029764979",
    appId: "1:306029764979:web:ac8e1aad17247d19436506"
};

// firebase 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsements");

// endorsement form elements 
const endorsementFormEl = document.getElementById('endorsement--form');
const endorsementTextareaEl = document.getElementById('endorsement-textarea');
const endorsementInputToEl = document.getElementById('input-to');
const endorsementInputFromEl = document.getElementById('input-from');
const endorsementPostsEl = document.getElementById('endorsement--posts');
const endorsementsSectionEl = document.querySelector('.endorsements--section');

// authentication form elements
const authFormEl = document.getElementById('auth--form');
const userEmailEl = document.getElementById('user-email');
const userPasswordEl = document.getElementById('user-password');
const loginButton = document.getElementById('auth--login');
const signUpButton = document.getElementById('auth--sign-up');
const signOutButton = document.getElementById('sign-out-button');

const userSignUp = async() => {
    const signUpEmail = userEmailEl.value;
    const signUpPassword = userPasswordEl.value;

    createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
    .then((userCredential) => {
        const user = userCredential.user;
        alert("Your account has been created successfully!");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`${errorMessage}`);
    })
}

const userLogin = async() => {
    const loginEmail = userEmailEl.value;
    const loginPassword = userPasswordEl.value;

    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
        const user = userCredential.user;
        alert("You have signed in successfully!");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`${errorMessage}`);
    })
}

const userSignOut = async () => {
    await signOut(auth);
}

loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    userLogin();
});

signUpButton.addEventListener('click', (e) => {
    e.preventDefault();
    userSignUp();
});

signOutButton.addEventListener('click', (e) => {
    e.preventDefault();
    userSignOut();
});

const checkAuthState = async() => {
    onAuthStateChanged(auth, user => {
        if(user) {
            endorsementsSectionEl.style.display = 'block';
            authFormEl.style.display = 'none';
            signOutButton.style.display = 'block';

            onValue(endorsementsInDB, (snapshot) => {
                if(snapshot.exists()) {
                    const endorsementsArray = Object.entries(snapshot.val());
            
                    clearEndorsementsPostsEl();
            
                    for (let i = 0; i < endorsementsArray.length; i++) {
                        const currentEndorsement = endorsementsArray[i];
                        appendPostToEndorsementPostsEl(currentEndorsement, user.uid);
                    }
                }
            });
        }
        else {
            endorsementsSectionEl.style.display = 'none';
            authFormEl.style.display = 'block';
            signOutButton.style.display = 'none';
        }
    })
}

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
        likes: ['0'],
        likeCount: 0
    }

    return endorsementObject
}

function appendPostToEndorsementPostsEl(post, userUid) {
    const postID = post[0];
    const postValue = post[1];
    
    const uidLikesArray = Object.values(postValue.likes)
    const userLiked = uidLikesArray.includes(userUid)

    const newPostEl = document.createElement('article');
    
    newPostEl.classList.add('endorsement--post');

    let postLikedIconClass = userLiked ? 'liked' : '';

    newPostEl.innerHTML = `
        <span class="post-to">To ${postValue.to}</span>
        <p class="post-content">${postValue.endorsementContent}</p>
        <span class="post-from">From ${postValue.from}</span>
        <span class="post-heart">
            <i class="fa-solid fa-heart like-icon ${postLikedIconClass}"></i>
            <span class="like-count">${postValue.likeCount ? postValue.likeCount : ''}</span>
        </span>
    `

    endorsementPostsEl.insertBefore(newPostEl, endorsementPostsEl.firstElementChild);

    newPostEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('like-icon')) {
            const userIndex = postValue.likes.indexOf(userUid);

            if (userIndex !== -1) {
                postValue.likes.splice(userIndex, 1);
            }
            else {
                postValue.likes.push(userUid);
            }

            const postValueUpdateData = {
                likes: postValue.likes,
                likeCount: postValue.likes.length - 1
            }

            update(ref(database, `endorsements/${postID}`), postValueUpdateData);
        }
    })
}

const clearEndorsementsPostsEl = () => endorsementPostsEl.innerHTML = "";

const clearInputFieldsEl = () => {
    endorsementInputFromEl.value = "";
    endorsementTextareaEl.value = "";
    endorsementInputToEl.value = "";
}

checkAuthState();