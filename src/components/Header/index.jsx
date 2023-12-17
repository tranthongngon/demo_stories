import React from "react";
import Logo from "../../assets/images/one_again.png";
import "./style.css";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="site-header-wrap">
          <Link to="/" className="site-logo">
            <img src={Logo} alt="logo-one-again" />
          </Link>
          <div className="wrap-link">
            <NavLink to="/stories">Stories</NavLink>
            <NavLink to="/new-story">New story</NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
