import "./App.css";
import React from "react";
import PlayerController from './components/controllers/PlayerController';
import ComputerController from './components/controllers/ComputerController';

function App() {
  return (
    <div className="App">
      <div className="player-console">
        <PlayerController />
      </div>
      <div className="computer-console">
        <ComputerController />
      </div>
    </div>
  );
}

export default App;
