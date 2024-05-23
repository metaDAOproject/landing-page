import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  Variants,
  motion,
  useAnimation,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import useViewportState from 'beautiful-react-hooks/useViewportState';
import { SceneState } from '@/pages';

export const Root = styled(motion.div)<{}>(
  ({}) => css`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .twap-line {
      border-bottom: 1px dashed rgba(217, 217, 217, 0.5);
      width: 100%;
      left: 0;
    }

    .candlestick {
      position: absolute;
      width: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      left: 105%;

      .top {
        width: 0.5px;
      }

      .middle {
        width: 5px;
      }

      .bottom {
        width: 0.5px;
      }
    }
  `
);

export default function CandleStickFactory() {
  const [spawnRate, setSpawnRate] = useState<number>(1000);
  const rootRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [paused, setPaused] = useState<boolean>(false);

  const averageTop = useMotionValue(50);

  const [candleSticks, setCandleSticks] = useState<
    {
      id: string;
      creationDate: number;
      height: number;
      yPos: number;
      color: string;
      proportions: [number, number, number];
      // seed: number;
    }[]
  >([]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (rootRef.current) {
        const width = rootRef.current.clientWidth;
        const speed = 10_000 / width;
        setSpawnRate(10 * speed);
      }
    });

    if (rootRef.current) {
      resizeObserver.observe(rootRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [rootRef]);

  useEffect(() => {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        setPaused(true);
      } else {
        setPaused(false);
      }
    });
  }, []);

  useEffect(() => {
    if (paused) return;

    const createInterval = setInterval(() => {
      setCandleSticks((prev) => {
        const previousSeed = prev[prev.length - 1];
        const previousTop = previousSeed?.yPos ?? 0;
        const nextTop = Math.min(
          100,
          Math.max(0, previousTop + 10 * (0.5 - Math.random()))
        );

        // Rolling average
        averageTop.set(averageTop.get() + 0.1 * (nextTop - averageTop.get()));

        const height = Math.min(100 - nextTop, 50 * Math.random());

        const color =
          previousTop - nextTop < 0 ? '#FF4B4B' : 'rgb(0, 195, 140)';

        const randomOne = Math.floor(Math.random() * 50);
        const randomTwo = Math.min(
          100 - randomOne,
          25 + Math.floor(Math.random() * (100 - randomOne))
        );
        const numberThree = 100 - randomOne - randomTwo;

        return [
          ...prev,
          {
            id: Date.now().toString(),
            creationDate: Date.now(),
            height,
            yPos: nextTop,
            color,
            proportions: [randomOne, randomTwo, numberThree],
          },
        ];
      });
    }, spawnRate);

    return () => {
      clearInterval(createInterval);
    };
  }, [paused, spawnRate, averageTop]);

  useEffect(() => {
    if (paused) return;

    const createInterval = setInterval(() => {
      setCandleSticks((prev) =>
        prev.filter((candleStick) => {
          return Date.now() - candleStick.creationDate < 10000;
        })
      );
    }, 50);

    return () => {
      clearInterval(createInterval);
    };
  }, [paused]);

  const averageSpring = useSpring(averageTop, {
    damping: 10,
    stiffness: 5,
  });
  const heightTransform = useTransform(averageSpring, (value) => {
    return value + '%';
  });

  return (
    <Root ref={rootRef}>
      <motion.div
        className="twap-line"
        style={{
          height: heightTransform,
        }}
      ></motion.div>
      {candleSticks.map((candleStick) => {
        return (
          <motion.div
            className="candlestick"
            key={candleStick.id}
            animate={!paused ? 'move' : 'stop'}
            variants={{
              move: {
                filter: [
                  'grayscale(1)',
                  'grayscale(0)',
                  'grayscale(0)',
                  'grayscale(0)',
                  'grayscale(0)',
                  'grayscale(0)',
                  'grayscale(0)',
                  'grayscale(0)',
                  'grayscale(0)',
                  'grayscale(1)',
                ],
                left: [
                  '105%',
                  '95%',
                  '85%',
                  '75%',
                  '65%',
                  '55%',
                  '45%',
                  '35%',
                  '25%',
                  '15%',
                  '5%',
                  '-5%',
                ],
                opacity: [0, 0.25, 1, 1, 1, 1, 1, 1, 1, 1, 0.25, 0],
                transition: { duration: 10, ease: 'linear' },
              },
              stop: {},
            }}
            exit={{ opacity: 0 }}
            style={{
              width: '5px',
              height: `${candleStick.height}%`,
              top: `${candleStick.yPos}%`,
            }}
          >
            <motion.div
              className="top"
              style={{
                backgroundColor: candleStick.color,
                flex: candleStick.proportions[0],
              }}
            ></motion.div>
            <motion.div
              className="middle"
              style={{
                backgroundColor: candleStick.color,
                flex: candleStick.proportions[1],
              }}
            ></motion.div>
            <motion.div
              className="bottom"
              style={{
                backgroundColor: candleStick.color,
                flex: candleStick.proportions[2],
              }}
            ></motion.div>
          </motion.div>
        );
      })}
    </Root>
  );
}
