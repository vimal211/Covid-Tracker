import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import FilterBar from "./Components/FilterBar/FilterBar";
import Header from "./Components/Header/Header";
import { DataContext } from "./Context/DataContext";
import StateCard from "./Components/StateCard/StateCard";

function App() {
  let [finalData] = useContext(DataContext);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    if (finalData === undefined) {
      setLoading(true);
    }
    if (finalData !== undefined) {
      setLoading(false);
    }
  }, [finalData]);

  return (
    <div className="App">
      {console.log(finalData)}
      <Header />
      <FilterBar />
      {loading ? <h2>Loading...</h2> : <StateCard data={finalData} />}
    </div>
  );
}

export default App;
