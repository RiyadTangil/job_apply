import React from "react";

const Specifics = ({ points }) => {
  return (
    <div>
      {points.map((point, index) => (
        <p className="text-start" key={index}> . {point}</p>
      ))}
    </div>
  );
};

export default Specifics;
