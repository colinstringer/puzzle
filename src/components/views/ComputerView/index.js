import "./style.css";
import React, { useEffect } from "react";

import Logo from "../../../images/3x3/Logo_3x3.png";
import Logo_a1 from "../../../images/3x3/Logo_a1_3x3.png";
import Logo_a2 from "../../../images/3x3/Logo_a2_3x3.png";
import Logo_a3 from "../../../images/3x3/Logo_a3_3x3.png";
import Logo_b1 from "../../../images/3x3/Logo_b1_3x3.png";
import Logo_b2 from "../../../images/3x3/Logo_b2_3x3.png";
import Logo_b3 from "../../../images/3x3/Logo_b3_3x3.png";
import Logo_c1 from "../../../images/3x3/Logo_c1_3x3.png";
import Logo_c2 from "../../../images/3x3/Logo_c2_3x3.png";

function ComputerView({ picArray, setPicArray }) {
  const pic1 = <img src={Logo_a1} id="0" width="150px" alt="pic1" />;
  const pic2 = <img src={Logo_a2} id="1" width="150px" alt="pic2" />;
  const pic3 = <img src={Logo_a3} id="2" width="150px" alt="pic3" />;
  const pic4 = <img src={Logo_b1} id="3" width="150px" alt="pic4" />;
  const pic5 = <img src={Logo_b2} id="4" width="150px" alt="pic5" />;
  const pic6 = <img src={Logo_b3} id="5" width="150px" alt="pic6" />;
  const pic7 = <img src={Logo_c1} id="6" width="150px" alt="pic7" />;
  const pic8 = <img src={Logo_c2} id="7" width="150px" alt="pic8" />;
  const emptySlot = (
    <img src={Logo} id="8" width="150px" alt="empty" style={{ opacity: "0" }} />
  );

  useEffect(() => {
    setPicArray([pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, emptySlot]);
  }, []);

  return (
    <div>
      <h2>Computer</h2>
      <div className="computer-game">
        <div className="a1">{picArray[0]}</div>
        <div className="a2">{picArray[1]}</div>
        <div className="a3">{picArray[2]}</div>
        <div className="b1">{picArray[3]}</div>
        <div className="b2">{picArray[4]}</div>
        <div className="b3">{picArray[5]}</div>
        <div className="c1">{picArray[6]}</div>
        <div className="c2">{picArray[7]}</div>
        <div className="c3">{picArray[8]}</div>
      </div>
    </div>
  );
}

export default ComputerView;
