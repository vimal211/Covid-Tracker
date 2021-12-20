import React, { useContext } from "react";
import "./FilterBar.css";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { DataContext } from "../../Context/DataContext";

function FilterBar({ name }) {
  let [
    stateData,
    stateDate,
    searchState,
    setSearchState,
    updateDate,
    setUpdateDate,
  ] = useContext(DataContext);
  // console.log(updateDate);
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
      setSearchState(stateFound);
    }
  };

  const updateDates = (e) => {
    let date = e.target.value;
    console.log(date);
    setUpdateDate(date);
    // let dateObj = stateDate.filter((ele) => {
    //   return ele.name === params.state;
    // });
    // // console.log(dateObj);
    // let selectedDate;
    // if (date === "") {
    //   setUpdateDate(stateDate);
    // } else {
    //   if (dateObj[0].date.dates[date]) {
    //     // console.log(dateObj[0].date.dates[date]);
    //     setUpdateDate(dateObj[0].date.dates[date]);
    //   } else {
    //     // console.log("no result found");
    //     setUpdateDate([]);
    //   }
    // }
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
        <div>
          {" "}
          <input className="date" onChange={updateDates} type="date" />
        </div>
      ) : (
        <div className="searchBar">
          <input onChange={searchStates} type="text" placeholder="Search" />
        </div>
      )}
    </div>
  );
}

export default FilterBar;
