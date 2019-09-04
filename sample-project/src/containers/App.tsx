import { css, keyframes } from 'emotion';
import React, { FunctionComponent, useState } from 'react';

import logo from '../assets/logo.svg';
import { Footer } from '../components/Footer';
import { BACKGROUND_PRIMARY, LINK_COLOR } from '../consts/colors';

const logoSpinKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const appClass = css`
  text-align: center;
`;

const logoClass = (animationSpeed: boolean) => css`
  animation: ${logoSpinKeyframes} infinite ${animationSpeed}s linear;
  height: 30vmin;
`;

const headerClass = css`
  background-color: ${BACKGROUND_PRIMARY};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const linkClass = css`
  color: ${LINK_COLOR};
`;

const footerClass = css`
  margin-top: 100px;
  font-size: 16px;
`;

export const App: FunctionComponent<{}> = () => {
  const [animationSpeed, setAnimationSpeed] = useState(20);

  const onButtonClick = (action) => {
    return () => {
      if (action === '+') {
        setAnimationSpeed(animationSpeed + 5);
      } else if (animationSpeed >= 0 && action === '-') {
        setAnimationSpeed(animationSpeed - 5);
      }
    };
  };

  return (
    <div className={appClass}>
      <main className={headerClass}>
        <img src={logo} className={logoClass(animationSpeed)} alt="logo" />
        <p>
          Edit <code>src/containers/App.tsx</code> and save to reload.
        </p>
        <div>
          <span>ANIMATION SPEED</span>
          <button onClick={onButtonClick('+')}>+</button>
          <button onClick={onButtonClick('-')}>-</button>
        </div>
        <a className={linkClass} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <Footer className={footerClass} />
      </main>
    </div>
  );
};
