import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export function NavBar() {
  return (
    <nav className="aside-nav">
      <Link to="/" title="Home" className="uil uil-estate"/>
      <Link to="/package" title="Loaded package" className="uil uil-box"/>
      <Link to="/queue" title="Downloads queue" className="uil uil-layer-group"/>
      <Link to="/" title="Go to package creator" className="uil uil-globe"/>
      <Link to="/" title="Information" className="uil uil-info-circle"/>
    </nav>
  );
};