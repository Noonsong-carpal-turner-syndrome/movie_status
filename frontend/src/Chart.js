import React, { useState } from "react";
import ChartFragment from "./ChartFragment";
import "./css/Chart.css";
import { CATEGORIES, GRAPH_SIZE } from "./js/popup-config.js";

const Chart = ({ data, optionOnHandler, optionOutHandler }) => {
  const [pctString, setPctString] = useState("");
  const categories = data.categories;
  let graphSize = GRAPH_SIZE,
    graphConfig = { graphSize: graphSize, graphGap: 0.4 },
    othersObj = {
      name: "others",
      percentage: 0,
      color: "#d4d4d4",
      startPercentage: 0,
    },
    noDataObj = {
      name: "noData",
      percentage: 0,
      color: "black",
      startPercentage: 0,
    };
  let fragments = [],
    includedList = [],
    others = [];
  if (categories.length === 0) {
    fragments = (
      <ChartFragment id={"noData"} category={noDataObj} data={graphConfig} />
    );
  } else {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].isIncluded) includedList.push(categories[i]);
      else {
        others.push(categories[i]);
      }
    }
    fragments = includedList.map((category, index) => (
      <ChartFragment
        id={index}
        category={category}
        data={graphConfig}
        onMouseOver={(percentage) => {
          setPctString(percentage);
          optionOnHandler(index);
        }}
        onMouseOut={() => {
          setPctString("");
          optionOutHandler("");
        }}
      />
    ));
    if (others.length > 0) {
      othersObj.startPercentage = others[0].startPercentage;
      others.forEach((category) => {
        othersObj.percentage += category.percentage;
      });
      fragments.push(
        <ChartFragment id={"others"} category={othersObj} data={graphConfig} />
      );
    }
  }

  return (
    <svg
      xmlns={"http://www.example.com/webtime-tracker"}
      class={"doughnut"}
      width={graphSize}
      height={graphSize}
      viewBox={`0 0 ${graphSize} ${graphSize}`}
      shapeRendering={"geometricPrecision"}
    >
      {fragments}
      <circle
        cx={graphSize / 2}
        cy={graphSize / 2}
        r={(graphSize / 2) * 0.6}
        fill={"white"}
      ></circle>
      {pctString && (
        <foreignObject x={62} y={97} width={128} height={96}>
          <div>
            <div class="percentText">{pctString}</div>
          </div>
        </foreignObject>
      )}
    </svg>
  );
};

export default Chart;
