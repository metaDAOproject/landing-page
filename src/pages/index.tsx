import styled from '@emotion/styled';
import { useState } from 'react';
import SectionTwo from '@/components/SectionTwo';
import SectionOne from '@/components/SectionOne';
import { Intro } from '@/components/Intro';
import Footer from '@/components/Footer';

export const INTRO_SPEED = 1;

const Root = styled.div`
  &.animation {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
`;

export enum SceneState {
  Intro,
  Transition,
  Static,
}

export default function View() {
  const [sceneState, setSceneState] = useState<SceneState>(SceneState.Intro);

  return (
    <Root className={sceneState === SceneState.Intro ? 'animation' : ''}>
      {sceneState === SceneState.Intro ||
      sceneState === SceneState.Transition ? (
        <Intro sceneState={sceneState} setSceneState={setSceneState} />
      ) : null}
      <SectionOne sceneState={sceneState} setSceneState={setSceneState} />
      <SectionTwo sceneState={sceneState} />
      <Footer />
    </Root>
  );
}
