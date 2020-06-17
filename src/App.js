import "./App.css";
import React from "react";
import PlayerGrid from "./components/PlayerGrid";
import ComputerGrid from "./components/ComputerGrid";

function App() {
  return (
    <div className="App">
      <div className="player">
        <PlayerGrid />
      </div>
      <div className="computer">
        <ComputerGrid />
      </div>
    </div>
  );
}

export default App;
