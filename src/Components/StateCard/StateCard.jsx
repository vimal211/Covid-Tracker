import React from "react";
import "./StateCard.css";
import CardDetails from "./CardDetails";

function StateCard({ data }) {
  return (
    <div className="cardContainer">
      {data.map((ele, ind) => {
        return <CardDetails key={ind} stateData={ele} />;
      })}
    </div>
  );
}

export default StateCard;
