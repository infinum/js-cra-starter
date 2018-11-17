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

const logoClass = css`
  animation: ${logoSpinKeyframes} infinite 20s linear;
  height: 40vmin;
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

export class App extends React.Component {
  public render() {
    return (
      <div className={appClass}>
        <main className={headerClass}>
          <img src={logo} className={logoClass} alt="logo" />
          <p>
            Edit <code>src/containers/App.tsx</code> and save to reload.
          </p>
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
}
