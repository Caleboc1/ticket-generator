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

  // Cloudinary Upload Handler
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      alert("No file selected!");
      return;
    }

    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!uploadPreset || !cloudName) {
      alert("Cloudinary settings are missing. Check your .env.local file.");
      return;
    }

    setLoading(true);
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
        setAvatar(data.secure_url); // Store uploaded image URL
      } else {
        alert("Image upload failed. Try again.");
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, avatar }); // Debugging

    if (!name.trim() || !email.trim() || !avatar.trim()) {
      alert("Please fill all fields and upload an avatar.");
      return;
    }
    onSubmit({ name, email, avatar });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 shadow-lg rounded-lg">
      <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="border p-2 rounded" />
      <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="border p-2 rounded" />

      {/* Avatar Upload */}
      <input type="file" accept="image/*" onChange={handleImageUpload} className="border p-2 rounded" />
      {loading ? <p>Uploading...</p> : avatar && <Image src={avatar} alt="Avatar Preview" className="w-24 h-24 rounded-full mt-2" />}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Generate Ticket
      </button>
    </form>
  );
}
