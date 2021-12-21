import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan, faLessThan } from "@fortawesome/free-solid-svg-icons";

function CardDetails({ cardData }) {
  let [cardNo, setCardNo] = useState(1);
  let [selectedDist, setSelectedDist] = useState("All");

  let districts = [];
  if (cardData.data.districts) {
    districts.push(...Object.keys(cardData.data.districts));
  }

  const districtDetail = (e) => {
    let selected = e.target.value;
    setSelectedDist(selected);
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
          to={`/${cardData.name}`}
        >
          <h3>{cardData.name}</h3>
        </Link>

        {districts.length > 0 ? (
          <select
            aria-checked={selectedDist}
            value={selectedDist}
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
      <div className="middle">
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
            <p>
              <strong>Confirmed : </strong>{" "}
              <span style={{ color: "red" }}>
                {" "}
                {selectedDist === "All"
                  ? cardNo === 1
                    ? cardData.data.total
                      ? cardData.data.total.confirmed
                        ? cardData.data.total.confirmed
                        : "-"
                      : "-"
                    : cardNo === 2
                    ? cardData.data.delta
                      ? cardData.data.delta.confirmed
                        ? cardData.data.delta.confirmed
                        : "-"
                      : "-"
                    : cardData.data.delta7
                    ? cardData.data.delta7.confirmed
                      ? cardData.data.delta7.confirmed
                      : "-"
                    : "-"
                  : //

                  cardNo === 1
                  ? cardData.data.districts[selectedDist].total
                    ? cardData.data.districts[selectedDist].total.confirmed
                      ? cardData.data.districts[selectedDist].total.confirmed
                      : "-"
                    : "-"
                  : cardNo === 2
                  ? cardData.data.districts[selectedDist].delta
                    ? cardData.data.districts[selectedDist].delta.confirmed
                      ? cardData.data.districts[selectedDist].delta.confirmed
                      : "-"
                    : "-"
                  : cardData.data.districts[selectedDist].delta7
                  ? cardData.data.districts[selectedDist].delta7.confirmed
                    ? cardData.data.districts[selectedDist].delta7.confirmed
                    : "-"
                  : "-"}
              </span>
            </p>
            <p>
              <strong>Recovered : </strong>{" "}
              <span style={{ color: "green" }}>
                {" "}
                {selectedDist === "All"
                  ? cardNo === 1
                    ? cardData.data.total
                      ? cardData.data.total.recovered
                        ? cardData.data.total.recovered
                        : "-"
                      : "-"
                    : cardNo === 2
                    ? cardData.data.delta
                      ? cardData.data.delta.recovered
                        ? cardData.data.delta.recovered
                        : "-"
                      : "-"
                    : cardData.data.delta7
                    ? cardData.data.delta7.recovered
                      ? cardData.data.delta7.recovered
                      : "-"
                    : "-"
                  : //
                  cardNo === 1
                  ? cardData.data.districts[selectedDist].total
                    ? cardData.data.districts[selectedDist].total.recovered
                      ? cardData.data.districts[selectedDist].total.recovered
                      : "-"
                    : "-"
                  : cardNo === 2
                  ? cardData.data.districts[selectedDist].delta
                    ? cardData.data.districts[selectedDist].delta.recovered
                      ? cardData.data.districts[selectedDist].delta.recovered
                      : "-"
                    : "-"
                  : cardData.data.districts[selectedDist].delta7
                  ? cardData.data.districts[selectedDist].delta7.recovered
                    ? cardData.data.districts[selectedDist].delta7.recovered
                    : "-"
                  : "-"}
              </span>
            </p>
            <p>
              <strong>Deceased : </strong>{" "}
              <span style={{ color: "grey" }}>
                {" "}
                {selectedDist === "All"
                  ? cardNo === 1
                    ? cardData.data.total
                      ? cardData.data.total.deceased
                        ? cardData.data.total.deceased
                        : "-"
                      : "-"
                    : cardNo === 2
                    ? cardData.data.delta
                      ? cardData.data.delta.deceased
                        ? cardData.data.delta.deceased
                        : "-"
                      : "-"
                    : cardData.data.delta7
                    ? cardData.data.delta7.deceased
                      ? cardData.data.delta7.deceased
                      : "-"
                    : "-"
                  : //
                  cardNo === 1
                  ? cardData.data.districts[selectedDist].total
                    ? cardData.data.districts[selectedDist].total.deceased
                      ? cardData.data.districts[selectedDist].total.deceased
                      : "-"
                    : "-"
                  : cardNo === 2
                  ? cardData.data.districts[selectedDist].delta
                    ? cardData.data.districts[selectedDist].delta.deceased
                      ? cardData.data.districts[selectedDist].delta.deceased
                      : "-"
                    : "-"
                  : cardData.data.districts[selectedDist].delta7
                  ? cardData.data.districts[selectedDist].delta7.deceased
                    ? cardData.data.districts[selectedDist].delta7.deceased
                    : "-"
                  : "-"}
              </span>
            </p>
          </div>
        </div>
        <div className="rightArrow">
          <FontAwesomeIcon
            onClick={nextSlide}
            className="navigate"
            icon={("fas", faGreaterThan)}
          />
        </div>
      </div>
      <div className="bottom">
        <p>
          {" "}
          <strong> Affected : </strong>
          <span>{cardData.affectedPercentage}%</span>
        </p>
        <p>
          {" "}
          <strong> Vaccinated : </strong>
          <span>{cardData.vaccinatedPercentage}%</span>
        </p>
      </div>
    </div>
  );
}

export default CardDetails;
