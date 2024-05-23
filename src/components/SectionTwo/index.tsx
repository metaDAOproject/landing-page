import { SceneState } from '@/pages';
import { Variants, motion } from 'framer-motion';
import { useState } from 'react';
import ArrowGrid from '../SectionOne/ArrowGrid';
import CandleStickFactory from '../CandlestickFactory';
import styled from '@emotion/styled';
import { theme } from '../Theme';
import Link from 'next/link';

const Root = styled(motion.div)`
  position: relative;
  overflow: hidden;
  width: 75vw;
  margin: 0 auto;
  margin: 0 auto;

  .race {
    position: relative;
    display: flex;
    width: 100%;
    gap: 2.5%;
    margin: 5vw 0;

    font-family: 'TT Firs Neue Trial', sans-serif;
    font-weight: normal;

    .market {
      flex: 1;
      height: 10vw;
      text-align: center;
      overflow: hidden;

      .title {
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 32px;
      }
    }
  }

  .nav-group {
    display: flex;
    width: 100%;
    gap: 5%;
    margin-bottom: 5vw;
    justify-content: center;

    ${theme.breakpoints.down('md')} {
      flex-direction: column;
      gap: 5vw;
    }

    .nav-item {
      position: relative;
      flex: 1;
      height: 15vw;
      border: 1px solid #444444;
      border-radius: 2vw;
      font-size: 3vw;
      cursor: pointer;
      max-width: 40vw;

      a {
        display: block;
        width: 100%;
        height: 100%;
        padding: 2vw 2.5vw;
        padding-bottom: 2vw;
      }

      ${theme.breakpoints.down('md')} {
        font-size: 6vw;
        padding: 5vw 5vw;
        max-width: unset;
        min-height: 15vw;
        height: unset;
      }

      .title {
        font-family: 'TT Firs Neue Trial', sans-serif;
        font-weight: bold;
        font-size: 1em;
        color: #ff4b4b;
        margin-bottom: 1vw;
        line-height: 3vw;

        &.faas {
          font-size: 0.75em;
        }
      }

      .description {
        font-family: 'TT Firs Neue Trial', sans-serif;
        font-weight: normal;
        font-size: 0.5em;
        color: #ff4b4b;
      }
    }
  }
`;

export default function SectionTwo({ sceneState }: { sceneState: SceneState }) {
  return (
    <Root>
      <div className="race">
        <div className="market">
          {/* <div className="title">Pass Market</div> */}
          <CandleStickFactory />
        </div>
        <div className="spacer"></div>
        <div className="market">
          {/* <div className="title">Fail Market</div> */}
          <CandleStickFactory />
        </div>
      </div>
      <div className="nav-group">
        <div className="nav-item">
          <Link href="https://docs.metadao.fi/">
            <div className="title">Learn</div>
            <div className="description">Learn about how MetaDAO works</div>
          </Link>
        </div>
        <div className="nav-item">
          <Link href="https://futarchy.metadao.fi/">
            <div className="title">Govern</div>
            <div className="description">
              Trade the markets that govern DAOs
            </div>
          </Link>
        </div>
      </div>
      <div className="nav-group">
        <div className="nav-item">
          <Link href="https://vota.fi/">
            <div className="title">Vota</div>
            <div className="description">
              Sell your votes, profiting off the demise of crypto-native voting
              systems
            </div>
          </Link>
        </div>
      </div>
    </Root>
  );
}
