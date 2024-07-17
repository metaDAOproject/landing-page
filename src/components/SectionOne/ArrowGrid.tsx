'use client';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  MotionValue,
  Variants,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import useViewportState from 'beautiful-react-hooks/useViewportState';
import { SceneState } from '@/pages';

export const Grid = styled(motion.div)<{
  columns: number;
  rows: number;
}>(
  ({ columns, rows }) => css`
    left: 0;
    top: 0;
    display: grid;
    grid-template-columns: repeat(${columns}, 1fr);
    grid-template-rows: repeat(${rows}, 1fr);

    justify-content: center;
    align-items: center;
    justify-items: center;
    width: 100%;
    height: 100%;
    z-index: 1;

    .circular-mask {
      position: absolute;
      margin: auto;
      width: 500vh;
      height: 500vh;
      pointer-events: none;
      z-index: 5;
    }
  `
);

// safari fix
export type AppTouchEvent = TouchEvent;

export default function ArrowGrid({ sceneState }: { sceneState: SceneState }) {
  const { width, height } = useViewportState();
  const maskRef = useRef(null);
  const left = useMotionValue<number | undefined>(undefined);
  const top = useMotionValue<number | undefined>(undefined);

  const config = useCallback(() => {
    let columns = Math.floor(width / 50);
    let rows = Math.floor(height / 50);

    if (width > 1440) {
      columns = Math.floor(width / 100);
      rows = Math.floor(height / 100);
    } else if (width > 4000) {
      columns = Math.floor(width / 200);
      rows = Math.floor(height / 200);
    }

    return { columns, rows };
  }, [width, height]);

  const [maskWidth, setMaskWidth] = useState(0);
  const [maskHeight, setMaskHeight] = useState(0);

  useEffect(() => {
    if (!maskRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!maskRef.current) return;
      const mask = maskRef.current as HTMLElement;
      setMaskWidth(mask.clientWidth);
      setMaskHeight(mask.clientHeight);
    });

    resizeObserver.observe(maskRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  });

  const maskVariants: Variants = {
    initial: {
      x: '-50%',
      y: '-50%',
      background: `radial-gradient(
        circle,
        rgba(255, 255, 255, 0) 3%,
        rgba(0, 0, 0, 1) 3.5%
      )`,
      transition: {
        duration: 0.5,
      },
    },
    animate: {
      x: ['-15%', '15%', '0%'],
      y: ['0%', '0%'],
      background: [
        `radial-gradient(
        circle,
        rgba(255, 255, 255, 0) 5%,
        rgba(0, 0, 0, 1) 10%
      )`,
        `radial-gradient(
        circle,
        rgba(255, 255, 255, 0) 5%,
        rgba(0, 0, 0, 1) 5.5%
      )`,
        `radial-gradient(
      circle,
      rgba(255, 255, 255, 0) 3%,
      rgba(0, 0, 0, 1) 3.5%
    )`,
      ],
      transition: {
        duration: 5,
        ease: ['linear', 'easeInOut', 'linear'],
      },
    },
  };

  useEffect(() => {
    if (!maskRef.current) return;
    const ref = maskRef.current as HTMLElement;

    const mouseEvent = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      left.updateAndNotify(x - ref.clientWidth / 2 - 32);
      top.updateAndNotify(window.scrollY + y - ref.clientHeight / 2 - 32);
    };

    const touchEvent = (e: TouchEvent) => {
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;

      left.updateAndNotify(x - ref.clientWidth / 2 - 32);
      top.updateAndNotify(window.scrollY + y - ref.clientHeight / 2 - 32);
    };

    window.addEventListener('mousemove', mouseEvent);
    window.addEventListener('touchmove', touchEvent);

    return () => {
      window.removeEventListener('mousemove', mouseEvent);
      window.removeEventListener('touchmove', touchEvent);
    };
  }, [maskRef, sceneState, left, top]);

  // const bouncyLeft = useSpring(left, {
  //   stiffness: 50,
  //   // damping: 25,
  // });

  // const bouncyTop = useSpring(top, {
  //   stiffness: 50,
  //   // damping: 25,
  // });

  const { columns, rows } = config();

  return (
    <Grid columns={columns} rows={rows}>
      <motion.div
        ref={maskRef}
        style={{
          left: left,
          top: top,
        }}
        variants={maskVariants}
        animate={
          sceneState === SceneState.Transition ||
          sceneState === SceneState.Static
            ? 'animate'
            : 'initial'
        }
        className="circular-mask"
      ></motion.div>
      {
        // create a bunch of arrows
        Array.from({ length: columns * rows }).map((_, i) => (
          <Arrow
            key={i}
            maskRef={maskRef}
            motionValue={left}
            maskHeight={maskHeight}
            maskWidth={maskWidth}
          />
        ))
      }
    </Grid>
  );
}

function Arrow({
  maskRef,
  motionValue,
  maskWidth,
  maskHeight,
}: {
  maskRef: React.RefObject<HTMLDivElement>;
  motionValue: MotionValue<number | undefined>;
  maskWidth: number;
  maskHeight: number;
}) {
  const elementRef = useRef(null);
  const rotation = useMotionValue(Math.PI);

  useEffect(() => {
    if (!elementRef.current) return;
    if (!maskRef.current) return;
    if (!motionValue) return;

    const arrowRef = elementRef.current as HTMLElement;
    const maskRefCurrent = maskRef.current as HTMLElement;
    const motionValueTemp = motionValue;

    const onElementMove = () => {
      // middle of mask element
      let x = maskRefCurrent.getBoundingClientRect().left + maskWidth / 2;
      let y = maskRefCurrent.getBoundingClientRect().top + maskHeight / 2;

      const rect = arrowRef.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distance = Math.abs(x - centerX) + Math.abs(y - centerY);
      if (distance > window.innerHeight * 0.25) {
        return;
      }

      const angle = Math.atan2(y - centerY, x - centerX) - Math.PI / 4;
      rotation.set(angle);
    };

    motionValueTemp.on('change', onElementMove);
  }, [elementRef, rotation, maskRef, maskWidth, maskHeight, motionValue]);

  const rotationInDegrees = useTransform(rotation, (r) => r * (180 / Math.PI));

  return (
    <motion.svg
      viewBox="0 0 3000 3000"
      ref={elementRef}
      style={{
        rotate: rotationInDegrees,
        width: '100%',
        height: '100%',
        scale: 0.5,
        zIndex: 2,
      }}
    >
      <motion.g fill={`rgba(255, 75, 75, 1)`} strokeWidth={64}>
        <path
          d="M370 2786 c0 -118 4 -217 9 -220 5 -3 419 -6 919 -6 637 -1 913 -4
918 -12 4 -6 -477 -494 -1102 -1119 -610 -610 -1111 -1114 -1113 -1120 -5 -15
289 -309 309 -309 8 0 514 499 1124 1109 611 611 1113 1108 1118 1105 4 -3 8
-419 8 -925 l0 -919 220 0 220 0 0 1315 0 1315 -1315 0 -1315 0 0 -214z"
        />
      </motion.g>
    </motion.svg>
  );
}
