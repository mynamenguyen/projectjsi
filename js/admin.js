import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

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

const contactForm = document.getElementById("contactForm")
// cho form lắng nghe sự kiện "submit" 
contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // lấy dữ liệu từ người dùng điền vào form
    const productName = document.getElementById("name_product").value
    const productPrice = document.getElementById("price_product").value 
    const productImage = document.getElementById("image_product").value 
    const categoryProduct = document.getElementById("category_product").value
    try {
        // lưu dữ liệu vào firestore
        await addDoc(collection(db, "products"), {
            productName,
            productPrice,
            productImage,
            categoryProduct,
        })
        alert("Add Product Successfully!!!")
    } catch (error) {
        console.log(error);
        
        alert("Error: ", error.message)
    }
    console.log(productName, productPrice);
})
