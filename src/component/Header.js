import React from "react";

function Header() {

  return (
    <header>
      <h1>JUNHA KIM</h1>
      <nav>
        <ul>
          <li>
            <a href="#projects">Project</a>
            <span className="indicator active"></span>
          </li>
          <li>
            <a href="#about">About</a>
            <span className="indicator"></span>
          </li>
          <li>
            <a href="#contact">Contact</a>
            <span className="indicator"></span>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;