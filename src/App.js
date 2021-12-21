import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import FilterBar from "./Components/FilterBar/FilterBar";
import Header from "./Components/Header/Header";
import { DataContext } from "./Context/DataContext";
import StateCard from "./Components/StateCard/StateCard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailedPage from "./Components/DetailedPage/DetailedPage";
import Spinner from "./Components/Spinner/Spinner";

function App() {
  let [
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
  ] = useContext(DataContext);

  let [loading, setLoading] = useState(true);
  let [sortData, setSortData] = useState();
  const [confirmed, setConfirmed] = useState();
  const [affected, setAffected] = useState();
  const [vaccinated, setVaccinated] = useState();

  useEffect(() => {
    if (stateData === undefined || stateDate === undefined) {
      setLoading(true);
    }
    if (stateData !== undefined && stateDate !== undefined) {
      let confirmedArr = [...stateData].sort((a, b) => {
        return a.data.total.confirmed - b.data.total.confirmed;
      });
      let affectedArr = [...stateData].sort((a, b) => {
        return a.affectedPercentage - b.affectedPercentage;
      });
      let vaccinatedArr = [...stateData].sort((a, b) => {
        return a.vaccinatedPercentage - b.vaccinatedPercentage;
      });
      setConfirmed(confirmedArr);
      setAffected(affectedArr);
      setVaccinated(vaccinatedArr);
      if (sortByCategory === "Name") {
        if (sortByNumber === "Ascending") {
          setSortData(stateData);
        } else {
          setSortData([...stateData].reverse());
        }
      } else if (sortByCategory === "Confirmed") {
        if (sortByNumber === "Ascending") {
          setSortData(confirmed);
        } else {
          setSortData([...confirmed].reverse());
        }
      } else if (sortByCategory === "Affected") {
        if (sortByNumber === "Ascending") {
          setSortData(affected);
        } else {
          setSortData([...affected].reverse());
        }
      } else if (sortByCategory === "Vaccinated") {
        if (sortByNumber === "Ascending") {
          setSortData(vaccinated);
        } else {
          setSortData([...vaccinated].reverse());
        }
      }
      setLoading(false);
    }
  }, [stateData, stateDate, sortByCategory, sortByNumber]);
  // useEffect(() => {
  //   let confirmedArr;
  //   if (stateData !== undefined) {
  //     confirmedArr = [...stateData].sort((a, b) => {
  //       if (a.data.total.confirmed < b.data.total.confirmed) {
  //         return -1;
  //       } else if (a.data.total.confirmed > b.data.total.confirmed) {
  //         return 1;
  //       } else {
  //         return 0;
  //       }
  //     });
  //     setConfirmed(confirmedArr);
  //   }
  // }, [stateData]);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <FilterBar name="states" />
                  <StateCard data={searchState ? searchState : sortData} />
                </>
              }
            />
            <Route
              path="/:state"
              element={
                <>
                  <FilterBar name="" />
                  <DetailedPage date={stateDate} data={stateData} />
                </>
              }
            />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
