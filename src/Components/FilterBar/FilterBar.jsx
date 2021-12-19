import React from "react";
import "./FilterBar.css";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";

function FilterBar({ name }) {
  let navigate = useNavigate();
  let params = useParams();
  const moveToHome = () => {
    return navigate("/");
  };

  return (
    <div className="filterContainer">
      <div className="states">
        <p onClick={moveToHome}>
          {params.state ? (
            <FontAwesomeIcon icon={("fas", faLongArrowAltLeft)} />
          ) : (
            ""
          )}
        </p>
        <p>{params.state ? params.state : name}</p>
      </div>
    </div>
  );
}

export default FilterBar;
