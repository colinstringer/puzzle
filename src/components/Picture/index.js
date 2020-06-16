import "./style.css";
import React from "react";

function Picture({ image, picId }) {
  return (
    <div>
      <img
        src={image}
        width="200px"
        alt="pic"
        id={picId}
      />
    </div>
  );
}

export default Picture;
