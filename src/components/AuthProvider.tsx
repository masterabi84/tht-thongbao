"use client";

import { getAuth, onAuthStateChanged, signOut, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { app, db } from "@/lib/firebase";

type AuthState = {
  user: User | null;
  /** true khi tài khoản có tài liệu admins/{uid} – tức được cấp quyền đăng bài. */
  isAdmin: boolean;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState>({
  user: null,
  isAdmin: false,
  loading: true,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<Omit<AuthState, "logout">>({ user: null, isAdmin: false, loading: true });

  useEffect(() => {
    const auth = getAuth(app);
    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setState({ user: null, isAdmin: false, loading: false });
        return;
      }
      let isAdmin = false;
      try {
        isAdmin = (await getDoc(doc(db, "admins", user.uid))).exists();
      } catch {
        isAdmin = false;
      }
      setState({ user, isAdmin, loading: false });
    });
  }, []);

  const logout = () => signOut(getAuth(app));

  return <AuthContext.Provider value={{ ...state, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
