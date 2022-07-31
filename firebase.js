// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXd-KAXPtQKNY-OIM2BRpwbdor1lspnns",
  authDomain: "fir-201-31263.firebaseapp.com",
  projectId: "fir-201-31263",
  storageBucket: "fir-201-31263.appspot.com",
  messagingSenderId: "205729889377",
  appId: "1:205729889377:web:1693cc1580477cdb793e20"
};

// Initialize Firebase

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}
//const app = initializeApp(firebaseConfig);

const auth = firebase.auth()

export { auth };