import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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

// DOM elements
const form = document.getElementById("data-form");
const nameInput = document.getElementById("name");

const priceInput = document.getElementById("price");
console.log(priceInput);

const dataList = document.getElementById("data-list");

// Add or update data in Firestore
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = nameInput.value;
  const price = priceInput.value;

  if (form.dataset.id) {
    // Update existing document
    const id = form.dataset.id;
    try {
      const userRef = doc(db, "products", id);
      await updateDoc(userRef, { name, price });
      nameInput.value = "";
      priceInput.value = "";
      form.dataset.id = "";
      form.querySelector("button").textContent = "Update";
      console.log("Document successfully updated");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  } else {
    // Add new document
    try {
      await addDoc(collection(db, "products"), { name, price });
      nameInput.value = "";
      priceInput.value = "";
      imageInput.value = "";
      console.log("Document successfully added");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
});

// Fetch data from Firestore in real-time
onSnapshot(collection(db, "products"), (snapshot) => {
  dataList.innerHTML = "";
  snapshot.forEach((docId) => {
    const li = document.createElement("li");
    li.setAttribute("data-id", docId.id);
    li.innerHTML = `
            <span>${docId.data().name}</span>
            <span>${docId.data().price}</span>
            <span>${docId.data().image}</span>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        `;
    dataList.appendChild(li);

    // Edit data
    li.querySelector(".edit").addEventListener("click", () => {
      nameInput.value = docId.data().name;
      priceInput.value = docId.data().price;
      imageInput.value = docId.data().image;
      form.dataset.id = docId.id;
      form.querySelector("button").textContent = "Update";
    });

    // Delete data
    li.querySelector(".delete").addEventListener("click", async () => {
      const id = docId.id;
      try {
        await deleteDoc(doc(db, "products", id));
        console.log(`Product with ID ${id} successfully deleted`);
      } catch (error) {
        console.log("Error deleting product: ", error);
      }
    });
  });
});
