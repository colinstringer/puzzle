import "./style.css";
import React, { useState, useEffect } from "react";

import Logo from "../../images/Logo.png";
import Logo_a1 from "../../images/Logo_a1.png";
import Logo_a2 from "../../images/Logo_a2.png";
import Logo_a3 from "../../images/Logo_a3.png";
import Logo_b1 from "../../images/Logo_b1.png";
import Logo_b2 from "../../images/Logo_b2.png";
import Logo_b3 from "../../images/Logo_b3.png";
import Logo_c1 from "../../images/Logo_c1.png";
import Logo_c2 from "../../images/Logo_c2.png";

function Grid() {
  const [gameState, setGameState] = useState("start");
  const [amountOfRandomMoves, setAmountOfRandomMoves] = useState(0);

  const pic1 = <img src={Logo_a1} id="0" width="200px" alt="pic1" />;
  const pic2 = <img src={Logo_a2} id="1" width="200px" alt="pic2" />;
  const pic3 = <img src={Logo_a3} id="2" width="200px" alt="pic3" />;
  const pic4 = <img src={Logo_b1} id="3" width="200px" alt="pic4" />;
  const pic5 = <img src={Logo_b2} id="4" width="200px" alt="pic5" />;
  const pic6 = <img src={Logo_b3} id="5" width="200px" alt="pic6" />;
  const pic7 = <img src={Logo_c1} id="6" width="200px" alt="pic7" />;
  const pic8 = <img src={Logo_c2} id="7" width="200px" alt="pic8" />;
  const emptySlot = (
    <img
      src={Logo}
      id="8"
      width="200px"
      alt="empty"
      style={{ opacity: "0", cursor: "default" }}
    />
  );

  const [neighbours, setNeighbours] = useState([
    [1, 3], // index 0 has the indeces 1 and 3 as neighbours in a 3x3 grid
    [0, 2, 4],
    [1, 5],
    [0, 4, 6],
    [1, 3, 5, 7],
    [2, 4, 8],
    [3, 7],
    [4, 6, 8],
    [5, 7],
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
    emptySlot,
  ]);

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

  function moveRandomSlot() {
    const emptySlotIndex = findIndexFromId(8);
    const amountOfNeighbours = neighbours[emptySlotIndex].length;
    const randomIndex = Math.floor(Math.random() * amountOfNeighbours);
    const randomNeighbour = neighbours[emptySlotIndex][randomIndex];

    swapElementsByIndex(emptySlotIndex, randomNeighbour);
    setAmountOfRandomMoves(amountOfRandomMoves + 1);
  }

  function gameIsComplete() {
    let correctSlots = 0;
    for (let i = 0; i < 9; i++) {
      if (parseInt(picArray[i].props.id) === i) {
        correctSlots++;
      }
    }
    if (correctSlots === 9) return true;

    return false;
  }

  function handleClick(event) {
    if (gameState === "playing") {
      if (event.target.id !== 8) {
        const clickedSlotIndex = findIndexFromId(parseInt(event.target.id));
        const emptySlotIndex = findIndexFromId(8);

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

  function shuffle() {
    setAmountOfRandomMoves(0);
    setGameState("shuffling");
  }

  useEffect(() => {
    if (gameState === "shuffling") {
      const emptySlotIndex = findIndexFromId(8);
      if (amountOfRandomMoves > 300 && parseInt(emptySlotIndex) === 8) {
        setGameState("playing");
        setAmountOfRandomMoves(0);
      } else {
        setTimeout(moveRandomSlot, 3);
      }
    }
  }, [amountOfRandomMoves, gameState]);

  useEffect(() => {
    if (
      picArray.length === 9 &&
      amountOfRandomMoves <= 0 &&
      gameState === "playing"
    ) {
      if (gameIsComplete()) {
        setGameState("start");
        alert("Congratulations!! You win!");
      }
    }
  }, [picArray, amountOfRandomMoves]);

  return (
    <div className="player-grid">
      <div className="shuffle">
        <button onClick={shuffle}>Shuffle</button>
      </div>
      <div className="player-game">
        <div className="a1" onClick={handleClick}>
          {picArray[0]}
        </div>
        <div className="a2" onClick={handleClick}>
          {picArray[1]}
        </div>
        <div className="a3" onClick={handleClick}>
          {picArray[2]}
        </div>
        <div className="b1" onClick={handleClick}>
          {picArray[3]}
        </div>
        <div className="b2" onClick={handleClick}>
          {picArray[4]}
        </div>
        <div className="b3" onClick={handleClick}>
          {picArray[5]}
        </div>
        <div className="c1" onClick={handleClick}>
          {picArray[6]}
        </div>
        <div className="c2" onClick={handleClick}>
          {picArray[7]}
        </div>
        <div className="c3" onClick={handleClick}>
          {picArray[8]}
        </div>
      </div>
    </div>
  );
}

export default Grid;
