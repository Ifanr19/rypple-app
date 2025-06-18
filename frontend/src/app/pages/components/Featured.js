import Image from 'next/image';

export default function Featured() {
  return (
    <section className="relative w-full h-[240px] sm:h-[360px] rounded-lg overflow-hidden shadow-lg">
      <Image
        src="/images/featured/featured1.jpg"
        alt="Featured Stream"
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 text-white">
        <h2 className="text-xl sm:text-2xl font-bold">Featured Stream</h2>
        <p className="text-sm text-gray-300">Watch the most exciting games live</p>
      </div>
    </section>
  );
}
