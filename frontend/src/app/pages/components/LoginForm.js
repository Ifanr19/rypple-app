import { useState } from 'react';

export default function LoginForm({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      onLogin(data.name || email);
    } else {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        className="bg-purple-600 hover:bg-purple-700 transition duration-200 px-4 py-2 rounded"
      >
        Login
      </button>
      <button
        type="button"
        onClick={onSwitchToRegister}
        className="text-sm text-gray-400 hover:text-white underline"
      >
        Don’t have an account? Register
      </button>
    </form>
  );
}
