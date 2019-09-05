import { css } from 'emotion';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';

import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { BACKGROUND_PRIMARY } from '../consts/colors';

const Home = React.lazy(() => import('./Home'));
const About = React.lazy(() => import('./About'));

const appClass = css`
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: ${BACKGROUND_PRIMARY};
  min-height: 100vh;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const footerClass = css`
  margin-top: 100px;
  font-size: 16px;
`;

const mainClass = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <div className={appClass}>
        <Navbar />
        <main className={mainClass}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
            </Switch>
          </React.Suspense>
        </main>
        <Footer className={footerClass} />
      </div>
    </BrowserRouter>
  );
};
