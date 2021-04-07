import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../AppContext";

export default function HeadNav(props) {
  const { user, cart, logout } = useContext(AppContext);

  const returnCartLength = cart => {
    return Object.keys(cart).length;
  };

  return (
    <nav
      className="navbar container"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <b className="navbar-item is-size-4 ">ecommerce</b>
        <label
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </label>
      </div>
      <div className={"navbar-menu"}>
        <Link to="/products" className="navbar-item">
          Products
        </Link>
        {user && user.accessLevel < 1 && (
          <Link to="/add-product" className="navbar-item">
            Add Product
          </Link>
        )}
        <Link to="/cart" className="navbar-item">
          Cart
          <span className="tag is-primary" style={{ marginLeft: "5px" }}>
            {Object.keys(cart).length}
          </span>
        </Link>
        {!user ? (
          <Link to="/login" className="navbar-item">
            Login
          </Link>
        ) : (
          <Link to="/" onClick={logout} className="navbar-item">
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
}
