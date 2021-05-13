import React, { useState } from "react";
import ChartFragment from "./ChartFragment";
import "./css/Chart.css";

const Chart = ({ data, optionOnHandler, optionOutHandler }) => {
  const [hoverFrag, setHoverFrag] = useState("");
  const [pctString, setPctString] = useState("");
  const categories = data.categories;
  let graphSize = 250,
    graphConfig = { graphSize: graphSize, graphGap: 0.4 },
    othersObj = {
      name: "other",
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
      else others.push(categories[i]);
    }
    fragments = includedList.map((category, index) => (
      <ChartFragment
        id={category.name}
        category={category}
        data={graphConfig}
        onMouseOver={(name, percentage) => {
          console.log("ChartFragment mouseover");
          setHoverFrag(name);
          setPctString(percentage);
          optionOnHandler(name, index);
          console.log("hoverFrag:", hoverFrag);
        }}
        onMouseOut={() => {
          setHoverFrag("");
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
    <div>
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
        {hoverFrag && pctString && (
          <foreignObject x={61} y={77} width={128} height={96}>
            <div>
              <div class="percentText">{pctString}</div>
              <div class="fragmentText">{CATEGORIES[hoverFrag].name}</div>
            </div>
          </foreignObject>
        )}
      </svg>
    </div>
  );
};

export default Chart;

const CATEGORIES = {
  entertainment: {
    name: "엔터테인먼트",
  },
  productivity: {
    name: "생산성 및 금융",
  },
  socialMedia: {
    name: "소셜미디어",
  },
  infoAndDocs: {
    name: "정보 및 문서",
  },
  shopping: {
    name: "쇼핑 및 음식",
  },
  education: {
    name: "학습",
  },
  business: {
    name: "사무 및 경력",
  },
  etc: {
    name: "기타",
  },
};
