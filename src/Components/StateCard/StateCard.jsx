import React from "react";
import "./StateCard.css";
import CardDetails from "./CardDetails";

function StateCard({ data }) {
  const renderCards = () => {
    let fragment;
    if (data.length > 0) {
      fragment = (
        <div className="cardContainer">
          {data.map((ele, ind) => {
            return <CardDetails key={ind} stateData={ele} />;
          })}
        </div>
      );
    } else {
      fragment = <div className="noState">No state found</div>;
    }
    return fragment;
  };
  return <div>{renderCards()}</div>;
}

export default StateCard;
