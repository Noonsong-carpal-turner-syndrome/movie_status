import React from "react";
import Bar from "./Bar";

const BarChart = ({ barChartData, optionOnHandler, optionOutHandler }) => {
  console.log("barChartData in BarChart.js:", barChartData);
  const gap = 9,
    barWidth = 18,
    barWrapWidth = gap * 2 + barWidth,
    svgHeight = 150,
    startY = 50;
  let barData;
  let Bars = [];
  let maxSeconds = 0;
  let k = 6;
  for (let i in barChartData.barData) {
    if (barChartData.barData[i].todayTotalSeconds > maxSeconds)
      maxSeconds = barChartData.barData[i].todayTotalSeconds;
  }
  for (let i in barChartData.barData) {
    let height =
      (barChartData.barData[i].todayTotalSeconds / maxSeconds) * svgHeight;
    //console.log(`${k}번째 height: ${height}`);
    barData = {
      todayTotalSeconds: barChartData.barData[i].todayTotalSeconds,
      x: gap + barWrapWidth * k,
      y: startY + svgHeight - height,
      width: barWidth,
      height: height,
      data: barChartData.barData[i].categories,
    };
    Bars.push(
      <Bar
        barData={barData}
        optionOnHandler={optionOnHandler}
        optionOutHandler={optionOutHandler}
        index={k}
      />
    );
    k--;
  }
  return (
    <svg
      viewBox={`0 0 ${barWrapWidth * 7} 200`}
      width={barWrapWidth * 7}
      height={200}
      xmlns="http://www.w3.org/2000/svg"
    >
      {Bars}
    </svg>
  );
};

export default BarChart;
