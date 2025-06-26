"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import Navbar from "@/components/nav";
import UploadForm from "@/components/uploadform";
import Footer from "@/components/footer";
import ProjectCard from "@/components/Projectcard";
import { Project } from "@/types/project";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<any>(null); 

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/login");
      } else {
        setUser(firebaseUser);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchProjects = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Project[];

    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  
  const filteredProjects = projects.filter((project: Project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.keywords?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.ownerName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 relative">
      <Navbar />

      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md p-2 border rounded text-black"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(true)}
          className="rounded-lg text-md text-white bg-purple-700 hover:bg-purple-800 px-4 py-2 m-4 shadow-md transition"
        >
          + Add Project
        </button>
      </div>

      {showForm && (
        <UploadForm
          onClose={() => setShowForm(false)}
          onUploadSuccess={fetchProjects}
        />
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredProjects.length === 0 ? (
          <p className="text-center text-black col-span-full">No matching projects found.</p>
        ) : (
          filteredProjects.map((project: Project) => (
            <ProjectCard
              key={project.id}
              project={project}
              currentUserId={user?.uid}
              onDelete={fetchProjects}
            />
          ))
        )}
      </div>
      <Footer/>
    </main>
  );
}
