import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { sunIcon, moonIcon } from '../utils/icons';

interface INavProps {
  theme: string;
  toggleTheme: () => void;
}

export default function Nav({ theme, toggleTheme }: INavProps) {
  return (
    <nav className="split">
      <NavLink to="/" className="nav-link">
        GitHub Battle
      </NavLink>
      <ul className="row">
        <li>
          <NavLink to="/" className="nav-link">
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink to="/battle" className="nav-link">
            Battle
          </NavLink>
        </li>
        <li>
          <button className="btn secondary icon" onClick={toggleTheme}>
            {theme === 'light' ? moonIcon : sunIcon}
          </button>
        </li>
      </ul>
    </nav>
  );
}
