import React, { useContext } from "react";
import "./FilterBar.css";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { DataContext } from "../../Context/DataContext";

function FilterBar({ name }) {
  let [stateData, stateDate, searchState, setSearchState] =
    useContext(DataContext);

  let navigate = useNavigate();
  let params = useParams();
  const moveToHome = () => {
    return navigate("/");
  };

  const searchStates = (e) => {
    let input = e.target.value;
    let stateFound = [];
    if (input === "") {
      setSearchState(stateData);
    } else {
      stateFound = stateData.filter((ele) => {
        if (ele.name.toLowerCase().includes(input.toLowerCase())) {
          return ele;
        }
      });
      console.log(stateFound);
      setSearchState(stateFound);
    }
    // console.log(input);
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
      {params.state ? (
        ""
      ) : (
        <div className="searchBar">
          <input onChange={searchStates} type="text" placeholder="Search" />
        </div>
      )}
    </div>
  );
}

export default FilterBar;
