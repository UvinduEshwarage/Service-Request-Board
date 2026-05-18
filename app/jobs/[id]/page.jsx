"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "../../../services/api";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [job, setJob] = useState(null);

  const fetchJob = async () => {
    try {
      const response = await API.get(
        `/jobs/${params.id}`
      );

      setJob(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  const handleStatusChange = async (e) => {
    try {
      const response = await API.patch(
        `/jobs/${params.id}`,
        {
          status: e.target.value,
        }
      );

      setJob(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/jobs/${params.id}`);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!job) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="border rounded-xl p-6 shadow-sm">
        <h1 className="text-3xl font-bold mb-4">
          {job.title}
        </h1>

        <p className="mb-4">
          {job.description}
        </p>

        <div className="space-y-2 mb-6">
          <p>
            <strong>Category:</strong>{" "}
            {job.category}
          </p>

          <p>
            <strong>Location:</strong>{" "}
            {job.location}
          </p>

          <p>
            <strong>Contact:</strong>{" "}
            {job.contactName}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {job.contactEmail}
          </p>
        </div>

        <select
          value={job.status}
          onChange={handleStatusChange}
          className="border p-3 rounded-lg mb-4"
        >
          <option value="Open">Open</option>
          <option value="In Progress">
            In Progress
          </option>
          <option value="Closed">Closed</option>
        </select>

        <div>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-5 py-3 rounded-lg"
          >
            Delete Job
          </button>
        </div>
      </div>
    </main>
  );
}