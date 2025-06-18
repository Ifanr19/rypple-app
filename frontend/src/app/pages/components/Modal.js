export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-lg"
        >
          ×
        </button>
        <div className="bg-[#1f1f1f] rounded-lg shadow-lg p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
