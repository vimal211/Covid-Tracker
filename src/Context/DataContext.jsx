import React, { createContext, useEffect, useState } from "react";
import { stateName, stateCodes } from "../Constants/States";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [finalData, setFinalData] = useState();

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
        name: stateName[ind],
        data: stateVar[ele],
        date: dateVar[ele],
      };
      stateArr.push(obj);
    });
    setFinalData(stateArr);
  }, []);

  return (
    <DataContext.Provider value={[finalData]}>
      {props.children}
    </DataContext.Provider>
  );
};
