import React from "react";
import { getDateString, CATEGORIES, getTimeString } from "./js/popup-config.js";
import "./css/Option.css";

const todayString = getDateString();

const Option = ({ fragIndex, categories }) => {
  const category = categories[fragIndex];
  const categoryName = CATEGORIES[category.name].name;
  const totalTimeString = getTimeString(category.seconds);
  const domains = Object.values(categories[fragIndex].domains);
  let todayDomains = domains
    .filter((domain) => domain.days.hasOwnProperty(todayString))
    .sort(compareDomains);
  let domain3 = todayDomains.slice(0, 3).map((domain) => (
    <div className="option-item">
      <div className="option-name">{domain.name}</div>
      <div className="option-time">
        {getTimeString(domain.days[todayString].seconds)}
      </div>
    </div>
  ));

  return (
    <div className="option-container">
      <div className="option-title">
        <div className="top3">Top 3</div>
        <div className="title">{categoryName}</div>
      </div>
      <div className="option-items">
        <div className="option-domains">{domain3}</div>
        <div className="option-total">
          <div className="option-name">총 사용시간 </div>
          <div className="option-time">{totalTimeString}</div>
        </div>
      </div>
    </div>
  );
};

function compareDomains(d1, d2) {
  if (d1.days[todayString].seconds < d2.days[todayString].seconds) return 1;
  else if (d1.days[todayString].seconds === d2.days[todayString].seconds)
    return 0;
  else return -1;
}

export default Option;
