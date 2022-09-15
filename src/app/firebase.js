import { initializeApp } from "firebase/app";
import { getFirestore,collection,doc,setDoc,addDoc,deleteDoc,getDocs, onSnapshot,query,where} from "firebase/firestore";

import { getAuth,signOut,onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import toast from 'react-hot-toast'
import {store} from './store/store'
import {loginHandle,logoutHandle} from './store/auth'
import {clearCart} from './store/cart'
import {setProducts} from './store/product'
import { setOrders } from "./store/orders";

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
  try{await addDoc(collection(db,'products'),data)
  toast.success("Successfully added")}
  catch(err){
    toast.error(err.code)
  }
}

export const updateProduct = async (product,id)=>{
  try{await setDoc(doc(db, 'products', id),product)
  toast.success("Successfully updated")}
  catch(err){
    toast.error(err.code)
  }
}

export const deleteProduct = async (id)=>{
  try{await deleteDoc(doc(db, "products", id))
    toast.success("Successfully deleted")
  }
  catch(err){
    toast.error(err.code)
}
}

export const placeOrder = async (order)=>{
  try{
    await addDoc(collection(db,'orders'),order)

    store.dispatch(clearCart())
    toast.success("Order placed successfully")
}
  catch(err){
    toast.error(err.code)
  }
}

export const getMyOrders = async (ownerId)=>{
  const q=query(collection(db,'orders'),where("id","==",ownerId))
  try{
    const querySnapshot = await getDocs(q)
    const orders=[]
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      orders.push({fireId:doc.id,data:doc.data()})
    });
    store.dispatch(setOrders(orders))
  }
  catch(err){
    toast.error(err.code)
  }
}