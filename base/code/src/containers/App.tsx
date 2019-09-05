import { css, keyframes } from 'emotion';
import * as React from 'react';

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

const logoClass = (animationSpeed: number) => css`
  animation: ${logoSpinKeyframes} infinite ${animationSpeed}s linear;
  height: 30vmin;
`;

const buttonClass = css`
  padding: 10px;
  margin: 5px;
`;

const stateContaninerClass = css`
  margin: 40px 0;
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

export const App: React.FC<{}> = () => {
  const [animationSpeed, setAnimationSpeed] = React.useState(40);

  const onButtonClick = (action: string) => {
    return () => {
      if (action === '+' && animationSpeed > 5) {
        setAnimationSpeed(animationSpeed - 5);
      } else if (action === '-') {
        setAnimationSpeed(animationSpeed + 5);
      }
    }
  }

  return (
    <div className={appClass}>
      <main className={headerClass}>
        <img src={logo} className={logoClass(animationSpeed)} alt="logo" />
        <p>
          Edit <code>src/containers/App.tsx</code> and save to reload.
        </p>
        <div className={stateContaninerClass}>
          <span>ANIMATION SPEED</span>
          <div>
            <button className={buttonClass} onClick={onButtonClick('+')}>+</button>
            <button className={buttonClass} onClick={onButtonClick('-')}>-</button>
          </div>
        </div>
        <a
          className={linkClass}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Footer className={footerClass} />
      </main>
    </div>
  );
}
