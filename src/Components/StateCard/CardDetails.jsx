import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan, faLessThan } from "@fortawesome/free-solid-svg-icons";

function CardDetails({ stateData }) {
  let [dropdDownValue, setDropDownValue] = useState("All");
  let [cardNo, setCardNo] = useState(1);
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

  const nextSlide = () => {
    let currSlide = cardNo;
    if (currSlide === 3) {
      setCardNo(1);
    } else {
      setCardNo(currSlide + 1);
    }
  };

  const prevSlide = () => {
    let currSlide = cardNo;
    if (currSlide === 1) {
      setCardNo(3);
    } else {
      setCardNo(currSlide - 1);
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
        <div className="leftArrow">
          <FontAwesomeIcon
            onClick={prevSlide}
            className="navigate"
            icon={("fas", faLessThan)}
          />
        </div>

        <div className="details">
          <div>
            <span
              style={{
                fontSize: "40px",
                fontFamily: "monospace",
                fontWeight: "900",
              }}
            >
              {cardNo === 1 ? "TOTAL" : cardNo === 2 ? "DELTA" : "DELTA-7"}
            </span>
          </div>
          <p>
            <strong>Confirmed</strong> :{" "}
            <span style={{ color: "red" }}>
              {cardNo === 1
                ? displayData.total
                  ? displayData.total.confirmed
                    ? displayData.total.confirmed
                    : "-"
                  : "-"
                : cardNo === 2
                ? displayData.delta
                  ? displayData.delta.confirmed
                    ? displayData.delta.confirmed
                    : "-"
                  : "-"
                : displayData.delta7
                ? displayData.delta7.confirmed
                  ? displayData.delta7.confirmed
                  : "-"
                : "-"}
            </span>
          </p>
          <p>
            <strong>Recovered</strong> :{" "}
            <span style={{ color: "green" }}>
              {cardNo === 1
                ? displayData.total
                  ? displayData.total.recovered
                    ? displayData.total.recovered
                    : "-"
                  : "-"
                : cardNo === 2
                ? displayData.delta
                  ? displayData.delta.recovered
                    ? displayData.delta.recovered
                    : "-"
                  : "-"
                : displayData.delta7
                ? displayData.delta7.recovered
                  ? displayData.delta7.recovered
                  : "-"
                : "-"}
            </span>
          </p>
          <p>
            <strong>Deceased</strong> :{" "}
            <span style={{ color: "grey" }}>
              {cardNo === 1
                ? displayData.total
                  ? displayData.total.deceased
                    ? displayData.total.deceased
                    : "-"
                  : "-"
                : cardNo === 2
                ? displayData.delta
                  ? displayData.delta.deceased
                    ? displayData.delta.deceased
                    : "-"
                  : "-"
                : displayData.delta7
                ? displayData.delta7.deceased
                  ? displayData.delta7.deceased
                  : "-"
                : "-"}
            </span>
          </p>
        </div>
        <div className="rightArrow">
          <FontAwesomeIcon
            onClick={nextSlide}
            className="navigate"
            icon={("fas", faGreaterThan)}
          />
        </div>
      </div>
    </div>
  );
}

export default CardDetails;
