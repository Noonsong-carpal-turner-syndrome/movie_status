import React from "react";
import { getColorOfCategory } from "./js/popup-config";
import "./css/Bar.css";

const Bar = ({ barData, optionOnHandler, optionOutHandler, index }) => {
  let rects = [];
  let sum_y = barData.y;
  let rectHeight = 0;
  let color;
  for (let i in barData.data) {
    //console.log("height:", barData.height);
    color = getColorOfCategory(i);
    rectHeight =
      (barData.data[i].todaySeconds / barData.todayTotalSeconds) *
      barData.height;
    //console.log("barData.todayTotalSeconds:", barData.todayTotalSeconds);
    //console.log(`barData.data[${i}].todaySeconds`,barData.data[i].todaySeconds);
    //console.log("rectHeight:", rectHeight);
    rects.push(
      <rect
        x={barData.x}
        y={sum_y}
        width={barData.width}
        height={rectHeight}
        fill={color}
      />
    );
    sum_y += rectHeight;
  }
  return (
    <g
      onMouseOver={() => {
        optionOnHandler(index);
      }}
      onMouseOut={() => {
        optionOutHandler();
      }}
    >
      {rects}
    </g>
  );
};

export default Bar;

/*
    <rect
      x={barData.x}
      y={barData.y}
      width={barData.width}
      height={barData.height}
    />
      */
