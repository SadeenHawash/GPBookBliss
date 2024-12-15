import 'firebase/app'
import { initializeApp } from 'firebase/app'

import 'firebase/storage'
import { getStorage } from 'firebase/storage';

const firebaseConfig = initializeApp ({
    apiKey: "AIzaSyDPIq9OYznV3SOZYlGSVATwUwOKP9rK4bI",
    authDomain: "bookbliss-6c239.firebaseapp.com",
    projectId: "bookbliss-6c239",
    storageBucket: "bookbliss-6c239.appspot.com",
    messagingSenderId: "165320693952",
    appId: "1:165320693952:web:358147791727f06c93b525"
})

const storage = getStorage(firebaseConfig);

export default storage;

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDPIq9OYznV3SOZYlGSVATwUwOKP9rK4bI",
//   authDomain: "bookbliss-6c239.firebaseapp.com",
//   projectId: "bookbliss-6c239",
//   storageBucket: "bookbliss-6c239.appspot.com",
//   messagingSenderId: "165320693952",
//   appId: "1:165320693952:web:358147791727f06c93b525"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);