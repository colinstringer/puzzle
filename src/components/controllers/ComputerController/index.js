import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { selectGlobalGameState } from "../../../store/appState/selectors";
import ComputerView from "../../views/ComputerView";

function ComputerController() {
  const globalGameState = useSelector(selectGlobalGameState);

  // computerGameStates in chronological order: start, shuffle, playing, complete, finished
  const [computerGameState, setGameState] = useState("start");
  const [amountOfRandomMoves, setAmountOfRandomMoves] = useState(0);
  const [instructions, setInstructions] = useState([]);
  const [phase, setPhase] = useState("0");
  const [picArray, setPicArray] = useState([]);

  // In this puzzle there is a static grid, which I represent with the picArray.
  // For instance, the element inside picArray[0] is always going to be the picture that is
  // in the upper left at that moment in time. The picture in that slot can change.
  // picArray only knows which picture is in which visual location, but doesn't know the original locations.
  
  // The original location of each picture is stored inside the <img> id value.
  // For instance, pic1 is the first picture, and its id is set to 0.
  // This is all done inside the PlayerView and ComputerView.

  // the 3x3 grid array looks like this if you would visualize it:
  // 0 1 2
  // 3 4 5
  // 6 7 8
  
  const [neighbours, setNeighbours] = useState([
    [1, 3], // slot 0 has the indeces 1 and 3 as neighbours, etc.
    [0, 2, 4],
    [1, 5],
    [0, 4, 6],
    [1, 3, 5, 7],
    [2, 4, 8],
    [3, 7],
    [4, 6, 8],
    [5, 7],
  ]);

  useEffect(() => {
    if (computerGameState === "shuffling") {
      const emptySlotIndex = findIndexFromId(8);
      if (amountOfRandomMoves > 300 && parseInt(emptySlotIndex) === 8) {
        setGameState("playing");
        setAmountOfRandomMoves(0);
        setPhase("1a");
      } else {
        setTimeout(moveRandomSlot, 3);
      }
    }
  }, [amountOfRandomMoves, computerGameState]);

  useEffect(() => {
    // before finished there's an extra complete state to ensure 1 extra render
    // that happens, to make the animation a little smoother
    if (computerGameState === "complete") {
      setGameState("finished");
    }
    if (computerGameState === "finished") {
      alert("The computer wins!!");
      refreshPage();
    }
  }, [computerGameState]);

  useEffect(() => {
    if (phase === "error") {
      setInstructions([]);
      setPhase("0");
      setGameState("start");
    }

    if (computerGameState === "playing")
      if (instructions.length > 0) {
        setTimeout(executeNextInstruction, 800);
      } else {
        switch (phase) {
          case "1a":
            phase1a();
            break;
          case "1b":
            phase1b();
            break;
          case "1c":
            phase1c();
            break;
          case "2a":
            phase2a();
            break;
          case "2b":
            phase2b();
            break;
          case "2c":
            phase2c();
            break;
          case "3a":
            phase3a();
            break;
          case "3b":
            phase3b();
            break;
          case "3c":
            phase3c();
            break;
          case "4a":
            phase4a();
            break;
          case "4b":
            phase4b();
            break;
          case "5a":
            phase5a();
            break;
          case "5b":
            phase5b();
            break;
          case "5c":
            phase5c();
            break;
          case "5d":
            phase5d();
            break;
          case "5e":
            phase5e();
            break;
          case "6":
            phase6();
            break;
        }
      }
  }, [instructions, phase]);

  function shuffle() {
    setGameState("shuffling");
    setAmountOfRandomMoves(0);
    setInstructions([]);
    setPhase(0);
  }

  // phase 1 ends when the upper left pic is in its original slot
  function phase1a() {
    const picUpperLeft = parseInt(findIndexFromId(0));

    if (picUpperLeft === 4) setPhase("1b");
    else if (picUpperLeft === 0) setPhase("2a");
    else setPhase("1c");
  }

  function phase1b() {
    setInstructions(["left", "up", "right", "down"]);
    setPhase("1c");
  }

  function phase1c() {
    const picUpperLeft = parseInt(findIndexFromId(0));

    if (picUpperLeft === 0) {
      setPhase("2a");
    } else
      setInstructions([
        "left",
        "left",
        "up",
        "up",
        "right",
        "right",
        "down",
        "down",
      ]);
  }

  // phase 2 ends when the upper center pic is in the bottom left corner
  function phase2a() {
    const picUpperCenter = parseInt(findIndexFromId(1));
    const picUpperRight = parseInt(findIndexFromId(2));
    if (picUpperCenter === 1 && picUpperRight === 2) {
      setPhase("4a");
    } else if (picUpperCenter === 1 || picUpperCenter === 2) {
      setPhase("2b");
    } else {
      setPhase("2c");
    }
  }

  function phase2b() {
    const picUpperCenter = parseInt(findIndexFromId(1));
    if (picUpperCenter === 1 || picUpperCenter === 2) {
      setInstructions(["up", "up", "left", "down", "down", "right"]);
    } else {
      setPhase("2c");
    }
  }

  function phase2c() {
    const picUpperCenter = parseInt(findIndexFromId(1));
    if (picUpperCenter === 6) {
      setPhase("3a");
    } else {
      setInstructions(["left", "left", "up", "right", "right", "down"]);
    }
  }

  // phase 3 ends when the upper right pic is in slot 1
  function phase3a() {
    const picUpperRight = parseInt(findIndexFromId(2));
    const picUpperCenter = parseInt(findIndexFromId(1));
    if (picUpperRight === 1) {
      if (picUpperCenter === 4) {
        setPhase("4b");
      } else {
        setPhase("4a");
      }
    } else if (picUpperRight === 3) {
      setInstructions(["up", "left", "left", "down", "right", "right"]);
      setPhase("3b");
    } else {
      setPhase("3c");
    }
  }

  function phase3b() {
    setInstructions(["up", "left", "left", "down", "right", "right"]);
    setPhase("3c");
  }

  function phase3c() {
    const picUpperRight = parseInt(findIndexFromId(2));
    if (picUpperRight === 1) {
      setPhase("4a");
    } else {
      setInstructions(["up", "up", "left", "down", "down", "right"]);
    }
  }

  // phase 4 ends when the 3 upper layer pics are in their original slots
  function phase4a() {
    const picUpperCenter = parseInt(findIndexFromId(1));
    if (picUpperCenter === 4) {
      setPhase("4b");
    } else {
      setInstructions(["up", "left", "left", "down", "right", "right"]);
    }
  }

  function phase4b() {
    setInstructions(["up", "up", "left", "down", "down", "right"]);
    setPhase("5a");
  }

  // phase 5 ends when the 3 left pics are in their original slots
  function phase5a() {
    const picLeftCenter = parseInt(findIndexFromId(3));
    const picLowerLeft = parseInt(findIndexFromId(6));
    if (picLeftCenter === 3 && picLowerLeft === 6) {
      setPhase("6");
    } else {
      setInstructions(["left"]);
      setPhase("5b");
    }
  }

  function phase5b() {
    const picLeftCenter = parseInt(findIndexFromId(3));
    const picLowerLeft = parseInt(findIndexFromId(6));
    if (picLeftCenter === 8) {
      if (picLowerLeft === 5) {
        setPhase("5e");
      } else {
        setPhase("5c");
      }
    } else {
      setInstructions(["left", "up", "right", "right", "down", "left"]);
    }
  }

  function phase5c() {
    const picLowerLeft = parseInt(findIndexFromId(6));
    if (picLowerLeft === 3) {
      setPhase("5d");
    } else {
      setInstructions(["left", "up", "right", "down"]);
    }
  }

  function phase5d() {
    const picLeftCenter = parseInt(findIndexFromId(3));
    if (picLeftCenter === 4) {
      setPhase("5e");
    } else {
      setInstructions(["up", "right", "down", "left"]);
    }
  }

  function phase5e() {
    const picLowerLeft = parseInt(findIndexFromId(6));
    if (picLowerLeft === 6) {
      setInstructions(["right"]);
      setPhase("6");
    } else {
      setInstructions(["left", "up", "right", "right", "down", "left"]);
    }
  }

  function phase6() {
    const picCenter = parseInt(findIndexFromId(4));
    const picRightCenter = parseInt(findIndexFromId(5));
    const picLowerCenter = parseInt(findIndexFromId(7));

    if (picCenter === 4 && picRightCenter === 5 && picLowerCenter === 7) {
      setGameState("complete");
    }
    setInstructions(["up", "left", "down", "right"]);
  }

  function executeNextInstruction() {
    let array = [...instructions];

    switch (array[0]) {
      case "up":
        moveUp();
        break;
      case "right":
        moveRight();
        break;
      case "down":
        moveDown();
        break;
      case "left":
        moveLeft();
        break;
    }

    array.shift();
    setInstructions(array);
  }

  function moveUp() {
    const emptySlotIndex = parseInt(findIndexFromId(8));

    if (emptySlotIndex >= 0 && emptySlotIndex <= 2) {
      alert("algorithm mistake at phase " + phase);
      console.log("algorithm mistake at phase ", phase);
      setPhase("error");
      return null;
    }

    swapElementsByIndex(emptySlotIndex, emptySlotIndex - 3);
  }

  function moveRight() {
    const emptySlotIndex = parseInt(findIndexFromId(8));

    if (emptySlotIndex === 2 || emptySlotIndex === 5 || emptySlotIndex === 8) {
      alert("algorithm mistake at phase " + phase);
      console.log("algorithm mistake at phase ", phase);
      setPhase("error");
      return null;
    }

    swapElementsByIndex(emptySlotIndex, emptySlotIndex + 1);
  }

  function moveDown() {
    const emptySlotIndex = parseInt(findIndexFromId(8));

    if (emptySlotIndex >= 6 && emptySlotIndex <= 8) {
      alert("algorithm mistake at phase " + phase);
      console.log("algorithm mistake at phase ", phase);
      setPhase("error");
      return null;
    }

    swapElementsByIndex(emptySlotIndex, emptySlotIndex + 3);
  }

  function moveLeft() {
    const emptySlotIndex = parseInt(findIndexFromId(8));

    if (emptySlotIndex === 0 || emptySlotIndex === 3 || emptySlotIndex === 6) {
      alert("algorithm mistake at phase " + phase);
      console.log("algorithm mistake at phase ", phase);
      setPhase("error");
      return null;
    }

    swapElementsByIndex(emptySlotIndex, emptySlotIndex - 1);
  }

  function moveRandomSlot() {
    const emptySlotIndex = findIndexFromId(8);
    const amountOfNeighbours = neighbours[emptySlotIndex].length;
    const randomIndex = Math.floor(Math.random() * amountOfNeighbours);
    const randomNeighbour = neighbours[emptySlotIndex][randomIndex];

    swapElementsByIndex(emptySlotIndex, randomNeighbour);
    setAmountOfRandomMoves(amountOfRandomMoves + 1);
  }

  function swapElementsByIndex(index1, index2) {
    let array = [...picArray];
    const temp = array[index2];
    array[index2] = array[index1];
    array[index1] = temp;

    setPicArray(array);
  }

  function findIndexFromId(id) {
    let index;
    picArray.map((pic, i) => {
      if (parseInt(pic.props.id) === id) {
        return (index = i);
      }
      return null;
    });

    return index;
  }

  if (globalGameState === "play-computer" && computerGameState === "start") {
    shuffle();
  }

  function refreshPage() {
    window.location.reload(false);
  }

  return <ComputerView picArray={picArray} setPicArray={setPicArray} />;
}

export default ComputerController;
