import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "./Context/DataContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilterBar from "./Components/FilterBar/FilterBar";
import Header from "./Components/Header/Header";
import StateCard from "./Components/StateCard/StateCard";
import DetailedPage from "./Components/DetailedPage/DetailedPage";
import Spinner from "./Components/Spinner/Spinner";
import "./App.css";

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

  const [loading, setLoading] = useState(true);
  const [sortData, setSortData] = useState();
  const [confirmed, setConfirmed] = useState();
  const [affected, setAffected] = useState();
  const [vaccinated, setVaccinated] = useState();

  useEffect(() => {
    if (stateData === undefined || stateDate === undefined) {
      setLoading(true);
    }
    if (stateData !== undefined && stateDate !== undefined) {
      //
      let confirmedArr = [...stateData].sort((a, b) => {
        return a.data.total.confirmed - b.data.total.confirmed;
      });
      let affectedArr = [...stateData].sort((a, b) => {
        return a.affectedPercentage - b.affectedPercentage;
      });
      let vaccinatedArr = [...stateData].sort((a, b) => {
        return a.vaccinatedPercentage - b.vaccinatedPercentage;
      });
      //
      setConfirmed(confirmedArr);
      setAffected(affectedArr);
      setVaccinated(vaccinatedArr);
      //
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
