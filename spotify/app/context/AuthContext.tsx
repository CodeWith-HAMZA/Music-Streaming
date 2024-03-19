"use client";
import { account, databases, getUser } from "@/appwrite";
import { Models } from "appwrite";
import { notFound, usePathname, useRouter } from "next/navigation";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  error: Error | null;
}

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const r = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // * fetches authenticated-user
    getUser()
      .then(async (userData) => {
        console.log("randi ka bacha user he ", userData);
        if (userData.user?.$id) {
          setUser(userData.user);
        }
      })
      .catch((error: Error) => {
        // * If user is not found, redirect to login page
        if (error) {
          if (pathname.includes("/onboarding")) r.push("/login");

          console.log(pathname);
        }
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [r, pathname]);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
