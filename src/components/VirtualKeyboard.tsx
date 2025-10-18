import { useEffect, useState } from 'react';

export default function VirtualKeyboard() {
  const [pressed, setPressed] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => setPressed(e.key.toUpperCase());
    const handleKeyUp = () => setPressed('');
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const keys = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');

  return (
    <div className="grid grid-cols-10 gap-1 mt-6">
      {keys.map((k) => (
        <div
          key={k}
          className={`p-2 rounded text-center font-semibold transition ${
            pressed === k
              ? 'bg-cyan-500 text-black scale-110'
              : 'bg-gray-700 text-white'
          }`}
        >
          {k}
        </div>
      ))}
    </div>
  );
}
