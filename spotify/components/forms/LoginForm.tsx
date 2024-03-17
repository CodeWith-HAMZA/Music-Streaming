"use client";
import { account, loginUser } from "@/appwrite";
import { asyncErrorHandler, setLocalStorageItem } from "@/utils/helpers";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(email, password, "hahaha");
    const res = await asyncErrorHandler(() => loginUser(email, password));
    if (res.error) {
      toast.error(
        res.error?.message || "Error while login, Check email and password"
      );
      return;
    }
    if (res.data) {
      console.log(res.data);
      setLocalStorageItem("user", res.data); // update local-storage
      setBusy(false);
      toast.success("Logged in successfully");
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-5xl  font-bold text-white mb-12">
          Log in to Spotify
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-300"
            >
              Email address
            </label>
            <input
              className="flex h-10 w-full border-input bg-background px-3  text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-gray-500 py-4 rounded-md"
              id="email"
              placeholder="name@domain.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <p className="text-xs text-red-500">
              This email is invalid. Make sure it's written like
              example@email.com
            </p> */}
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              className="flex h-10 w-full border-input bg-background px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-gray-500 py-4 rounded-md"
              id="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <p className="text-xs text-red-500">
              This email is invalid. Make sure it's written like
              example@email.com
            </p> */}
          </div>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-opacity-80 h-10 px-4 py-2 bg-[#1db954] text-white w-full"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="my-6 flex items-center">
          <div className="flex-grow h-px bg-gray-600"></div>
          <span className="mx-4 text-sm text-gray-400">or</span>
          <div className="flex-grow h-px bg-gray-600"></div>
        </div>
        <div className="space-y-4">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-opacity-80 h-10 px-4 py-2 bg-white text-black w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="4"></circle>
              <line x1="21.17" y1="8" x2="12" y2="8"></line>
              <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
              <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
            </svg>
            Continue with Google
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#1877F2] text-white w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
            Continue with Facebook
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-opacity-80 h-10 px-4 py-2 bg-black text-white w-full border border-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
              <path d="M10 2c1 .5 2 2 2 5"></path>
            </svg>
            Continue with Apple
          </button>
        </div>
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            Already have an account?{" "}
            <Link
              href="/signup"
              className="hover:text-opacity-70 hover:underline text-[#1db954]"
            >
              Signup up for Spotify.
            </Link>
          </p>
          <p className="mt-4">
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="#" className="text-[#1db954]">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#1db954]">
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
