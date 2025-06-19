'use client';

import { useState, useEffect } from 'react';
import Sidebar from './pages/components/Sidebar';
import Featured from './pages/components/Featured';
import Recommended from './pages/components/Recommended';
import Modal from './pages/components/Modal';
import LoginForm from './pages/components/LoginForm';
import RegisterForm from './pages/components/RegisterForm';

export default function HomePage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
<<<<<<< Updated upstream
=======
  const [videos, setVideos] = useState([]);
  const [filename, setFilename] = useState('');
  const [url, setUrl] = useState('');
>>>>>>> Stashed changes
  const [query, setQuery] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (username) => {
    setCurrentUser(username);
    setIsLoggedIn(true);
    localStorage.setItem('currentUser', username);
    setIsLoginModalOpen(false);
  };

  const handleRegister = (username) => {
    setCurrentUser(username);
    setIsLoggedIn(true);
    localStorage.setItem('currentUser', username);
    setIsRegisterModalOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('currentUser');
  };

  const handleSearch = async () => {
    const res = await fetch(`/api/search?query=${query}`);
    const data = await res.json();
    console.log('Search results:', data);
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/search?query=${query}`);
      setVideos(res.data);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#121212] text-white font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-6 py-4 bg-[#1f1f1f] shadow-md">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold text-purple-400">Rypple</h1>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-600 focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
              >
                Go
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <span className="text-sm">Hello, {currentUser}</span>
                <button
                  className="bg-red-600 px-4 py-1 rounded hover:bg-red-700 transition duration-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="relative">
                <img
                  src="/images/avatars/default.png"
                  alt="User Icon"
                  className="w-8 h-8 cursor-pointer rounded-full border border-white"
                  onClick={() => setIsLoginModalOpen(true)}
                />
              </div>
            )}
          </div>
        </header>

        <main className="px-6 py-4 overflow-auto">
          <Featured />
          <Recommended />
<<<<<<< Updated upstream
=======
          <section className="mt-10">
            <h2 className="text-xl font-bold mb-4">Uploaded Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div key={video.id} className="bg-[#1f1f1f] p-4 rounded shadow">
                  <h3 className="font-semibold mb-2">{video.filename}</h3>
                  <iframe
                    width="100%"
                    height="200"
                    src={video.url}
                    title={video.filename}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
          </section>
>>>>>>> Stashed changes
        </main>
      </div>

      {isLoginModalOpen && (
        <Modal onClose={() => setIsLoginModalOpen(false)}>
          <div className="animate-fadeIn bg-[#1f1f1f] p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <LoginForm
              onLogin={handleLogin}
              onSwitchToRegister={() => {
                setIsLoginModalOpen(false);
                setIsRegisterModalOpen(true);
              }}
            />
          </div>
        </Modal>
      )}

      {isRegisterModalOpen && (
        <Modal onClose={() => setIsRegisterModalOpen(false)}>
          <div className="animate-fadeIn bg-[#1f1f1f] p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <RegisterForm
              onRegister={handleRegister}
              onSwitchToLogin={() => {
                setIsRegisterModalOpen(false);
                setIsLoginModalOpen(true);
              }}
            />
          </div>
        </Modal>
      )}
<<<<<<< Updated upstream
=======

      {isUploadModalOpen && (
        <Modal onClose={() => setIsUploadModalOpen(false)}>
          <div className="bg-[#1f1f1f] p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Upload Video</h2>
            <input
              type="text"
              placeholder="Filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="w-full mb-3 px-3 py-2 bg-[#2c2c2c] text-white rounded"
            />
            <input
              type="text"
              placeholder="YouTube URL (embed format)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full mb-4 px-3 py-2 bg-[#2c2c2c] text-white rounded"
            />
            <button
              className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700 transition"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </Modal>
      )}
>>>>>>> Stashed changes
    </div>
  );
}
