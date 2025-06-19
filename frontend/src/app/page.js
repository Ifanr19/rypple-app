// Final updated version of page.js with modern login/register UI and animation

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

  return (
    <div className="flex min-h-screen bg-[#121212] text-white font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-6 py-4 bg-[#1f1f1f] shadow-md">
          <h1 className="text-2xl font-bold text-purple-400">Rypple</h1>
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
                  src="/avatars/default.png"
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
        </main>
      </div>

      {/* Login Modal */}
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

      {/* Register Modal */}
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
    </div>
  );
}
