// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnFChqPrUeaa8T-PgTxlkTp-UZByvMhCI",
  authDomain: "defensacivilsaladillo-18702.firebaseapp.com",
  projectId: "defensacivilsaladillo-18702",
  storageBucket: "defensacivilsaladillo-18702.appspot.com",
  messagingSenderId: "991734746643",
  appId: "1:991734746643:web:ce0ce917d908abaad2f9e6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const pagesCollection = collection(db, "pages");
export const storage = getStorage();
export const rootRef = ref(storage);

export const handleSaveBuilder = (
  imagenes,
  tabs,
  setImagePath,
  imagePath,
  value,
  formData
) => {
  let paths = [];
  imagenes.forEach((imagen) => {
    const directory = tabs.filter((tab) => tab.id === value);
    const pathName = `${directory[0].label.toString()}/${imagen.name}`;
    const uploadRef = ref(rootRef, pathName);
    getDownloadURL(ref(rootRef, pathName)).then((res) => paths.push(res));
    uploadBytes(uploadRef, imagen);
  });

  setImagePath(paths);
  const pageColectionTab = tabs.filter((tab) => tab.id === value);
  const objetoDb = {
    title: formData.title,
    description: formData.description,
    timeStamp: serverTimestamp(),
    images: imagePath,
  };
  console.log(objetoDb);
  addDoc(collection(db, pageColectionTab[0].label), objetoDb);
};
