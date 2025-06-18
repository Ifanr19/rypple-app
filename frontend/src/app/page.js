'use client';

import { useState } from 'react';
import Sidebar from './pages/components/Sidebar';
import Featured from './pages/components/Featured';
import Recommended from './pages/components/Recommended';
import Modal from './pages/components/Modal';

<<<<<<< Updated upstream
export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('login');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [creator, setCreator] = useState('');
  const [searchParams, setSearchParams] = useState({ query: '', category: '', creator: '' });
=======
export default function HomePage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [query, setQuery] = useState('');
>>>>>>> Stashed changes

  const openModal = (type) => {
    setModalContent(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSearch = async () => {
    const res = await fetch(`/api/search?query=${query}`);
    const data = await res.json();
    console.log('Search results:', data);
  };

  return (
    <div className="flex flex-col sm:flex-row bg-[#0e0e10] min-h-screen text-white">
      <Sidebar />
<<<<<<< Updated upstream
      <div className="flex-1 p-4 space-y-6">
        <header className="flex justify-end gap-2">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() => openModal('login')}
          >
            Login
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            onClick={() => openModal('register')}
          >
            Register
          </button>
=======
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
>>>>>>> Stashed changes
        </header>

        <main className="space-y-6">
          {/* 🔍 Form Pencarian */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchParams({ query, category, creator });
            }}
            className="flex flex-col sm:flex-row gap-2"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title..."
              className="px-4 py-2 rounded bg-gray-700 text-white w-full sm:w-1/3"
            />
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 rounded bg-gray-700 text-white w-full sm:w-1/3"
            >
              <option value="">All Categories</option>
              <option value="FPS">FPS</option>
              <option value="MOBA">MOBA</option>
            </select>
            <select
              onChange={(e) => setCreator(e.target.value)}
              className="px-4 py-2 rounded bg-gray-700 text-white w-full sm:w-1/3"
            >
              <option value="">All Creators</option>
              <option value="shroud">shroud</option>
              <option value="BeyondTheSummit">BeyondTheSummit</option>
            </select>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            >
              Search
            </button>
          </form>

          {/* 🔥 Konten */}
          <Featured />
          <Recommended searchParams={searchParams} />
        </main>
      </div>

      {showModal && (
        <Modal modalContent={modalContent} onClose={closeModal} />
      )}
    </div>
  );
}
