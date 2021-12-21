import React, { createContext, useEffect, useState } from "react";
import { stateName, stateCodes } from "../Constants/States";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [stateData, setStateData] = useState();
  const [stateDate, setStateDate] = useState();
  const [searchState, setSearchState] = useState();
  const [updateDate, setUpdateDate] = useState("");
  const [showDistrict, setShowDistrict] = useState(false);
  const [sortByCategory, setSortByCategory] = useState("Name");
  const [sortByNumber, setSortByNumber] = useState("Ascending");

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
        affectedPercentage: Math.ceil(
          ((stateVar[ele].total.confirmed +
            stateVar[ele].total.deceased +
            stateVar[ele].total.recovered) /
            stateVar[ele].meta.population) *
            100
        ),
        vaccinatedPercentage: Math.ceil(
          (stateVar[ele].total.vaccinated2 / stateVar[ele].meta.population) *
            100
        ),
      };
      stateArr.push(obj);
    });
    let dateArr = [];
    stateCodes.forEach((ele, ind) => {
      let obj = {
        id: ind,
        name: stateName[ind],
        date: dateVar[ele],
      };
      dateArr.push(obj);
    });

    setStateData(stateArr);
    setStateDate(dateArr);
  }, []);

  return (
    <DataContext.Provider
      value={[
        stateData,
        stateDate,
        searchState,
        setSearchState,
        updateDate,
        setUpdateDate,
        showDistrict,
        setShowDistrict,
        sortByCategory,
        setSortByCategory,
        sortByNumber,
        setSortByNumber,
      ]}
    >
      {props.children}
    </DataContext.Provider>
  );
};
