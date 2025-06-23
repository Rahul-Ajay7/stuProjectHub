"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "@/firebase/config";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center text-black">
      <div className="text-xl font-bold">
        <Link href="/">stuProjectHub</Link>
      </div>

      <div className="space-x-4">
        <Link href="/" className="rounded-lg bg-slate-700 text-white text-bold text-sm p-2 hover:bg-black">
          Home
        </Link>

        {user && (
          <Link href="/my-projects" className="rounded-lg bg-black text-white text-bold text-sm p-2">
            My Projects
          </Link>
        )}

        {!user ? (
          <>
            <Link href="/login" className="rounded-lg bg-green-500 text-white text-bold text-sm p-2 hover:bg-green-700">
              Login
            </Link>
            <Link href="/register" className="rounded-lg bg-blue-600 text-white text-bold text-sm p-2 hover:bg-blue-900">
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="text-gray-700">Hello, {user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
