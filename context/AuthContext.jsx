/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUser,
  ensureSeedData,
  findUserByEmail,
  getSession,
  getUserById,
  listenUsers,
  loginUser,
  logoutUser,
} from "../lib/users";

const AuthCtx = createContext({ user: null });
export const useAuth = () => useContext(AuthCtx);
const toSessionUser = (nextUser) =>
  nextUser ? { ...nextUser, uid: nextUser.id } : null;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ensureSeedData();

    const hydrate = () => {
      const session = getSession();
      if (!session?.uid) {
        setUser(null);
        return;
      }
      setUser(toSessionUser(getUserById(session.uid)));
    };

    hydrate();
    const unsubUsers = listenUsers(hydrate);
    setLoading(false);
    return unsubUsers;
  }, []);

  const signup = async (email, password, role = "user") => {
    const existing = findUserByEmail(email);
    if (existing) throw new Error("An account with this email already exists");
    const safeRole = role === "admin" ? "user" : role;
    createUser({ email, password, role: safeRole });
  };

  const login = async (email, password) => {
    const loggedIn = loginUser(email, password);
    setUser(toSessionUser(loggedIn));
  };

  const logout = async () => {
    logoutUser();
    setUser(null);
  };

  const value = useMemo(() => ({ user, signup, login, logout }), [user]);

  return <AuthCtx.Provider value={value}>{!loading && children}</AuthCtx.Provider>;
}
