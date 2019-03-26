import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="navbar">
      <Link to="/" className="navLinks ">
        <div className={window.location.pathname === '/' ? 'links active' : 'links'}>Search Books</div>
      </Link>
      <Link to="/saved" className="navLinks">
        <div className={window.location.pathname === '/saved' ? 'links active' : 'links'}>Saved Books</div>
      </Link>
    </div>
  );
}

export default Nav;
