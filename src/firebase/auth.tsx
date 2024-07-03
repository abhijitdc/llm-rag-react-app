import {
  onAuthStateChanged,
  signOut as authSignOut,
  User,
} from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "./firebase";

export type AuthUserContextType = {
  authUser: User | null;
  isAuthenticated: boolean;
  signOut: () => void;
};

const AuthUserContext = createContext<AuthUserContextType | null>({
  authUser: null,
  isAuthenticated: true,
  signOut: () => {},
});

export default function userFirebaseAuth() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const clear = () => {
    setAuthUser(null);
    setIsAuthenticated(false);
  };

  const authStatusChanged = async (user: User | null) => {
    setIsAuthenticated(true);
    if (user) {
      // console.log("USER IS ", user);
      setAuthUser(user);
    } else {
      // console.log("USER IS LOGOUT ", user);
      clear();
    }
  };

  const signOut = () =>
    authSignOut(auth).then(() => {
      console.log("SIGNOUT");
      clear();
    });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStatusChanged);
    return () => unsubscribe();
  }, []);

  return { authUser, isAuthenticated, signOut };
}

export function AuthUserProvider({ children }: { children: ReactNode }) {
  const auth = userFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
}

export const useAuth = () => useContext(AuthUserContext) as AuthUserContextType;
