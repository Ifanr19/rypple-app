import { useEffect, useState } from 'react';

export default function Sidebar() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="w-64 bg-[#1a1a1a] p-4 text-white font-sans border-r border-[#2a2a2a] min-h-screen">
      <h2 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2 tracking-wide">
        Live Users
      </h2>
      {users.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No users yet.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user, idx) => (
            <li key={idx} className="flex items-center space-x-3">
              <span className="relative w-8 h-8">
              <img
                src={`/avatars/${user.avatar || 'default.png'}`}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover border border-gray-600"
              />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-[#1a1a1a] rounded-full"></span>
              </span>
              <span className="text-sm text-white font-medium hover:text-purple-400 transition duration-200">
                {user.name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
