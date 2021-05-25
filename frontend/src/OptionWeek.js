import React from "react";
import { CATEGORIES, getTimeString } from "./js/popup-config";
import "./css/OptionWeek.css";

const OptionWeek = ({ barData, date }) => {
  let barDataArray = [];
  for (let i in barData.categories) {
    barData.categories[i].name = i;
    if (barData.categories[i].todaySeconds > 0) {
      barDataArray.push(barData.categories[i]);
    }
  }
  barDataArray = barDataArray.sort(compare).slice(0, 3);
  let dayCategory3 = barDataArray.map((item) => (
    <div className="category-item">
      <div className="category-name">{CATEGORIES[item.name].name}</div>
      <div className="category-time">{getTimeString(item.todaySeconds)}</div>
    </div>
  ));
  return (
    <div className="category-container">
      <div className="category-title">
        <div className="top3">Top 3</div>
        <div className="title-category">{date}</div>
      </div>
      <div className="category-day-items">
        <div className="category-top3">{dayCategory3}</div>
        <div className="category-total">
          <div className="category-name">총 사용시간</div>
          <div className="category-time">
            {getTimeString(barData.todayTotalSeconds)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionWeek;

function compare(a, b) {
  return b.todaySeconds - a.todaySeconds;
}

/*
todayBarData = { // barData
  todayTotalSeconds: 0,
  categories: {
    entertainment: { todaySeconds: 0 },
    productivity: { todaySeconds: 0 },
    socialMedia: { todaySeconds: 0 },
    infoAndDocs: { todaySeconds: 0 },
    shopping: { todaySeconds: 0 },
    education: { todaySeconds: 0 },
    business: { todaySeconds: 0 },
    etc: { todaySeconds: 0 },
  },
}; */
