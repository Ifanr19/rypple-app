import { recommendedStreams } from './DummyData';
import StreamCard from './StreamCard';

export default function Recommended() {
  return (
    <section className="w-full">
      <h2 className="text-white text-lg mb-4">Recommended</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendedStreams.map((stream, idx) => (
          <StreamCard key={idx} stream={stream} />
        ))}
      </div>
    </section>
  );
}
