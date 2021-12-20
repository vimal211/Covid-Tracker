import React, { useContext, useState } from "react";
import "./DetailedPage.css";
import { useParams } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";

function DetailedPage({ date, data }) {
  window.onload = window.scroll(0, 0);
  let [selectedDist, setSelectedDist] = useState("All");
  let [
    stateData,
    stateDate,
    searchState,
    setSearchState,
    updateDate,
    setUpdateDate,
    showDistrict,
    setShowDistrict,
  ] = useContext(DataContext);
  let Params = useParams();
  let currStateDate = date.filter((ele) => {
    return ele.name === Params.state;
  });
  let dates = currStateDate[0].date.dates;
  let currStateData = data.filter((ele) => {
    return ele.name === Params.state;
  });
  let distData = currStateData[0].data.districts;
  let allDistData = [...Object.keys(currStateData[0].data.districts)];

  const updateDist = (e) => {
    let distName = e.target.value;
    if (distName === "All") {
      setSelectedDist("All");
    } else {
      setSelectedDist(distName);
    }
  };

  const tableRender = (dates) => {
    //
    let allDate;
    if (updateDate === "") {
      allDate = Object.keys(dates);
    } else {
      allDate = [];
      allDate.push(updateDate);
    }

    let reqDataArr = showDistrict
      ? selectedDist === "All"
        ? allDistData
        : [selectedDist]
      : allDate;
    //
    let fragment = reqDataArr.map((ele, ind) => {
      console.log(distData);
      let obj = showDistrict ? distData[ele] : dates[ele];

      return (
        <tbody>
          {obj ? (
            <tr key={ind}>
              <td>{ele}</td>
              <td>{obj.total.confirmed ? obj.total.confirmed : "-"}</td>
              <td>{obj.total.recovered ? obj.total.recovered : "-"}</td>
              <td>{obj.total.deceased ? obj.total.deceased : "-"}</td>
              <td>
                {obj.delta ? (
                  <div>
                    <div>
                      Confirmed:
                      {obj.delta.confirmed ? obj.delta.confirmed : "0"}
                    </div>
                    <br />
                    <div>
                      Recovered:
                      {obj.delta.recovered ? obj.delta.recovered : "0"}
                    </div>
                    <br />
                    <div>
                      Deceased:{obj.delta.deceased ? obj.delta.deceased : "0"}
                    </div>
                    <br />
                  </div>
                ) : (
                  "-"
                )}
              </td>
              <td>
                {obj.delta7 ? (
                  <div>
                    <div>
                      Confirmed:
                      {obj.delta7.confirmed ? obj.delta7.confirmed : "0"}
                    </div>
                    <br />
                    <div>
                      Recovered:
                      {obj.delta7.recovered ? obj.delta7.recovered : "0"}
                    </div>
                    <br />
                    <div>
                      Deceased:{obj.delta7.deceased ? obj.delta7.deceased : "0"}
                    </div>
                    <br />
                  </div>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ) : (
            <td align="center" colSpan="6">
              No Result Found
            </td>
          )}
        </tbody>
      );
    });
    return fragment;
  };

  return (
    <div className="detailedPage">
      <div>
        {showDistrict ? (
          <div>
            <strong>Select District : </strong>
            <select onChange={updateDist} name="districts">
              <option value="All">All Districts</option>

              {allDistData.map((ele, ind) => {
                return (
                  <option key={ind} value={ele}>
                    {ele}
                  </option>
                );
              })}
            </select>
          </div>
        ) : (
          ""
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th> {showDistrict ? "District Name" : "Date"}</th>
            <th>Confirmed</th>
            <th>Recovered</th>
            <th>Deceased</th>
            <th>Delta</th>
            <th>Delta 7</th>
          </tr>
        </thead>
        {tableRender(dates)}
      </table>
    </div>
  );
}

export default DetailedPage;
