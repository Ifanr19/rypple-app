import { useState } from 'react';

export default function RegisterForm({ onRegister, onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', name);
    form.append('email', email);
    form.append('password', password);
    if (avatar) form.append('avatar', avatar);

    const res = await fetch('/api/register', {
      method: 'POST',
      body: form,
    });

    if (res.ok) {
      onRegister(name);
    } else {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-gray-800 text-white px-4 py-2 rounded"
        required
      />
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
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setAvatar(e.target.files[0])}
        className="text-white"
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
