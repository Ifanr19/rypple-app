// frontend/src/app/page.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useEffect } from 'react';

const followedStreams = [
  { name: 'VALORANT', viewers: '6.6K', avatar: '/images/avatars/valorant.png' },
  { name: 'ESL_CSGO', viewers: '816',  avatar: '/images/avatars/csgo.png'     },
  { name: 'Stewie2K', viewers: '293',  avatar: '/images/avatars/stewie2k.png'  },
  { name: 'shroud',   viewers: '16.6K',avatar: '/images/avatars/shroud.png'    },
  { name: 'BeyondTheSummit', viewers: '225', avatar: '/images/avatars/bts.png' },
  { name: 'KaiCenat', viewers: '97.3K',avatar: '/images/avatars/kaicenat.png' },
  { name: 'zackrawrr',viewers: '26.7K',avatar: '/images/avatars/zack.png'     },
  { name: 'Zy0xxx',   viewers: '2.6K', avatar: '/images/avatars/zy0xxx.png'   },
  { name: 'CDawgVA',  viewers: '18.2K',avatar: '/images/avatars/cdawgva.png' },
  { name: 'sweetdreams', viewers: '9.5K',avatar: '/images/avatars/sweet.png'},
];

const recommendedStreams = [
  {
    thumbnail: '/images/streams/highlight1.png',
    title: '(REBROADCAST) VCT LOCK//IN — Alpha ...',
    game: 'VALORANT',
    streamer: 'VALORANT',
    viewers: '6.6K',
    duration: null,
    avatar: '/images/avatars/valorant.png',
    tags: ['VCT','VALORANTChampionsTour'],
  },
  {
    thumbnail: '/images/streams/highlight2.png',
    title: 'RERUN: Heroic vs. G2 - Map 1 [Nuke] - IE...',
    game: 'Counter-Strike: Global Offensive',
    streamer: 'ESL_CSGO',
    viewers: '816',
    duration: '00:58',
    avatar: '/images/avatars/csgo.png',
    tags: [],
  },
  {
    thumbnail: '/images/streams/highlight3.png',
    title: 'Surviving the COLD | @shroud on socials',
    game: 'DayZ',
    streamer: 'shroud',
    viewers: '16.6K',
    duration: '8:33',
    avatar: '/images/avatars/shroud.png',
    tags: ['English'],
  },
  {
    thumbnail: '/images/streams/highlight4.png',
    title: 'where the hell i am? | @StewieStore | !soc...',
    game: 'VALORANT',
    streamer: 'Stewie2K',
    viewers: '293',
    duration: '0:09',
    avatar: '/images/avatars/stewie2k.png',
    tags: ['English'],
  },
];

export default function LandingPage() {
  // ── Auth state & flow ───────────────────────────────────
  const [isLoggedIn,    setIsLoggedIn]    = useState(false);
  const [showDropdown,  setShowDropdown]  = useState(false);
  const [showModal,     setShowModal]     = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [chatMessages, setChatMessages]   = useState([]);
  const [step,          setStep]          = useState('login'); 
  const [loginForm,     setLoginForm]     = useState({ username: '', password: '' });
  const [phone,         setPhone]         = useState('');
  const [code,          setCode]          = useState(['', '', '', '']);
  const [dob,           setDob]           = useState({ day: '', month: '', year: '' });

  const openLogin  = () => { setStep('login');          setShowModal(true);  setShowDropdown(false); };
  const openSignup = () => { setStep('registerPhone');  setShowModal(true);  setShowDropdown(false); };

  const handleLoginNext = () => {
    // → replace with real API
    setIsLoggedIn(true);
    setShowModal(false);
  };

  const handleRecoverNext = () => {
    if (step === 'recoverOptions') setStep('recoverDone');
    else {
      setShowModal(false);
      setStep('login');
    }
  };

  const handleRegisterNext = () => {
    if (step === 'registerPhone') setStep('registerCode');
    else if (step === 'registerCode')   setStep('registerDob');
    else {
      setIsLoggedIn(true);
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (!selectedVideo) return;
    const iv = setInterval(() => {
      const users = [
        'Alice', 'Bob', 'Carol', 'Dan', 'Eve', 'Frank', 'Grace', 'Hank',
        'Ivy', 'Jack', 'Karen', 'Leo', 'Mia', 'Nina', 'Oscar', 'Pete',
        'Quinn', 'Ray', 'Sara', 'Tom', 'Uma', 'Vince', 'Wendy', 'Xander',
        'Yara', 'Zack'
      ];
      const lines = [
        'Nice play!', 'Wow 😮', 'GG', '😂', 'What a shot!', 'Unbelievable!',
        'Close call!', 'That was epic!', 'Amazing teamwork!', 'I did not expect that!',
        'Clean move!', 'You got lucky 😅', 'Insane aim!', 'Clutch!! 🔥',
        'Nice strategy!', 'This is intense!', 'Haha nice one!', 'Let’s gooo!',
        'We got this 💪', 'No way!', 'Well played!', 'Oops 😬', 'Watch out!',
        'Reloading...', 'Cover me!', 'Need backup!', 'Y’all saw that?',
        'Big brain play 🧠', 'Lag?!', 'This is fun 😄', 'So close!', 'Too easy!',
        'Try again 😂', 'You’re cracked!', 'Let’s win this!', 'Solid match!',
        'Epic fail 😭', 'That was smart!', 'Respect 👏', 'Can’t stop watching!'
      ];
      const user = users[Math.floor(Math.random() * users.length)];
      const text = lines[Math.floor(Math.random() * lines.length)];
      setChatMessages(msgs => [
        ...msgs.slice(-9),
        { id: Date.now(), user, text }
      ]);
    }, 3000);
    return () => clearInterval(iv);
  }, [selectedVideo]);

  // ── Modal content by step ───────────────────────────────
  const renderModalContent = () => {
    switch (step) {
      case 'login':
        return (
          <div className="space-y-4 text-white">
            <h2 className="text-xl font-bold">Welcome Back!</h2>
            <input
              placeholder="Username"
              value={loginForm.username}
              onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
              className="w-64 p-2 rounded bg-gray-800 text-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
              className="w-64 p-2 rounded bg-gray-800 text-white"
            />
            <button
              onClick={handleLoginNext}
              className="w-full py-2 bg-purple-600 rounded text-white font-semibold"
            >
              Next
            </button>
            <div className="flex justify-between text-sm">
              <button onClick={() => setStep('recoverOptions')} className="underline">
                Forgot Password?
              </button>
              <button onClick={openSignup} className="underline">
                Signup Instead?
              </button>
            </div>
          </div>
        );
      case 'recoverOptions':
        return (
          <div className="space-y-4 text-white">
            <h2 className="text-xl font-bold">Welcome Back!</h2>
            <p>Select recovery method</p>
            <div className="space-y-2">
              <label className="block">
                <input type="radio" name="method" defaultChecked /> Via Phone
              </label>
              <label className="block">
                <input type="radio" name="method" /> Via Email
              </label>
            </div>
            <button
              onClick={handleRecoverNext}
              className="w-full py-2 bg-purple-600 rounded text-white font-semibold"
            >
              Next
            </button>
          </div>
        );
      case 'recoverDone':
        return (
          <div className="space-y-4 text-white">
            <h2 className="text-xl font-bold">Welcome Back!</h2>
            <p>Instructions sent — check your inbox to reset your password.</p>
            <button
              onClick={handleRecoverNext}
              className="w-full py-2 bg-purple-600 rounded text-white font-semibold"
            >
              Next
            </button>
          </div>
        );
      case 'registerPhone':
        return (
          <div className="space-y-4 text-white">
            <h2 className="text-xl font-bold">Welcome To Rypple</h2>
            <input
              placeholder="Phone Number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-64 p-2 rounded bg-gray-800 text-white"
            />
            <button
              onClick={handleRegisterNext}
              className="w-full py-2 bg-purple-600 rounded text-white font-semibold"
            >
              Next
            </button>
          </div>
        );
      case 'registerCode':
        return (
          <div className="space-y-4 text-white">
            <h2 className="text-xl font-bold">Verification Code</h2>
            <div className="flex space-x-2">
              {code.map((c,i) => (
                <input
                  key={i}
                  maxLength={1}
                  value={c}
                  onChange={e => {
                    const nc = [...code];
                    nc[i] = e.target.value;
                    setCode(nc);
                  }}
                  className="w-12 p-2 text-center rounded bg-gray-800 text-white"
                />
              ))}
            </div>
            <button
              onClick={handleRegisterNext}
              className="w-full py-2 bg-purple-600 rounded text-white font-semibold"
            >
              Next
            </button>
          </div>
        );
      case 'registerDob':
        return (
          <div className="space-y-4 text-white">
            <h2 className="text-xl font-bold">Date of Birth</h2>
            <div className="flex space-x-2">
              <input
                placeholder="DD"
                value={dob.day}
                onChange={e => setDob({ ...dob, day: e.target.value })}
                className="w-16 p-2 rounded bg-gray-800 text-white"
              />
              <input
                placeholder="MM"
                value={dob.month}
                onChange={e => setDob({ ...dob, month: e.target.value })}
                className="w-16 p-2 rounded bg-gray-800 text-white"
              />
              <input
                placeholder="YYYY"
                value={dob.year}
                onChange={e => setDob({ ...dob, year: e.target.value })}
                className="w-24 p-2 rounded bg-gray-800 text-white"
              />
            </div>
            <button
              onClick={handleRegisterNext}
              className="w-full py-2 bg-purple-600 rounded text-white font-semibold"
            >
              Sign Up
            </button>
          </div>
        );
      default:
        return null;
    }
  };
    // ── Watch Mode ───────────────────────────────────────
  if (selectedVideo) {
    return (
      <div className="flex min-h-screen bg-gray-900">
        {/* video panel */}
        <div className="flex-1 p-4">
          <button
            className="mb-4 text-gray-300 hover:text-white"
            onClick={() => setSelectedVideo(null)}
          >
            ← Back
          </button>
          <video
            src={selectedVideo}
            controls
            autoPlay
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        {/* chat panel */}
        <div className="w-1/3 bg-gray-800 p-4 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-2 mb-4">
            {chatMessages.map(m => (
              <div key={m.id} className="text-sm">
                <span className="font-semibold">{m.user}:</span> {m.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Send a message"
            className="w-full p-2 rounded bg-gray-700 text-white"
            onKeyDown={e => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                setChatMessages([
                  ...chatMessages,
                  { id: Date.now(), user: 'You', text: e.currentTarget.value }
                ]);
                e.currentTarget.value = '';
              }
            }}
          />
        </div>
      </div>
    );
  }

  // ── JSX ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* ── Sidebar ───────────────────────────────────────── */}
      <aside className="w-64 p-4 border-r border-gray-700 flex-shrink-0">
        <div className="mb-8 flex items-center">
          <span className="text-2xl font-bold text-purple-500">Rypple</span>
        </div>
        <h3 className="text-xs uppercase text-gray-400 mb-2">Followed Ryppler</h3>
        <ul className="space-y-2 mb-6">
          {followedStreams.map(s => (
            <li key={s.name} className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-2">
                <Image src={s.avatar} alt={s.name} width={24} height={24} className="rounded-full" />
                <span className="text-sm">{s.name}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xs">{s.viewers}</span>
                <span className="h-2 w-2 bg-red-600 rounded-full" />
              </div>
            </li>
          ))}
        </ul>
        <h3 className="text-xs uppercase text-gray-400 mb-2">Recommended Ryppler</h3>
        <ul className="space-y-2">
          {followedStreams.slice(0,4).map(s => (
            <li key={s.name+'-rec'} className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-2">
                <Image src={s.avatar} alt={s.name} width={24} height={24} className="rounded-full" />
                <span className="text-sm">{s.name}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xs">{s.viewers}</span>
                <span className="h-2 w-2 bg-red-600 rounded-full" />
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* ── Main ──────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="relative flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-800 text-gray-200 placeholder-gray-500 rounded-full py-2 pl-4 pr-10 focus:outline-none"
            />
            <button className="absolute inset-y-0 right-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
              </svg>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .672-3 1.5S10.343 11 12 11s3-.672 3-1.5S13.657 8 12 8zM6 8v8m12-8v8M4 12h16" />
              </svg>
            </button>
            <div className="relative">
              <button onClick={() => setShowDropdown(x => !x)}>
                <div className="flex items-center space-x-2">
                  {!isLoggedIn ? (
                    <>
                      <span>Guest #2391</span>
                      <Image src="/images/avatar.png" alt="Guest" width={32} height={32} className="rounded-full" />
                    </>
                  ) : (
                    <Image src="/images/avatar-loggedin.png" alt="You" width={32} height={32} className="rounded-full" />
                  )}
                </div>
              </button>
              {showDropdown && !isLoggedIn && (
                <div className="absolute right-0 mt-2 w-32 bg-gray-800 rounded shadow-lg">
                  <button onClick={openSignup} className="block w-full text-left px-4 py-2 hover:bg-gray-700">
                    Sign Up
                  </button>
                  <button onClick={openLogin} className="block w-full text-left px-4 py-2 hover:bg-gray-700">
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 overflow-y-auto">
          {/* Highlights */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Highlights For You!</h2>
            <div className="relative">
              <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full hover:bg-gray-700">
                ◀
              </button>
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {recommendedStreams.map((s,i) => (
                  <div
                    key={i}
                    className="cursor-pointer min-w-[320px] bg-gray-800 rounded-lg overflow-hidden"
                    onClick={() => setSelectedVideo('/videos/sample.mp4')} >
                    <div className="relative">
                      <Image src={s.thumbnail} alt={s.title} width={320} height={180} className="object-cover" />
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">LIVE</span>
                      {s.duration && (
                        <span className="absolute top-2 right-2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
                          {s.duration}
                        </span>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold truncate">{s.title}</h3>
                      <p className="text-xs text-gray-400">{s.streamer} • {s.game}</p>
                      <p className="mt-2 text-xs text-gray-300 truncate">👁️ {s.viewers} viewers</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full hover:bg-gray-700">▶</button>
            </div>
          </section>

          {/* Grid */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Live Rypplers we’d think you’ll like!</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedStreams.map((s,i) => (
                <div
                    key={i}
                    className="cursor-pointer bg-gray-800 rounded-lg overflow-hidden"
                    onClick={() => setSelectedVideo('/videos/sample.mp4')}>
                  <div className="relative">
                    <Image src={s.thumbnail} alt={s.title} width={400} height={225} className="object-cover" />
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">LIVE</span>
                    <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      {s.viewers} viewers
                    </span>
                    {s.duration && (
                      <span className="absolute top-2 right-2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
                        {s.duration}
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold truncate">{s.title}</h3>
                    <p className="text-xs text-gray-400 truncate">{s.game}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <Image src={s.avatar} alt={s.streamer} width={20} height={20} className="rounded-full" />
                      <span className="text-xs">{s.streamer}</span>
                    </div>
                    <div className="flex flex-wrap mt-2 gap-1">
                      {s.tags.map((t,j) => (
                        <span key={j} className="text-[10px] bg-gray-700 text-gray-300 px-1 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* ── Modal Overlay ──────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-20 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            {renderModalContent()}
          </div>
        </div>
      )}
    </div>
  );
}
