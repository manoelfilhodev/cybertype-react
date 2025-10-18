import { useState } from 'react';
import Menu from './components/Menu';
import GameArea from './components/GameArea';

export default function App() {
  const [inGame, setInGame] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!inGame ? (
        <Menu onStart={() => setInGame(true)} />
      ) : (
        <GameArea onExit={() => setInGame(false)} />
      )}
    </div>
  );
}
