import React from "react";
import Theme from "./Theme";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <p className="logo-text">Text2Math</p>
      </div>
      <div className="options">
        <a className="navbar-link" rel="noreferrer" href="http://asciimath.org" target="_blank">
          Github
        </a>
        <a className="navbar-link" rel="noreferrer" href="http://asciimath.org" target="_blank">
          Sintaxis
        </a>
        <Theme />
      </div>
    </div>
  );
};

export default Navbar;
