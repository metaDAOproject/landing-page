import styled from '@emotion/styled';
import { Variants, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Logo from '@/components/SectionOne/Logo';
import { SceneState } from '@/pages';
import { Dispatch, SetStateAction } from 'react';
import { theme } from '../Theme';
import Link from 'next/link';

const ArrowGrid = dynamic(() => import('@/components/SectionOne/ArrowGrid'), {
  ssr: false,
});

const Root = styled(motion.div)`
  position: relative;
  margin: 32px;
  border: 1px solid gray;
  border-radius: 2.5vw;
  height: calc(100vh - 64px);
  overflow: hidden;

  .logo {
    position: absolute;
    z-index: 1000;
    width: 15vw;
    top: -1vw;
    left: -1vw;
    cursor: pointer;

    ${theme.breakpoints.down('xl')} {
      width: 40vw;
      top: -5vw;
      left: -5vw;
    }
  }

  .nav-list {
    position: absolute;
    right: 3vw;
    top: 2%;
    z-index: 10;

    .nav {
      font-family: 'TT Firs Neue Trial', sans-serif;
      font-weight: bold;
      color: #ff4b4b;
      font-size: 5vw;
      cursor: pointer;
      text-align: right;
      overflow: hidden;

      ${theme.breakpoints.down('xl')} {
        font-size: 10vw;
      }
    }
  }

  .slogan {
    position: absolute;
    font-family: 'TT Firs Neue Trial', sans-serif;
    font-weight: normal;
    bottom: 10%;
    left: 5vw;
    font-size: 2.5vw;
    z-index: 10;

    ${theme.breakpoints.down('lg')} {
      font-size: 4vw;
      width: 100%;
      left: 0;
      text-align: center;
    }
  }
`;

export default function SectionTwo({
  sceneState,
  setSceneState,
}: {
  sceneState: SceneState;
  setSceneState: Dispatch<SetStateAction<SceneState>>;
}) {
  const navListVariants: Variants = {
    initial: {},
    animate: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const navItemVariants: Variants = {
    initial: {
      x: '150%',
    },
    animate: {
      x: 0,
      transition: {
        duration: 1.5,
        easings: 'easeIn',
      },
    },
  };

  const taglineContainerVariants: Variants = {
    initial: {},
    animate: {
      transition: { staggerChildren: 1 },
    },
  };

  const taglineVariants: Variants = {
    initial: {
      x: '-150%',
    },
    animate: {
      x: 0,
      transition: {
        duration: 1,
        easings: 'easeIn',
      },
    },
  };

  return (
    <Root
      animate={sceneState !== SceneState.Intro ? 'animate' : 'initial'}
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: [0, 1],
          transition: { delay: 0.1, duration: 1 },
        },
      }}
      onAnimationComplete={() => {
        if (sceneState === SceneState.Transition) {
          setSceneState(SceneState.Static);
        }
        // setSceneState(SceneState.Static);
      }}
    >
      <Logo sceneState={sceneState}></Logo>
      <motion.div className="nav-list" variants={navListVariants}>
        <motion.div
          className="nav"
          variants={navItemVariants}
          whileHover={{ scale: 1.1, transformOrigin: 'right' }}
        >
          <Link href="https://docs.metadao.fi/">Learn</Link>
          {/* <HoverableLottie
              animationData={LearnHover}
              startReversed={false}
              segments={[139 + 33, 210 + 139 + 33]}
            /> */}
        </motion.div>
        <motion.div
          className="nav"
          variants={navItemVariants}
          whileHover={{ scale: 1.1, transformOrigin: 'right' }}
        >
          <Link href="https://futarchy.metadao.fi/">
            Govern
            {/* <HoverableLottie
              animationData={GovernHover}
              startReversed={false}
              segments={[139 + 33, 210 + 139 + 33]}
            /> */}
          </Link>
        </motion.div>
        <motion.div
          className="nav"
          variants={navItemVariants}
          whileHover={{ scale: 1.1, transformOrigin: 'right' }}
        >
          <Link href="https://vota.fi/">Vota</Link>
          {/* <HoverableLottie
              animationData={VotaHover}
              startReversed={false}
              segments={[139 + 33, 210 + 139 + 33]}
            /> */}
        </motion.div>
      </motion.div>
      <motion.div
        className="slogan"
        variants={taglineContainerVariants}
        whileHover={{
          // scale: 1.1,
          transition: {
            easings: 'easeIn',
          },
        }}
      >
        <motion.div variants={taglineVariants}>
          MetaDAO is the world’s first
        </motion.div>
        <motion.div variants={taglineVariants}>
          market-governed organization.
        </motion.div>
      </motion.div>
      <ArrowGrid sceneState={sceneState} />
    </Root>
  );
}
