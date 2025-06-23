"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import Navbar from "@/components/nav";
import UploadForm from "@/components/uploadform";
import ProjectCard from "@/components/Projectcard";
import { Project } from "@/types/project";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Fetch project list
  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];

      setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 relative">
      <Navbar />

      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(true)}
          className="rounded-lg text-md text-white bg-purple-700 hover:bg-purple-800 px-4 py-2 m-4 shadow-md transition"
        >
          + Add Project
        </button>
      </div>

      {/* Floating UploadForm */}
      {showForm && <UploadForm onClose={() => setShowForm(false)} />}

      {/* Project Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {projects.length === 0 ? (
          <p className="text-center text-black col-span-full">No projects uploaded yet.</p>
        ) : (
          projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>
    </main>
  );
}
