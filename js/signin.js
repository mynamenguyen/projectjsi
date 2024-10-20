import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import { getAuth,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC_iBNsMD-GAiuPq7u3ALC27ycKXUdUKLI",
  authDomain: "doraemon-c47dd.firebaseapp.com",
  projectId: "doraemon-c47dd",
  storageBucket: "doraemon-c47dd.appspot.com",
  messagingSenderId: "434373691184",
  appId: "1:434373691184:web:f5d1136e6d873a0131eaf5"
};


  // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app)

 let formSignIn = document.getElementById("formsignin")
 formSignIn.addEventListener("submit",function (event){
    event.preventDefault()
    // lay thong tin email va password tu nguoi dung nhap vao
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    // tao nguoi dung moi
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      alert("Sign In Successfully!")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
 }); 
