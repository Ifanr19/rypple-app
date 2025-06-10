// File: src/app/page.js
"use client";
import { useState } from "react";

const videos = [
  {
    id: 1,
    title: "Building a Dashboard with Rypple JS",
    channel: "Rypple Tutorials",
    views: "1.2K views",
    thumbnail: "https://via.placeholder.com/320x180?text=Video+1",
  },
  {
    id: 2,
    title: "Understanding CSS Grid & Flexbox",
    channel: "Code Academy",
    views: "25K views",
    thumbnail: "https://via.placeholder.com/320x180?text=Video+2",
  },
  {
    id: 3,
    title: "Top 10 JavaScript Tricks",
    channel: "Dev Simplified",
    views: "512K views",
    thumbnail: "https://via.placeholder.com/320x180?text=Video+3",
  },
  {
    id: 4,
    title: "Responsive Design Best Practices",
    channel: "UI/UX Guru",
    views: "8.9K views",
    thumbnail: "https://via.placeholder.com/320x180?text=Video+4",
  },
  // …add more as needed
];

export default function Home() {
  const [search, setSearch] = useState("");
  const filtered = videos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900 overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-60 bg-white border-r border-gray-200 p-4 flex flex-col">
        <div className="text-2xl font-bold text-purple-600 text-center mb-6">
          Rypple
        </div>
        <nav className="flex flex-col space-y-2">
          {[
            ["🏠", "Home"],
            ["🔥", "Trending"],
            ["📺", "Subscriptions"],
            ["📚", "Library"],
          ].map(([icon, label]) => (
            <a
              key={label}
              href="#"
              className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              <span className="mr-3 text-purple-600">{icon}</span>
              {label}
            </a>
          ))}
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6">
          <div className="text-2xl font-bold text-purple-600 mr-8">Rypple</div>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search Rypple..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded pl-3 pr-24 py-2 outline-none"
            />
            <button
              onClick={() => {}}
              className="absolute right-2 top-2 bottom-2 bg-purple-600 text-white px-4 rounded"
            >
              Search
            </button>
          </div>
        </header>

        {/* VIDEO GRID */}
        <main className="p-6 overflow-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded shadow hover:shadow-md cursor-pointer flex flex-col"
                onClick={() => alert(`Play video ID: ${video.id}`)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full object-cover"
                />
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg mb-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {video.channel} • {video.views}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
