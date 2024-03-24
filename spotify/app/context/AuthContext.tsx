"use client";
import { account, databases, getUser } from "@/appwrite";
import { users } from "@/appwrite/user.service";
import { Artist, User } from "@/utils/types";
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
  onboardedUser: User | null;
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
  const [onboardedUser, setOnboardedUser] = useState<User | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const r = useRouter();
  const pathname = usePathname();
  async function getOnboardedUser(params: User) {
    const res = await users.getAllUsers(params);
    const user = res?.documents?.at(0) || null;
    return user as User | Artist | null;
  }
  useEffect(() => {
    // * fetches authenticated-user
    getUser()
      .then(async (userData) => {
        console.log("randi ka bacha user he ", userData);
        if (userData.user?.$id) {
          setUser(userData.user);
          const onboardedUser = await getOnboardedUser({
            email: userData.user?.email,
          });
          if (onboardedUser) {
            setOnboardedUser(onboardedUser);
            console.log(onboardedUser, "on");
          }
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
    <AuthContext.Provider value={{ user, loading, error, onboardedUser }}>
      {children}
    </AuthContext.Provider>
  );
};
