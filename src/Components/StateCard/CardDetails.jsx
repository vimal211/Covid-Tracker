import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function CardDetails({ stateData }) {
  let [dropdDownValue, setDropDownValue] = useState("All");
  let [displayData, setDisplayData] = useState(stateData.data);

  useEffect(() => {
    let value = localStorage.getItem(stateData.name);
    if (value) {
      setDropDownValue(value);
      if (value === "All") {
        setDisplayData(stateData.data);
      } else {
        setDisplayData(stateData.data.districts[value]);
      }
    }
  }, [displayData]);
  let districts = [];
  if (stateData.data.districts) {
    districts.push(...Object.keys(stateData.data.districts));
  }

  const districtDetail = (e) => {
    let selected = e.target.value;
    localStorage.setItem(stateData.name, selected);
    let disObj = stateData.data.districts[selected];
    {
      selected === "All"
        ? setDisplayData(stateData.data)
        : setDisplayData(disObj);
    }
  };
  return (
    <div className="card">
      <div className="top">
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to={`/${stateData.name}`}
        >
          <h3>{stateData.name}</h3>
        </Link>

        {districts.length > 0 ? (
          <select
            defaultChecked={dropdDownValue}
            value={dropdDownValue}
            onChange={districtDetail}
            name="districts"
            id="districts"
          >
            <option value="All">All Districts</option>
            {districts.map((ele, ind) => {
              return (
                <option key={ind} value={ele}>
                  {ele}
                </option>
              );
            })}
          </select>
        ) : (
          ""
        )}
      </div>
      <div className="bottom">
        <div>TOTAL</div>
        <div>
          <p>
            <strong>Confirmed</strong> :{" "}
            <span style={{ color: "red" }}>
              {displayData.total
                ? displayData.total.confirmed
                  ? displayData.total.confirmed
                  : "-"
                : "-"}
            </span>
          </p>
          <p>
            <strong>Recovered</strong> :{" "}
            <span style={{ color: "green" }}>
              {displayData.total
                ? displayData.total.recovered
                  ? displayData.total.recovered
                  : "-"
                : "-"}
            </span>
          </p>
          <p>
            <strong>Deceased</strong> :{" "}
            <span style={{ color: "grey" }}>
              {displayData.total
                ? displayData.total.deceased
                  ? displayData.total.deceased
                  : "-"
                : "-"}

              {/* {stateData.data.total.deceased} */}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardDetails;
