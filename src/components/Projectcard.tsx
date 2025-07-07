"use client";

import { Project } from "@/types/project";
import { doc, deleteDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/firebase/config";

interface Props {
  project: Project;
  currentUserId?: string;
  onDelete?: () => void;
}
export default function ProjectCard({ project, onDelete, currentUserId }: Props) {
  const [user, setUser] = useState<any>(null);
  const [hasPaid, setHasPaid] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user && project.paidUsers?.includes(user.uid)) {
        setHasPaid(true);
      }
    });
    return () => unsubscribe();
  }, [project]);

  const handlePayment = async () => {
  const createOrder = httpsCallable(functions, "createOrder");
  const order = await createOrder({
    amount: project.price,
    currency: "INR",
    receipt: `receipt_${project.id}`
  });

  const options = {
    key: "YOUR_RAZORPAY_KEY_ID",
    amount: order.data.amount,
    currency: order.data.currency,
    name: "StuProjectHub",
    description: project.title,
    order_id: order.data.id,
    handler: async function (response: any) {
      await updateDoc(doc(db, "projects", project.id!), {
        paidUsers: arrayUnion(user.uid),
      });
      alert("✅ Payment successful!");
      setHasPaid(true);
    },
    prefill: { email: user?.email },
    theme: { color: "#6366F1" },
  };

  const rzp = new (window as any).Razorpay(options);
  rzp.open();
};

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this project?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "projects", project.id!));
      alert("🗑️ Project deleted.");
      onDelete?.();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete project.");
    }
  };

  return (
    <div className="bg-white shadow rounded p-4 space-y-2">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-xl font-semibold text-black">{project.title}</h3>
      <p className="text-gray-700">{project.description}</p>
      <p className="text-gray-600 font-bold">₹{project.price}</p>

      <div className="flex justify-between items-center">
        {hasPaid ? (
          <a
            href={project.fileUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            ⬇ Download
          </a>
        ) : (
          <button
            onClick={handlePayment}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            💳 Pay to Download
          </button>
        )}

     {currentUserId === project.ownerId && (
  <button
    onClick={handleDelete}
    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded mt-2"
  >
    Delete
  </button>
)}
      </div>
    </div>
  );
}
