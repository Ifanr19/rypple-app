import { useState } from 'react';

export default function RegisterForm({ onRegister, onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      onRegister(username);
    } else {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="bg-gray-800 text-white px-4 py-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-gray-800 text-white px-4 py-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 transition duration-200 px-4 py-2 rounded"
      >
        Register
      </button>
      <button
        type="button"
        onClick={onSwitchToLogin}
        className="text-sm text-gray-400 hover:text-white underline"
      >
        Already have an account? Login
      </button>
    </form>
  );
}
