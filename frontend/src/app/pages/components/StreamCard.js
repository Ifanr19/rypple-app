import Image from 'next/image';

export default function StreamCard({ stream }) {
  return (
    <div className="bg-[#1f1f23] rounded-lg overflow-hidden shadow-md hover:scale-[1.01] transition-transform cursor-pointer">
      <div className="relative w-full h-40">
        <Image
          src={stream.thumbnail}
          alt={stream.title}
          layout="fill"
          objectFit="cover"
        />
        {stream.duration && (
          <span className="absolute top-2 right-2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
            {stream.duration}
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold truncate">{stream.title}</h3>
        <p className="text-xs text-gray-400 truncate">{stream.game}</p>
        <div className="flex items-center mt-2 space-x-2">
          <Image src={stream.avatar} alt={stream.streamer} width={20} height={20} className="rounded-full" />
          <span className="text-xs">{stream.streamer}</span>
        </div>
        <div className="flex flex-wrap mt-2 gap-1">
          {stream.tags.map((tag, idx) => (
            <span key={idx} className="text-[10px] bg-gray-700 text-gray-300 px-1 py-0.5 rounded">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
