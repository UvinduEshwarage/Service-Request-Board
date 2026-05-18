"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../services/api";

export default function NewJobPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    contactName: "",
    contactEmail: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/jobs", formData);

      router.push("/");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to create job";
      console.error(error);
      alert(message);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Create New Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Title"
          required
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          name="description"
          value={formData.description}
          placeholder="Description"
          required
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <select
          name="category"
          value={formData.category}
          required
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        >
          <option value="" className="text-black">Select Category</option>
          <option value="Plumbing" className="text-black">Plumbing</option>
          <option value="Electrical" className="text-black">Electrical</option>
          <option value="Painting" className="text-black">Painting</option>
          <option value="Joinery" className="text-black">Joinery</option>
        </select>

        <input
          type="text"
          name="location"
          value={formData.location}
          placeholder="Location"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          name="contactName"
          value={formData.contactName}
          placeholder="Contact Name"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="email"
          name="contactEmail"
          value={formData.contactEmail}
          placeholder="Contact Email"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg "
        />

        <button
          type="submit"
          className="bg-black text-white px-5 py-3 rounded-lg border"
        >
          Create Job
        </button>
      </form>
    </main>
  );
}