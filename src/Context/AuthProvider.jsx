import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
createUserWithEmailAndPassword,
GoogleAuthProvider,
onAuthStateChanged,
signInWithEmailAndPassword,
signInWithPopup,
signOut,
} from "firebase/auth";
import { auth } from "../FireBase/fireBase.init";

const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const provider = new GoogleAuthProvider();

const createUser = (email, password) => {
  setLoading(true);
  return createUserWithEmailAndPassword(auth, email, password);
};

const LoginUser = (email, password) => {
  setLoading(true);
  return signInWithEmailAndPassword(auth, email, password);
};

const GoogleSignIn = () => {
  setLoading(true);
  return signInWithPopup(auth, provider);
};

const SignOutUser = () => {
  setLoading(true);
  return signOut(auth);
};

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
  });
  return () => unsubscribe();
}, []);

const authInfo = {
  createUser,
  user,
  LoginUser,
  GoogleSignIn,
  SignOutUser,
  setUser,
  loading,
};

return (
  <AuthContext.Provider value={authInfo}>
    {children}
  </AuthContext.Provider>
);
};

export default AuthProvider;
