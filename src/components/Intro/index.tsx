import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import IntroAnimation from '@/animations/IntroAnimation.json';
import { css } from '@emotion/react';
import Lottie from 'react-lottie-player';
import SectionTwo from '@/components/SectionTwo';
import SectionOne from '@/components/SectionOne';
import CandleStickFactory from '@/components/CandlestickFactory';
import { Variants, motion, useAnimation } from 'framer-motion';
import { INTRO_SPEED, SceneState } from '@/pages';
import { theme } from '../Theme';

const IntroRoot = styled(motion.div)(() => {
  return css`
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 1);

    .overlay {
      position: absolute;
      left: 0;
      top: 0;
      color: white;
      z-index: 1001;
      display: flex;
      width: 100%;
      height: 75%;
      overflow: hidden;

      ${theme.breakpoints.down('md')} {
        display: none;
      }

      gap: 60%;

      .left {
        position: relative;
        margin: 0 5%;
        font-family: 'TT Firs Neue Trial', sans-serif;
        font-weight: normal;
        display: flex;
        flex-direction: column;
        padding-top: 25vh;
        flex: 1;
        background-color: rgba(0, 0, 0, 0.5);

        gap: 16px;

        .expanding-rect {
          background-color: white;
          transform: skewY(0deg);
          height: 16px;
          margin-bottom: 8px;
        }
      }

      .right {
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-top: 25vh;
        margin: 0 5%;
        gap: 2%;
        background-color: rgba(0, 0, 0, 0.5);

        .market {
          height: 20%;
          transform: skewY(0deg);

          font-family: 'TT Firs Neue Trial', sans-serif;
          font-weight: normal;
        }
      }
    }

    .lottie-wrapper {
      position: relative;
      height: 100%;
      width: 100%;
      overflow: hidden;

      ${theme.breakpoints.down('md')} {
        /* width: 50%; */
        /* padding: 0 5%; */
      }

      .lottie-skewer {
        width: 100%;
        height: 100%;

        .lottie-scene {
          width: 100%;
          height: 100%;
        }
      }
    }
  `;
});

export function Intro({
  sceneState,
  setSceneState,
}: {
  sceneState: SceneState;
  setSceneState: Dispatch<SetStateAction<SceneState>>;
}) {
  const controller = useAnimation();

  useEffect(() => {
    controller.start('initial');

    const timeoutId = setTimeout(() => {
      controller.start('animate');
    }, 5000 / INTRO_SPEED);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [controller]);

  const leftVariants = {
    initial: {
      opacity: [0, 1],
      transition: { delay: 0.5 / INTRO_SPEED, duration: 1.25 / INTRO_SPEED },
    },
    animate: {
      x: '-100%',
      opacity: [1, 0],
      transition: {
        duration: 0.75 / INTRO_SPEED,
      },
    },
  };

  const rightVariants = {
    initial: {
      opacity: [0, 1],
      transition: { delay: 0.5 / INTRO_SPEED, duration: 1.25 / INTRO_SPEED },
    },
    animate: {
      x: '100%',
      opacity: [1, 0],
      transition: {
        duration: 0.75 / INTRO_SPEED,
      },
    },
  };

  return (
    <IntroRoot
      animate={{
        backgroundColor: ['rgba(0,0,0,1)', 'rgba(0,0,0,0)'],
        transition: { delay: 7 / INTRO_SPEED },
      }}
    >
      <div className="overlay">
        <motion.div
          className="left"
          animate={controller}
          initial={'initial'}
          variants={leftVariants}
        >
          <TypeWriter speed={0.1 / INTRO_SPEED}>
            {`Proposal 15
It's time to upgrade futarchy!`}
          </TypeWriter>
          <ExpandingRectangle
            className="expanding-rect"
            duration={2 / INTRO_SPEED}
            delay={0 / INTRO_SPEED}
            width={'100%'}
          />
          <ExpandingRectangle
            className="expanding-rect"
            duration={2 / INTRO_SPEED}
            delay={0.5 / INTRO_SPEED}
            width={'100%'}
          />
          <ExpandingRectangle
            className="expanding-rect"
            duration={2 / INTRO_SPEED}
            delay={1 / INTRO_SPEED}
            width={'100%'}
          />
          <ExpandingRectangle
            className="expanding-rect"
            duration={2 / INTRO_SPEED}
            delay={1.5 / INTRO_SPEED}
            width={'100%'}
          />
        </motion.div>
        <motion.div
          className="right"
          animate={controller}
          initial={'initial'}
          variants={rightVariants}
        >
          <motion.div className="market">
            <TypeWriter speed={0.1 / INTRO_SPEED}>Pass Market</TypeWriter>
            <CandleStickFactory />
          </motion.div>
          <motion.div className="market">
            <TypeWriter speed={0.1 / INTRO_SPEED}>Fail Market</TypeWriter>
            <CandleStickFactory />
          </motion.div>
        </motion.div>
      </div>
      <div className="lottie-wrapper">
        <motion.div
          className="lottie-skewer"
          animate={{
            skewY: [90, 0],
            opacity: [0, 1],
            transition: { duration: 1 / INTRO_SPEED },
          }}
        >
          <Lottie
            style={{
              display: sceneState === SceneState.Intro ? '' : 'none',
            }}
            className="lottie-scene"
            loop={false}
            play={sceneState === SceneState.Intro}
            animationData={IntroAnimation}
            segments={[0, 250]}
            speed={INTRO_SPEED}
            rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
            onComplete={(e) => {
              setSceneState(SceneState.Transition);
            }}
          />
        </motion.div>
      </div>
    </IntroRoot>
  );
}

export function TypeWriter({
  speed,
  children,
}: {
  speed: number;
  children: string | JSX.Element[];
}) {
  const typerWriterVariants: Variants = {
    initial: {},
    animate: {
      transition: { staggerChildren: speed },
    },
  };

  const typeWriterCharVairants: Variants = {
    initial: {},
    animate: {
      opacity: [0, 1],
      backgroundColor: ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)'],
      transition: { duration: speed },
    },
  };

  const typeWriterCharFinalVairants: Variants = {
    initial: {},
    animate: {
      color: 'transparent',
      opacity: [0, 1, 0],
      backgroundColor: [
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 0)',
        'rgba(255, 255, 255, 1)',
      ],
      transition: { duration: speed * 10, repeat: 2 },
    },
  };

  return (
    <motion.div animate={'animate'} variants={typerWriterVariants}>
      {typeof children === 'string'
        ? children.split('').map((char, index) => {
            if (char === '\r' || char === '\n') {
              return <br key={index} />;
            }

            return (
              <motion.span key={index} variants={typeWriterCharVairants}>
                {char}
              </motion.span>
            );
          })
        : children}
      <motion.span
        key={children.length + 1}
        variants={typeWriterCharFinalVairants}
      >{`..`}</motion.span>
    </motion.div>
  );
}

export function ExpandingRectangle({
  duration,
  width,
  delay,
  className,
}: {
  duration: number;
  delay: number;
  width: string;
  className?: string;
}) {
  const expandingRectangleVariants: Variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: [0, width],
      transition: {
        duration,
        delay,
        easings: 'easeIn',
      },
    },
  };

  return (
    <motion.div
      className={className}
      animate={'animate'}
      variants={expandingRectangleVariants}
    ></motion.div>
  );
}
