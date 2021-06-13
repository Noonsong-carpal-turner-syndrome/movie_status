import React from "react";
import { CATEGORIES, getTimeString, isEmpty } from "./js/popup-config";
import "./css/OptionWeekTotal.css";

const OptionWeekTotal = ({ barChartData }) => {
  let weekTotalCategorySec = {};
  let weekTotalCategoryArray = [];
  let dates = [];
  let startDate, endDate;
  let category3;
  if (!isEmpty(barChartData)) {
    dates = Object.keys(barChartData.barData);
    startDate = dates[dates.length - 1];
    endDate = dates[0];
    for (let date in barChartData.barData) {
      let todayData = barChartData.barData[date];
      for (let category in todayData.categories) {
        weekTotalCategorySec[category] = weekTotalCategorySec[category]
          ? weekTotalCategorySec[category]
          : 0;
        weekTotalCategorySec[category] +=
          todayData.categories[category].todaySeconds;
      }
    }
    for (let category in weekTotalCategorySec) {
      let obj = {};
      obj.name = category;
      obj.totalSeconds = weekTotalCategorySec[category];
      weekTotalCategoryArray.push(obj);
    }
    weekTotalCategoryArray.sort(compare);
    //console.log("weekTotalCategoryArray:", weekTotalCategoryArray);
    category3 = weekTotalCategoryArray.slice(0, 3).map((item) => (
      <div className="category-item">
        <div className="category-name">{CATEGORIES[item.name].name}</div>
        <div className="category-time">{getTimeString(item.totalSeconds)}</div>
      </div>
    ));
  }

  return (
    isEmpty(barChartData) || (
      <div className="category-container">
        <div className="category-title">
          <div className="top3">Top 3</div>
          <div className="category-date">{`${startDate} ~ ${endDate}`}</div>
        </div>
        <div className="category-items">{category3}</div>
      </div>
    )
  );
};

export default OptionWeekTotal;

function compare(o1, o2) {
  return o2.totalSeconds - o1.totalSeconds;
}
