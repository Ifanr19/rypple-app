import { useEffect, useState } from 'react';

export default function Sidebar() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="w-64 bg-[#1a1a1a] p-4 text-white">
      <h2 className="text-lg font-bold mb-4">Live Users</h2>
      {users.length === 0 ? (
        <p className="text-sm text-gray-400">No users yet.</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user, idx) => (
            <li key={idx} className="text-sm text-purple-300">
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}