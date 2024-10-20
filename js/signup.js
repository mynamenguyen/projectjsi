import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import { getAuth,createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

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

 let formSignup = document.getElementById("formsignup")
 formSignup.addEventListener("submit",function (event){
    event.preventDefault()
    // lay thong tin email va password tu nguoi dung nhap vao
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    // tao nguoi dung moi
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert("register...")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
 }); 
 