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
  let [stateData, stateDate, searchState, setSearchState] =
    useContext(DataContext);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    if (stateData === undefined || stateDate === undefined) {
      setLoading(true);
    }
    if (stateData !== undefined && stateDate !== undefined) {
      setLoading(false);
    }
  }, [stateData, stateDate]);

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
                  <StateCard data={searchState ? searchState : stateData} />
                </>
              }
            />
            <Route
              path="/:state"
              element={
                <>
                  <FilterBar name="" />
                  <DetailedPage date={stateDate} />
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
