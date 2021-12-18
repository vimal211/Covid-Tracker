import React from "react";

function CardDetails({ state }) {
  //   console.log(state);
  let districts = [];
  if (state.data.districts) {
    districts.push(...Object.keys(state.data.districts));
  }
  console.log(districts);
  return (
    <div className="card">
      <div className="top">
        <h3>{state.name}</h3>
        {districts.length > 0 ? (
          <select name="districts" id="districts">
            <option value="All">All Districts</option>
            {districts.map((ele) => {
              return <option value={ele}>{ele}</option>;
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
            <span style={{ color: "red" }}>{state.data.total.confirmed}</span>
          </p>
          <p>
            <strong>Recovered</strong> :{" "}
            <span style={{ color: "green" }}>{state.data.total.recovered}</span>
          </p>
          <p>
            <strong>Deceased</strong> :{" "}
            <span style={{ color: "grey" }}>{state.data.total.deceased}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardDetails;
