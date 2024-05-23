import { SceneState } from '@/pages';
import { useState } from 'react';
import Lottie from 'react-lottie-player';
import LogoAnimate from '@/animations/LogoAnimate.json';

export default function Logo({ sceneState }: { sceneState: SceneState }) {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const segments: [number, number] = isHovering ? [100, 150] : [0, 90];

  return (
    <Lottie
      className="logo"
      loop={false}
      play={sceneState === SceneState.Transition || isHovering}
      animationData={LogoAnimate}
      segments={segments}
      rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
      onMouseEnter={() => {
        if (sceneState === SceneState.Transition) return;

        setIsHovering(true);
      }}
      onComplete={() => {
        setIsHovering(false);
      }}
    />
  );
}
