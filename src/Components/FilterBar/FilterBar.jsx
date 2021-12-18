import React, { useContext } from "react";
import { DataContext } from "../../Context/DataContext";
import "./FilterBar.css";

function FilterBar() {
  let [finalData] = useContext(DataContext);
  return (
    <div className="filterContainer">
      <div className="states">
        <p>States</p>
      </div>
    </div>
  );
}

export default FilterBar;
