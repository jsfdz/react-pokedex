import firebase from "firebase/app"
import "firebase/auth"

firebase.initializeApp({
    apiKey: "AIzaSyD9A-wd8_yF3vVUQzMarh1-lWZ4ULaIYdc",
    authDomain: "pokeapp-api.firebaseapp.com",
    projectId: "pokeapp-api",
    storageBucket: "pokeapp-api.appspot.com",
    messagingSenderId: "699283716538",
    appId: "1:699283716538:web:f069d634e7104219314583",
    measurementId: "G-TTGPHP9F2K"
})

export const
    app = firebase,
    googleAuthProvider = new firebase.auth.GoogleAuthProvider(),
    facebookAuthProvider = new firebase.auth.FacebookAuthProvider(),
    githubAuthProvider = new firebase.auth.GithubAuthProvider()