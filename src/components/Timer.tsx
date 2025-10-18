import { useEffect, useState } from 'react';

export default function Timer({
  duration = 30,
  onFinish,
}: {
  duration?: number;
  onFinish: () => void;
}) {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    if (time <= 0) {
      onFinish();
      return;
    }
    const timer = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  return (
    <div className="text-2xl text-yellow-400">
      Tempo restante: <span>{time}s</span>
    </div>
  );
}
