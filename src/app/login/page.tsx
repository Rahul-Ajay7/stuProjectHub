"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      router.push("/");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Login successful!");
      router.push("/");
    } catch (err: any) {
      console.error(err.message);
      alert("Google login failed");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-black px-7">
      <div className="flex flex-col md:flex-row items-center gap-10">
        
        <div className="text-4xl md:text-6xl font-bold text-center md:text-left">
          Welcome to <span className="text-yellow-600">StuProjectHub</span>
        </div>

    
        <form
          onSubmit={login}
          className="p-8 bg-yellow-400 rounded-xl shadow-md w-full max-w-md space-y-4"
        >
          <h2 className="text-2xl font-bold text-black">Login</h2>

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-2 border rounded text-black"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-2 border rounded text-black"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-red-500"
          >
            Login
          </button>

          <div className="text-center text-gray-900">or</div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Continue with Google
          </button>
        </form>
      </div>
    </main>
  );
}
