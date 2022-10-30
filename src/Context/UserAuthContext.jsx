import { createContext, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../Firebase";

const userAuthContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setuser] = useState({});

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signin(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
    
  }

  
  function signInwithGoogle(){
    const googleSignin =new GoogleAuthProvider();
    return signInWithPopup(auth,googleSignin)
  }

  function logout(){
    return signOut(auth);

    
    
  }

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setuser(currentUser);
      
  //   });
  //   console.log(user);
  //   return unsubscribe;
  // }, []);

  onAuthStateChanged(auth,(currentUser)=>{
    setuser(currentUser)
  });

  // useEffect(()=>{
  //   localStorage.setItem("isLoggedIn", true)
  // },[user]);

 

  return (
    <userAuthContext.Provider value={{ signup, user, signin ,logout,signInwithGoogle}}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
