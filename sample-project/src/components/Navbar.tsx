import { css } from 'emotion';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { LINK_COLOR } from '../consts/colors';

const navbarClass = css`
  height: 100px;
`;

const navigationLink = css`
  text-decoration: none;
  color: white;
  margin: 0 10px;
`;

const activeLink = css`
  color: ${LINK_COLOR} !important;
`;

export const Navbar: React.FC<{}> = () => {
  return (
    <nav className={navbarClass}>
      <NavLink exact to="/" className={navigationLink} activeClassName={activeLink}>
        HOME
      </NavLink>
      <NavLink to="/about" className={navigationLink}>
        ABOUT
      </NavLink>
    </nav>
  );
};
