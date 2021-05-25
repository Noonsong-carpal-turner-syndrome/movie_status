import React from "react";
import "./css/ChartFragment.css";

const ChartFragment = ({ category, data, onMouseOver, onMouseOut }) => {
  // {
  //   percentageStart: h,//
  //   graphGap: e,
  //   graphSize: u,
  // }
  function mouseOverHandling() {
    onMouseOver(category.percentageStr);
  }
  function mouseOutHandling() {
    onMouseOut();
  }
  const IN_ANGLE = 0,
    OUT_ANGLE = 1;
  let A,
    S = (2 * Math.PI) / 100,
    cx = data.graphSize / 2,
    cy = data.graphSize / 2,
    R = data.graphSize / 2,
    graphGap = 100 === category.percentage ? 0 : data.graphGap,
    start = S * category.startPercentage,
    end = S * (category.startPercentage + category.percentage - graphGap),
    angleDirection = end - start <= Math.PI ? IN_ANGLE : OUT_ANGLE,
    startX = cx + R * Math.sin(start),
    startY = cy - R * Math.cos(start),
    endX = cx + R * Math.sin(end),
    endY = cy - R * Math.cos(end);

  if (category.percentage === 0) {
    return <circle cx={cx} cy={cy} r={R} fill={"#494949"} />;
  } else if (category.percentage === 100) {
    return (
      <circle
        cx={cx}
        cy={cy}
        r={R}
        fill={category.color}
        onMouseOver={mouseOverHandling}
        onMouseOut={mouseOutHandling}
      />
    );
  } else {
    A = `M ${cx},${cy} L ${startX},${startY} A ${R},${R} 0 ${angleDirection} 1 ${endX},${endY} Z`;
    return (
      <path
        id={category.name}
        d={A}
        fill={category.color}
        onMouseOver={mouseOverHandling}
        onMouseOut={mouseOutHandling}
      ></path>
    );
  }
};

export default ChartFragment;
