import "./style.css";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setGlobalGameState } from "../../store/appState/actions";
import { selectGlobalGameState } from "../../store/appState/selectors";

import Logo from "../../images/4x4/Logo_4x4.png";
import Logo_a1 from "../../images/4x4/Logo_a1_4x4.png";
import Logo_a2 from "../../images/4x4/Logo_a2_4x4.png";
import Logo_a3 from "../../images/4x4/Logo_a3_4x4.png";
import Logo_a4 from "../../images/4x4/Logo_a4_4x4.png";
import Logo_b1 from "../../images/4x4/Logo_b1_4x4.png";
import Logo_b2 from "../../images/4x4/Logo_b2_4x4.png";
import Logo_b3 from "../../images/4x4/Logo_b3_4x4.png";
import Logo_b4 from "../../images/4x4/Logo_b4_4x4.png";
import Logo_c1 from "../../images/4x4/Logo_c1_4x4.png";
import Logo_c2 from "../../images/4x4/Logo_c2_4x4.png";
import Logo_c3 from "../../images/4x4/Logo_c3_4x4.png";
import Logo_c4 from "../../images/4x4/Logo_c4_4x4.png";
import Logo_d1 from "../../images/4x4/Logo_d1_4x4.png";
import Logo_d2 from "../../images/4x4/Logo_d2_4x4.png";
import Logo_d3 from "../../images/4x4/Logo_d3_4x4.png";

function Grid() {
  const dispatch = useDispatch();

  const [buttonVisibility, setButtonVisibility] = useState("visible");
  const [gameState, setGameState] = useState("start");
  const [amountOfRandomMoves, setAmountOfRandomMoves] = useState(0);

  const globalGameState = useSelector(selectGlobalGameState);

  const buttonStyle = {
    visibility: buttonVisibility,
  };

  const pic1 = <img src={Logo_a1} id="0" width="112px" alt="pic1" />;
  const pic2 = <img src={Logo_a2} id="1" width="112px" alt="pic2" />;
  const pic3 = <img src={Logo_a3} id="2" width="112px" alt="pic3" />;
  const pic4 = <img src={Logo_a4} id="3" width="112px" alt="pic4" />;
  const pic5 = <img src={Logo_b1} id="4" width="112px" alt="pic5" />;
  const pic6 = <img src={Logo_b2} id="5" width="112px" alt="pic6" />;
  const pic7 = <img src={Logo_b3} id="6" width="112px" alt="pic7" />;
  const pic8 = <img src={Logo_b4} id="7" width="112px" alt="pic8" />;
  const pic9 = <img src={Logo_c1} id="8" width="112px" alt="pic8" />;
  const pic10 = <img src={Logo_c2} id="9" width="112px" alt="pic8" />;
  const pic11 = <img src={Logo_c3} id="10" width="112px" alt="pic8" />;
  const pic12 = <img src={Logo_c4} id="11" width="112px" alt="pic8" />;
  const pic13 = <img src={Logo_d1} id="12" width="112px" alt="pic8" />;
  const pic14 = <img src={Logo_d2} id="13" width="112px" alt="pic8" />;
  const pic15 = <img src={Logo_d3} id="14" width="112px" alt="pic8" />;
  const emptySlot = (
    <img
      src={Logo}
      id="15"
      width="112px"
      alt="empty"
      style={{ opacity: "0", cursor: "default" }}
    />
  );

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

  const [picArray, setPicArray] = useState([
    pic1,
    pic2,
    pic3,
    pic4,
    pic5,
    pic6,
    pic7,
    pic8,
    pic9,
    pic10,
    pic11,
    pic12,
    pic13,
    pic14,
    pic15,
    emptySlot,
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
    return neighbours[clickedSlotIndex].includes(emptySlotIndex);
  }

  function playPractice() {
    dispatch(setGlobalGameState("play-practice"));
    startGame();
  }

  function playComputer() {
    dispatch(setGlobalGameState("play-computer"));
    startGame();
  }

  function playTime() {
    dispatch(setGlobalGameState("play-time"));
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
    <div className="player">
      <div className="buttons">
        <button style={buttonStyle} onClick={playPractice}>
          Practice
        </button>
        <button style={buttonStyle} onClick={playComputer}>
          Play vs computer
        </button>
        {/* <button style={buttonStyle} onClick={playTime}>
          Play vs time
        </button> */}
      </div>
      <div className="player-game">
        <h2>Player</h2>
        <div className="player-grid">
          <div className="a1" onClick={handleClick}>
            {picArray[0]}
          </div>
          <div className="a2" onClick={handleClick}>
            {picArray[1]}
          </div>
          <div className="a3" onClick={handleClick}>
            {picArray[2]}
          </div>
          <div className="a4" onClick={handleClick}>
            {picArray[3]}
          </div>
          <div className="b1" onClick={handleClick}>
            {picArray[4]}
          </div>
          <div className="b2" onClick={handleClick}>
            {picArray[5]}
          </div>
          <div className="b3" onClick={handleClick}>
            {picArray[6]}
          </div>
          <div className="b4" onClick={handleClick}>
            {picArray[7]}
          </div>
          <div className="c1" onClick={handleClick}>
            {picArray[8]}
          </div>
          <div className="c2" onClick={handleClick}>
            {picArray[9]}
          </div>
          <div className="c3" onClick={handleClick}>
            {picArray[10]}
          </div>
          <div className="c4" onClick={handleClick}>
            {picArray[11]}
          </div>
          <div className="d1" onClick={handleClick}>
            {picArray[12]}
          </div>
          <div className="d2" onClick={handleClick}>
            {picArray[13]}
          </div>
          <div className="d3" onClick={handleClick}>
            {picArray[14]}
          </div>
          <div className="d4" onClick={handleClick}>
            {picArray[15]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grid;
