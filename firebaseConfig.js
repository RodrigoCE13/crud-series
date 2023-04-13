// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import{ addDoc, collection, getFirestore, onSnapshot, deleteDoc ,doc, getDoc,updateDoc  } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbO1W2q4rnOee8zXc9dRUOub46E2EXngI",
  authDomain: "eva1-app-series.firebaseapp.com",
  projectId: "eva1-app-series",
  storageBucket: "eva1-app-series.appspot.com",
  messagingSenderId: "251281270335",
  appId: "1:251281270335:web:eac8c405043b8dcb4fba8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
export const guardar = (nombre,capitulos,vistos,descripcion,productor) => {
    addDoc(collection(db, "series"),{nombre,capitulos,vistos,descripcion,productor}) 
}
export const obtener = (retorno) =>{
    onSnapshot (collection(db, "series"),retorno)
}
export const eliminarSerie=(id)=>{
    deleteDoc(doc(db, "series", id))
}
export const obtenerSerie = (id) => getDoc(doc(db, "series", id))
export const editarSerie =(id,datos)=>{
    updateDoc(doc(db, "series", id),datos)
}