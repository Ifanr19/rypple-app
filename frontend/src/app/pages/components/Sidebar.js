import Image from 'next/image';
import { followedStreams } from './DummyData';

export default function Sidebar() {
  return (
    <aside className="w-full sm:w-60 bg-[#18181b] p-4 space-y-4">
      <h2 className="text-white font-semibold text-lg">Followed Channels</h2>
      <ul className="space-y-3">
        {followedStreams.map((stream, index) => (
          <li key={index} className="flex items-center space-x-3">
            <Image
              src={stream.avatar}
              alt={stream.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <p className="text-white text-sm">{stream.name}</p>
              <p className="text-gray-400 text-xs">{stream.viewers} viewers</p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
