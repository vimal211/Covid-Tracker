import "./App.css";
import React, { Fragment, useContext, useEffect, useState } from "react";
import FilterBar from "./Components/FilterBar/FilterBar";
import Header from "./Components/Header/Header";
import { DataContext } from "./Context/DataContext";
import StateCard from "./Components/StateCard/StateCard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailedPage from "./Components/DetailedPage/DetailedPage";

function App() {
  let [stateData, stateDate] = useContext(DataContext);
  let [loading, setLoading] = useState(true);
  // if (!loading) {
  //   localStorage.setItem("data", JSON.stringify(finalData));
  // }

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
          <h2>Loading...</h2>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <FilterBar name="states" />
                  <StateCard data={stateData} />
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
