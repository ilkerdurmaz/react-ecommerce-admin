import { initializeApp } from "firebase/app";
import { getFirestore,collection,doc,setDoc,addDoc, onSnapshot   } from "firebase/firestore";

import { getAuth,signOut,onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import toast from 'react-hot-toast'
import {store} from './store/store'
import {loginHandle,logoutHandle} from './store/auth'
import {setProducts} from './store/product'

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_API_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(loginHandle(user.email))
  } else {
    store.dispatch(logoutHandle())
  }
});

onSnapshot(collection(db,'products'),doc=>{

  const products=doc.docs.reduce((products,product)=>[...products,{...product.data(),id:product.id}],[])
  store.dispatch(setProducts(products))
  })

export const login =async (email, password) => {
  try{
    const user=await signInWithEmailAndPassword (auth,email,password)
    toast.success("Successfully logged in")
    return user;
  }
  catch(err){
      toast.error(err.code)
  }
}

export const logout= async ()=>{
  try{
      await signOut (auth)
      toast.success("Successfully logged out")
      return true;
  }
  catch(err){
      toast.error(err.code)
  }
}

export const addProduct = async (data)=>{
  try{
    const result=await addDoc(collection(db,'products'),data)
  }
  catch(err){
    toast.error(err.code)
  }
}

export const updateProduct = async (product,id)=>{
  console.log("firebase içindeyim",product.id)
  try{
    const result=await setDoc(doc(db, 'products', id),product)
    console.log(result)
  }
  catch(err){
    console.log(err)
    toast.error(err.code)
  }
}