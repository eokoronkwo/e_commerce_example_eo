import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footerContent">
        <Link className="whiteText">About</Link>
      </div>
      <div className="footerContent">
        <Link className="whiteText">LinkedIn</Link>
      </div>
      <div className="footerContent">
        <Link className="whiteText">Upwork</Link>
      </div>
    </div>
  );
}
