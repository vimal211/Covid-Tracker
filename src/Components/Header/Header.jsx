import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVirus } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <div className="headerContainer">
      <h2>
        <FontAwesomeIcon className="icon" icon={("fas", faVirus)} /> Covid
        Tracker - <span>India</span>{" "}
      </h2>
    </div>
  );
}

export default Header;
