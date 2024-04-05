import React from "react";
import logo from "../logo.svg";

const Header = () => {
  return (
    <header className="d-flex align-items-center justify-content-center">
      <>
        <img src={logo} alt="Logo" className="logo w-25" />
        <h1>Todo List App</h1>
      </>
    </header>
  );
};

export default Header;
