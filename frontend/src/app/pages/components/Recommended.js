import { useEffect, useState } from 'react';

export default function Recommended() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  if (videos.length === 0) {
    return <p className="text-center text-gray-400">No videos uploaded yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <div key={video.id} className="bg-[#1f1f1f] p-4 rounded-lg">
          <video
            controls
            className="w-full h-48 object-cover rounded mb-2"
            src={`/uploads/${video.filename}`}
          ></video>
          <h3 className="text-lg font-bold text-purple-300">{video.title}</h3>
          <p className="text-sm text-gray-400">{video.description}</p>
          <p className="text-xs text-gray-500 mt-1">Uploaded by: {video.creator}</p>
        </div>
      ))}
    </div>
  );
}