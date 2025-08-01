"use client";

import { auth } from "@/firebase/config";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { db, stg } from "@/firebase/config";
import { addDoc, collection, Timestamp, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";

interface UploadFormInputs {
  title: string;
  description: string;
  keywords: string;
  image: FileList;
  file: FileList;
  externalLink: string;
  price: string;
}

export default function UploadForm({
  onClose,
  onUploadSuccess,
}: {
  onClose: () => void;
  onUploadSuccess: () => void;
}) {
  const { register, handleSubmit, reset } = useForm<UploadFormInputs>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<UploadFormInputs> = async (data) => {
    setLoading(true);
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to upload a project.");
      setLoading(false);
      return;
    }

    try {
      const imageRef = ref(stg, `images/${uuid()}-${data.image[0].name}`);
      await uploadBytes(imageRef, data.image[0]);
      const imageUrl = await getDownloadURL(imageRef);

      const projectRef = await addDoc(collection(db, "projects"), {
        title: data.title,
        description: data.description,
        keywords: data.keywords,
        price: parseFloat(data.price),
        imageUrl,
        fileUrl: "",
        createdAt: Timestamp.now(),
        ownerId: user.uid,
        ownerName: user.displayName || user.email,
        paidUsers: [],
      });

      const projectId = projectRef.id;

      let fileUrl = "";

      if (data.file.length > 0) {
        const fileRef = ref(stg, `projects/${projectId}/${uuid()}-${data.file[0].name}`);
        await uploadBytes(fileRef, data.file[0]);
        fileUrl = await getDownloadURL(fileRef);
      } else if (data.externalLink) {
        fileUrl = data.externalLink;
      }

      await updateDoc(projectRef, { fileUrl });

      alert("✅ Project uploaded successfully!");
      onUploadSuccess();
      onClose();
      reset();
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-2xl font-bold text-black">Upload Your Project</h2>

          <input
            {...register("title")}
            placeholder="Project Title"
            className="w-full p-2 border rounded text-black"
            required
          />
          <textarea
            {...register("description")}
            placeholder="Project Description"
            className="w-full p-2 border rounded text-black"
            rows={3}
            required
          />
          <input
            {...register("keywords")}
            placeholder="SEO Tags (comma-separated)"
            className="w-full p-2 border rounded text-black"
          />

          <div className="w-full">
            <label className="block bg-blue-600 text-white px-4 py-2 rounded cursor-pointer text-center">
              Upload Image
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="hidden"
                required
              />
            </label>
          </div>

          <div className="w-full mt-2">
            <label className="block bg-green-600 text-white px-4 py-2 rounded cursor-pointer text-center">
              Upload File
              <input
                type="file"
                {...register("file")}
                className="hidden"
              />
            </label>
          </div>

          <input
            type="url"
            {...register("externalLink")}
            placeholder="Or external file URL"
            className="w-full p-2 border rounded text-black"
          />

          <input
            type="number"
            {...register("price")}
            placeholder="Price (₹ or $)"
            className="w-full p-2 border rounded text-black"
            required
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {loading ? "Uploading..." : "Upload Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
