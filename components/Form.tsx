"use client";

import { useState } from "react";
import Image from "next/image";

type TicketFormProps = {
  onSubmit: (data: { name: string; email: string; avatar: string }) => void;
};

export default function Form({ onSubmit }: TicketFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Cloudinary Upload Handler
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setUploadError("No file selected!");
      return;
    }

    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!uploadPreset || !cloudName) {
      setUploadError("Cloudinary settings are missing. Check your .env.local file.");
      return;
    }

    setLoading(true);
    setUploadError("");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        setAvatar(data.secure_url);
      } else {
        setUploadError("Image upload failed. Try again.");
      }
    } catch (error) {
      setUploadError("Upload failed. Please try again.");
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !avatar.trim()) {
      alert("Please fill all fields and upload an avatar.");
      return;
    }
    onSubmit({ name, email, avatar });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 shadow-lg rounded-lg max-w-md mx-auto">
      <label htmlFor="name" className="sr-only">Full Name</label>
      <input id="name" type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="border p-2 rounded" />
      
      <label htmlFor="email" className="sr-only">Email Address</label>
      <input id="email" type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="border p-2 rounded" />
      
      <label htmlFor="avatar-upload" className="sr-only">Upload Avatar</label>
      <input id="avatar-upload" type="file" accept="image/*" onChange={handleImageUpload} className="border p-2 rounded" />
      
      {loading && <p aria-live="polite">Uploading...</p>}
      {uploadError && <p className="text-red-500" aria-live="polite">{uploadError}</p>}
      {avatar && <Image src={avatar} alt="Avatar Preview" width={96} height={96} className="w-24 h-24 rounded-full mt-2 mx-auto" />}
      
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
        Generate Ticket
      </button>
    </form>
  );
}
