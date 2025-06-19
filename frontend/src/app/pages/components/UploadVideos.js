import { useState } from 'react';

export default function UploadVideo({ currentUser }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', title);
    form.append('description', description);
    form.append('creator', currentUser);
    form.append('video', video);

    const res = await fetch('/api/videos', {
      method: 'POST',
      body: form,
    });

    const data = await res.json();
    setMessage(data.message);
    setTitle('');
    setDescription('');
    setVideo(null);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload Video</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded"
          required
        ></textarea>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
          className="text-white"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>
      {message && <p className="mt-4 text-green-400">{message}</p>}
    </div>
  );
}