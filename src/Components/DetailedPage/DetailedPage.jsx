import React, { useContext } from "react";
import "./DetailedPage.css";
import { useParams } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";

function DetailedPage({ date, data }) {
  window.onload = window.scroll(0, 0);
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
  console.log(currStateData);

  let distData = currStateData[0].data.districts;

  const tableRender = (dates) => {
    let allDistData = [];
    allDistData = Object.keys(currStateData[0].data.districts);
    //
    let allDate;
    if (updateDate === "") {
      allDate = Object.keys(dates);
    } else {
      allDate = [];
      allDate.push(updateDate);
    }
    let reqDataArr = showDistrict ? allDistData : allDate;
    //
    let fragment = reqDataArr.map((ele, ind) => {
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
