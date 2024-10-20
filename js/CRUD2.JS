import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, updateDoc, deleteDoc, onSnapshot, doc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC_iBNsMD-GAiuPq7u3ALC27ycKXUdUKLI",
    authDomain: "doraemon-c47dd.firebaseapp.com",
    projectId: "doraemon-c47dd",
    storageBucket: "doraemon-c47dd.appspot.com",
    messagingSenderId: "434373691184",
    appId: "1:434373691184:web:f5d1136e6d873a0131eaf5"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM elements
const productTable = document.getElementById('product-table').getElementsByTagName('tbody')[0];

// Fetch products from Firestore in real-time
onSnapshot(collection(db, 'products'), (snapshot) => {
    productTable.innerHTML = '';
    snapshot.forEach((docId) => {
        const row = productTable.insertRow();
        row.setAttribute('data-id', docId.id);
        row.innerHTML = `
            <td>${docId.data().name}</td>
            <td>${docId.data().price}</td>
            <td>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </td>
        `;

        // Edit product
        row.querySelector('.edit').addEventListener('click', () => {
            const newName = prompt("Enter new name:", docId.data().name);
            const newPrice = prompt("Enter new price:", docId.data().price);

            if (newName !== null && newPrice !== null) {
                try {
                    const productRef = doc(db, 'products', docId.id);
                    updateDoc(productRef, { name: newName, price: newPrice });
                    console.log('Product successfully updated');
                } catch (error) {
                    console.error('Error updating product: ', error);
                }
            }
        });

        // Delete product
        row.querySelector('.delete').addEventListener('click', async () => {
            const id = docId.id;
            try {
                await deleteDoc(doc(db, 'products', id));
                console.log(`Product with ID ${id} successfully deleted`);
            } catch (error) {
                console.log('Error deleting product: ', error);
            }
        });
    });
});
