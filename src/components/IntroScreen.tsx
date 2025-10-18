import { useEffect } from "react";

export default function IntroScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const sound = new Audio("/assets/sounds/boot.mp3");
    sound.volume = 0.6;
    sound.play();

    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // 3 segundos de intro

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div id="intro">
      <canvas id="bgCanvas"></canvas>
      <div id="scanline"></div>

      <div id="logoArea">
        <h1 id="introLogo">
          CYBERTYPE_<span>2.0</span>
        </h1>
        <p className="introSub">SYSTEX CYBERLAB</p>
      </div>
    </div>
  );
}
