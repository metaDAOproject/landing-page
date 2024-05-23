import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LottieProps } from 'react-lottie-player';
import Lottie from 'react-lottie-player';
import { AnimationItem } from 'lottie-web';

const Root = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .lottie {
    width: 100%;
    height: 100%;
  }

  &:hover {
    cursor: pointer;
  }
`;

interface HoverableLottieProps {
  animationData: any;
  startReversed: boolean;
  hoverSegments?: [number, number];
}

export default function HoverableLottie({
  animationData,
  startReversed,
  segments,
  hoverSegments,
  speed,
}: LottieProps & HoverableLottieProps) {
  const [direction, setDirection] = useState<1 | -1 | undefined>(
    startReversed ? -1 : 1
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const lottieRef = useRef<AnimationItem>();

  useEffect(() => {
    if (lottieRef.current) {
      console.log(lottieRef.current);
    }
  }, [lottieRef]);

  const onMouseLeaveEvent = useCallback(() => {
    lottieRef.current?.goToAndStop(0, true);
  }, [lottieRef]);

  return (
    <Root>
      <Lottie
        rendererSettings={{
          filterSize: { width: '100%', height: '50%', x: '', y: '' },
        }}
        ref={lottieRef}
        className="lottie"
        useSubframes={true}
        loop={true}
        play={isPlaying}
        animationData={animationData}
        segments={
          segments
          // isPlaying ? (hoverSegments ? hoverSegments : segments) : segments
        }
        direction={1}
        speed={speed ? speed : 1}
        onMouseEnter={() => {
          setIsPlaying(true);
          // setDirection(1);
        }}
        onMouseLeave={() => {
          setIsPlaying(false);
          onMouseLeaveEvent();
        }}
        onLoad={(e) => {
          console.log('loaded', e);
        }}
      />
    </Root>
  );
}
