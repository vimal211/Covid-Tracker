import React from "react";
import "./StateCard.css";
import CardDetails from "./CardDetails";

function StateCard({ data }) {
  return (
    <div className="cardContainer">
      {data.map((ele) => {
        return <CardDetails state={ele} />;
      })}
    </div>
  );
}

export default StateCard;
