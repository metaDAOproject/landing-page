import styled from '@emotion/styled';
import { Variants, motion, useTime, useTransform } from 'framer-motion';

const NavButton = styled.button`
  all: unset;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui, -apple-system, system-ui, 'Helvetica Neue', Helvetica,
    Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1;
  margin: 0;
  padding: calc(0.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
  color: white;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.1);
  min-width: 128px;

  &:hover,
  &:focus {
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    color: rgba(0, 0, 0, 0.65);
    background-color: #ffffff;
    transform: translateY(-1px);
    border-radius: 0.25rem;
  }

  &:active {
    background-color: #f0f0f1;
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    color: rgba(0, 0, 0, 0.65);
    transform: translateY(0);
  }
`;

const HeaderStyled = styled.div`
  display: flex;
  padding: 0 24px;
  align-items: center;
  position: relative;
  width: 100vw;
  height: 64px;
  background-color: black;
  z-index: 5;
  gap: 16px;

  .logo-container {
    all: unset;

    height: 75%;
    position: relative;
    width: 48px;
    background-color: 'rgba(0,0,0,0)';
    cursor: pointer;
  }

  .logo {
    height: 100%;
    z-index: 5;
    position: absolute;
    left: 0;
    top: 0;

    // turn red into white
    /* filter: invert(0.5) sepia(1) saturate(0) hue-rotate(0deg) brightness(10); */
  }

  .anime-logo {
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
  }

  .anime-logo:nth-of-type(2) {
    filter: invert(0.5) sepia(1) saturate(0) hue-rotate(0deg) brightness(10);
  }

  .anime-logo:nth-of-type(3) {
    // make blue
    filter: invert(1) brightness(2);
  }
`;

export function Header() {
  const time = useTime();

  const xRotationLeft = useTransform<number, number>(
    [time],
    ([time]) => Math.sin((time / 5000) * Math.PI * 2) * 4
  );
  const yRotationLeft = useTransform<number, number>(
    [time],
    ([time]) => Math.cos((time / 5000) * Math.PI * 2) * 4
  );

  const xRotationRight = useTransform<number, number>(
    [time],
    ([time]) => Math.sin((time / 5000 + Math.PI / 2) * Math.PI * 2) * 4
  );

  const yRotationRight = useTransform<number, number>(
    [time],
    ([time]) => Math.cos((time / 5000 + Math.PI / 2) * Math.PI * 2) * 4
  );

  const variantsLeft: Variants = {
    initial: {
      scale: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const variantsRight: Variants = {
    initial: {
      scale: 0,
    },
    animate: {
      // translateX: 4,
      // translateY: 4,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
      },
    },
  };

  const logoButtonVariants: Variants = {
    initial: {
      scale: 1,
    },
    animate: {
      transition: {
        duration: 1,
        when: 'beforeChildren',
        staggerChildren: 0,
      },
    },
  };

  const mainLogoVariants: Variants = {
    initial: {
      // filter:
      // 'invert(0.5) sepia(1) saturate(0) hue-rotate(0deg) brightness(10)',
    },
    animate: {
      filter: 'default',
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <HeaderStyled>
      <motion.button
        className="logo-container"
        initial="initial"
        animate="initial"
        whileHover="animate"
        variants={logoButtonVariants}
      >
        <motion.img
          variants={mainLogoVariants}
          className="logo"
          src="/logo.png"
        ></motion.img>
        <motion.img
          variants={variantsLeft}
          style={{
            translateX: xRotationLeft,
            translateY: yRotationLeft,
          }}
          className="anime-logo"
          src="/logo.png"
        ></motion.img>
        <motion.img
          variants={variantsRight}
          style={{
            translateX: xRotationRight,
            translateY: yRotationRight,
          }}
          className="anime-logo"
          src="/logo.png"
        ></motion.img>
      </motion.button>
      <NavButton>Learn</NavButton>
      <NavButton>Govern</NavButton>
      {/* <NavButton>Vota</NavButton> */}
    </HeaderStyled>
  );
}
