import React from "react";

export const Menu = ({header, children}) => {

  return (
    <div className="container">
      <header>
        <h1>{header}</h1>
      </header>
      <nav className="navbar">
        <div>      
          <div id="navbarNav" className="navbar">
            <ul className="navbar-list">
              {children}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
