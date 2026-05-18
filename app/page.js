"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API from "../services/api";

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState("");

  const fetchJobs = async () => {
    try {
      let url = "/jobs";

      if (category) {
        url += `?category=${category}`;
      }

      const response = await API.get(url);

      setJobs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [category]);

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">
          Service Request Board
        </h1>

        <Link
          href="/newJob"
          className="bg-black text-white px-4 py-2 rounded-lg border"
        >
          New Job
        </Link>
      </div>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded-lg mb-6 "
      >
        <option value="" className="text-black">
          All Categories
        </option>
        <option value="Plumbing" className="text-black">
          Plumbing
        </option>
        <option value="Electrical" className="text-black">
          Electrical
        </option>
        <option value="Painting" className="text-black">
          Painting
        </option>
        <option value="Joinery" className="text-black">
          Joinery
        </option>
      </select>


      <div className="grid gap-4 ">
        {jobs.map((job) => (
          <Link
            key={job._id}
            href={`/jobs/${job._id}`}
            className="border rounded-xl p-4 shadow-sm"
          >
            <h2 className="text-xl font-semibold">
              {job.title}
            </h2>

            <p className="text-gray-600">
              {job.description}
            </p>

            <div className="flex gap-3 mt-3 text-sm">
              <span>{job.category}</span>
              <span>{job.location}</span>
              <span>{job.status}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}