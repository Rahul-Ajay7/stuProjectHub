import { Project } from "@/types/project";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-white shadow-md rounded p-4">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="text-xl font-bold mt-2">{project.title}</h3>
      <p className="text-gray-700">₹{project.price}</p>
      <a
        href={project.fileUrl}
        download
        className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download
      </a>
    </div>
  );
}
