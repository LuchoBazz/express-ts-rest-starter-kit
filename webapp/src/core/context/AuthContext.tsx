import type { Unsubscribe, User, UserCredential } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../auth/firebase/firebase.config";

export const authContext = createContext<any>(null);

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    return null;
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const subscribed: Unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
    });
    return () => subscribed();
  }, []);

  const register = async (email: string, password: string): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async (): Promise<UserCredential> => {
    const responseGoogle = new GoogleAuthProvider();
    return signInWithPopup(auth, responseGoogle);
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  return (
    <authContext.Provider
      value={{
        register,
        login,
        loginWithGoogle,
        logout,
        user,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
