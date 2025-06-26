// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAG0UGw-pAB2EjOxDiluCGpn77av_vSP08",
  authDomain: "avc-gerenciador-tarefas.firebaseapp.com",
  databaseURL: "https://avc-gerenciador-tarefas-default-rtdb.firebaseio.com",
  projectId: "avc-gerenciador-tarefas",
  storageBucket: "avc-gerenciador-tarefas.firebasestorage.app",
  messagingSenderId: "784454514033",
  appId: "1:784454514033:web:c5fd232dc083fbf6f0f2d0",
  measurementId: "G-NWN0GRZK99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);