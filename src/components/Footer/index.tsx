import { SceneState } from '@/pages';
import { Variants, motion } from 'framer-motion';
import { useState } from 'react';
import ArrowGrid from '../SectionOne/ArrowGrid';
import CandleStickFactory from '../CandlestickFactory';
import styled from '@emotion/styled';
import { theme } from '../Theme';

const Root = styled(motion.div)`
  position: relative;
  display: flex;
  max-width: 100vw;
  max-height: 400px;
  height: 400px;
  justify-content: flex-end;
  padding-right: 5vw;
  align-items: center;
  border-top: 1px solid #444444;

  ${theme.breakpoints.down('md')} {
    height: 100px;
    padding: 0;
    justify-content: center;
  }

  .grouping {
    display: flex;
    height: max-content;
    align-items: center;
    flex-direction: center;

    .logo {
      width: 7.5vw;
    }

    .name {
      width: 40vw;
      max-width: 500px;
    }
  }
`;

export default function Footer() {
  return (
    <Root>
      <div className="grouping">
        <img className="logo" src="/logo.png" />
        <img className="name" src="/metadao.png" />
      </div>
    </Root>
  );
}
