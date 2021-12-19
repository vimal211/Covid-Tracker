import React, { createContext, useEffect, useState } from "react";
import { stateName, stateCodes } from "../Constants/States";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [stateData, setStateData] = useState();
  const [stateDate, setStateDate] = useState();
  const [searchState, setSearchState] = useState();

  useEffect(async () => {
    let stateVar = await fetch(
      "https://data.covid19india.org/v4/min/data.min.json"
    ).then((data) => data.json());
    let dateVar = await fetch(
      "https://data.covid19india.org/v4/min/timeseries.min.json"
    ).then((data) => data.json());

    let stateArr = [];
    stateCodes.forEach((ele, ind) => {
      let obj = {
        id: ind,
        name: stateName[ind],
        data: stateVar[ele],
        // date: dateVar[ele],
      };
      stateArr.push(obj);
    });
    let dateArr = [];
    stateCodes.forEach((ele, ind) => {
      let obj = {
        id: ind,
        name: stateName[ind],
        // data: stateVar[ele],
        date: dateVar[ele],
      };
      dateArr.push(obj);
    });
    setStateData(stateArr);
    setStateDate(dateArr);
  }, []);

  return (
    <DataContext.Provider
      value={[stateData, stateDate, searchState, setSearchState]}
    >
      {props.children}
    </DataContext.Provider>
  );
};
