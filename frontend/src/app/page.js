'use client';

import { useState } from 'react';
import Sidebar from './pages/components/Sidebar';
import Featured from './pages/components/Featured';
import Recommended from './pages/components/Recommended';
import Modal from './pages/components/Modal';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('login');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [creator, setCreator] = useState('');
  const [searchParams, setSearchParams] = useState({ query: '', category: '', creator: '' });

  const openModal = (type) => {
    setModalContent(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col sm:flex-row bg-[#0e0e10] min-h-screen text-white">
      <Sidebar />
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
