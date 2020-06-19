import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setGlobalGameState } from "../../../store/appState/actions";
import { selectGlobalGameState } from "../../../store/appState/selectors";
import PlayerView from "../../views/PlayerView";

function PlayerController() {
  const dispatch = useDispatch();

  const [buttonVisibility, setButtonVisibility] = useState("visible");
  const [gameState, setGameState] = useState("start");
  const [amountOfRandomMoves, setAmountOfRandomMoves] = useState(0);
  const [picArray, setPicArray] = useState([]);

  const globalGameState = useSelector(selectGlobalGameState);

  const [neighbours, setNeighbours] = useState([
    [1, 4], // index 0 has the indeces 1 and 4 as neighbours in a 4x4 grid
    [0, 2, 5],
    [1, 3, 6],
    [2, 7],
    [0, 5, 8],
    [1, 4, 6, 9],
    [2, 5, 7, 10],
    [3, 6, 11],
    [4, 9, 12],
    [5, 8, 10, 13],
    [6, 9, 11, 14],
    [7, 10, 15],
    [8, 13],
    [9, 12, 14],
    [10, 13, 15],
    [11, 14],
  ]);

  useEffect(() => {
    if (gameState === "shuffling") {
      const emptySlotIndex = findIndexFromId(15);
      if (amountOfRandomMoves > 250 && parseInt(emptySlotIndex) === 15) {
        setGameState("playing");
        setAmountOfRandomMoves(0);
      } else {
        setTimeout(moveRandomSlot, 3);
      }
    }
  }, [amountOfRandomMoves, gameState]);

  useEffect(() => {
    if (
      picArray.length === 16 &&
      amountOfRandomMoves <= 0 &&
      gameState === "playing"
    ) {
      if (gameIsComplete()) {
        if (globalGameState === "play-computer") {
          alert("Congratulations!! You win!");
        }
        refreshPage();
      }
    }
  }, [picArray, amountOfRandomMoves]);

  function handleClick(event) {
    if (gameState === "playing") {
      if (event.target.id !== 15) {
        const clickedSlotIndex = findIndexFromId(parseInt(event.target.id));
        const emptySlotIndex = findIndexFromId(15);

        if (
          areNeighbours(parseInt(clickedSlotIndex), parseInt(emptySlotIndex))
        ) {
          swapElementsByIndex(
            parseInt(clickedSlotIndex),
            parseInt(emptySlotIndex)
          );
        }
      }
    }
  }

  function gameIsComplete() {
    let correctSlots = 0;
    for (let i = 0; i < 16; i++) {
      if (parseInt(picArray[i].props.id) === i) {
        correctSlots++;
      }
    }
    if (correctSlots === 16) return true;

    return false;
  }

  function moveRandomSlot() {
    const emptySlotIndex = findIndexFromId(15);
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

  function areNeighbours(clickedSlotIndex, emptySlotIndex) {
    if (neighbours[clickedSlotIndex] !== undefined) {
      return neighbours[clickedSlotIndex].includes(emptySlotIndex);
    }
  }

  function playPractice() {
    dispatch(setGlobalGameState("play-practice"));
    startGame();
  }

  function playComputer() {
    dispatch(setGlobalGameState("play-computer"));
    startGame();
  }

  function startGame() {
    setButtonVisibility("hidden");
    setAmountOfRandomMoves(0);
    setGameState("shuffling");
  }

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <PlayerView
      picArray={picArray}
      setPicArray={setPicArray}
      handleClick={handleClick}
      buttonVisibility={buttonVisibility}
      playPractice={playPractice}
      playComputer={playComputer}
    />
  );
}

export default PlayerController;
