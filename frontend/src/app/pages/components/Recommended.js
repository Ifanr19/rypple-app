import { useEffect, useState } from 'react';
import StreamCard from './StreamCard';

export default function Recommended({ searchParams }) {
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    const fetchStreams = async () => {
      const res = await fetch(`/api/search?query=${searchParams.query}&category=${searchParams.category}&creator=${searchParams.creator}`);
      const data = await res.json();
      setStreams(data);
    };
    fetchStreams();
  }, [searchParams]);

  return (
    <section className="w-full">
      <h2 className="text-white text-lg mb-4">Recommended</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {streams.map((stream, idx) => (
          <StreamCard key={idx} stream={stream} />
        ))}
      </div>
    </section>
  );
}
