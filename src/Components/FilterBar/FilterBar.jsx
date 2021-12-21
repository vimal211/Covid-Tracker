import React, { useContext, useEffect } from "react";
import "./FilterBar.css";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltLeft,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { DataContext } from "../../Context/DataContext";

function FilterBar({ name }) {
  let [
    stateData,
    stateDate,
    searchState,
    setSearchState,
    updateDate,
    setUpdateDate,
    showDistrict,
    setShowDistrict,
    sortByCategory,
    setSortByCategory,
    sortByNumber,
    setSortByNumber,
  ] = useContext(DataContext);

  useEffect(() => {
    return setShowDistrict(false);
  }, []);

  let navigate = useNavigate();
  let params = useParams();
  let prevDate = localStorage.getItem(`date-${params.state}`);
  useEffect(() => {
    if (prevDate) {
      setUpdateDate(prevDate);
    } else {
      setUpdateDate("");
    }
  }, []);
  //
  const moveToHome = () => {
    setSearchState(stateData);
    return navigate("/");
  };
  //
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
  //
  const updateDates = (e) => {
    let date = e.target.value;
    localStorage.setItem(`date-${params.state}`, date);
    setShowDistrict(false);
    setUpdateDate(date);
  };
  //
  const showDist = () => {
    setShowDistrict(true);
  };
  //
  const updateFilter = (e) => {
    let filter = e.target.value;
    if (filter === "Ascending" || filter === "Descending") {
      document.getElementById("search").value = "";
      setSortByNumber(filter);
      setSearchState(undefined);
    } else {
      setSortByCategory(filter);
      setSearchState(undefined);
    }
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
        <div className="filterOptions">
          <div className="distButton">
            <button onClick={showDist}> Districts </button>
          </div>
          <div className="DateFilter">
            <strong>Date : </strong>
            <input
              defaultValue={prevDate ? prevDate : ""}
              className="date"
              onChange={updateDates}
              type="date"
            />
          </div>
        </div>
      ) : (
        <div className="filterCont">
          <input
            id="search"
            onChange={searchStates}
            type="text"
            placeholder="Search"
          />
          <div className="sortFilter">
            <div>
              <FontAwesomeIcon
                style={{ marginRight: "5px" }}
                icon={("fas", faFilter)}
              />

              <strong>Sort By : </strong>
              <select
                onChange={updateFilter}
                defaultChecked="Name"
                defaultValue="Name"
                name="sort"
                id=""
              >
                <option value="Name">Name</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Affected">Affected</option>
                <option value="Vaccinated">Vaccinated</option>
              </select>
              <select
                onChange={updateFilter}
                defaultChecked="Ascending"
                defaultValue="Ascending"
                name="sort"
                id=""
              >
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterBar;
