import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDuIrIeMCViBP9MBzpH4e-dIvM0giW_89o",
  authDomain: "monstore-4cc7f.firebaseapp.com",
  projectId: "monstore-4cc7f",
  storageBucket: "monstore-4cc7f.appspot.com",
  messagingSenderId: "677459163918",
  appId: "1:677459163918:web:17eec77addeeb346b0755f"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const products = document.getElementById("products")
const querySnapshot = await getDocs(collection(db, "products"));
querySnapshot.forEach((doc) => {
    let div = document.createElement("div");
    div.classList.add('product')
    div.innerHTML = `
        <img src=${doc.data().productImage} />
        <h1>${doc.data().productName}</h1>
        <h5>${doc.data().productPrice}</h5>
        
    `
    products.appendChild(div)
  console.log(doc.id, " => ", doc.data());
});