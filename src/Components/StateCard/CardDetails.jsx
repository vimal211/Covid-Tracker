import React from "react";
import { Link } from "react-router-dom";

function CardDetails({ stateData }) {
  //   console.log(state);
  let districts = [];
  if (stateData.data.districts) {
    districts.push(...Object.keys(stateData.data.districts));
  }

  // localStorage.setItem(`${stateData.id}data`, JSON.stringify(stateData.data));

  return (
    <div className="card">
      <div className="top">
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to={`/${stateData.name}`}
        >
          {" "}
          <h3>{stateData.name}</h3>
        </Link>

        {districts.length > 0 ? (
          <select name="districts" id="districts">
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
              {stateData.data.total.confirmed}
            </span>
          </p>
          <p>
            <strong>Recovered</strong> :{" "}
            <span style={{ color: "green" }}>
              {stateData.data.total.recovered}
            </span>
          </p>
          <p>
            <strong>Deceased</strong> :{" "}
            <span style={{ color: "grey" }}>
              {stateData.data.total.deceased}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardDetails;
