// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import uuid from "react-uuid";
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

export const handleSaveBuilder = async (
  imagenes,
  tabs,
  value,
  formData,
  id
) => {
  // ACA NECESITO GENERAR UN CAMPO CON KEY = ID DEL DOCUMENTO Y VALUE TRUE O FALSE
  // SI EL VALOR ES TRUE ENTONCES EL DOCUMENTO SE RENDERIZA
  let paths = [];

  let objetoDb;
  imagenes.forEach(async (imagen, index) => {
    const directory = tabs.filter((tab) => tab.id === value);
    console.log(tabs, id, value, directory);
    const pathName = `${directory[0].label.toString()}/${
      imagen.name
    } ${uuid()}`;
    const uploadRef = ref(rootRef, pathName);
    const uploadResponse = await uploadBytes(uploadRef, imagen);
    console.log(uploadResponse, "Upload");
    const getDownloadURLResponse = await getDownloadURL(uploadResponse.ref);
    console.log(getDownloadURLResponse, "download");
    paths.push(getDownloadURLResponse);
    console.log(
      "Indice",
      index,
      " Largo ",
      imagenes.length - 1,
      "imagenes",
      paths
    );
    if (index === imagenes.length - 1) {
      console.log("adentro", paths);
      const pageColectionTab = tabs.filter((tab) => tab.id === value);
      objetoDb = {
        ...formData,
        id: id,
        render: true,
        images: paths,
        timeStamp: serverTimestamp(),
      };
      console.log("Database Object", objetoDb);
      const docRef = doc(db, pageColectionTab[0].label, id);
      setDoc(docRef, objetoDb);
    }
  });
};
