import React from "react";
import { getDateString, CATEGORIES } from "./js/popup-config.js";
import "./css/Option.css";

const todayString = getDateString();

const Option = ({ fragIndex, categories }) => {
  const categoryName = CATEGORIES[categories[fragIndex].name].name;
  const domains = Object.values(categories[fragIndex].domains);
  let todayDomains = domains
    .filter((domain) => domain.days.hasOwnProperty(todayString))
    .sort(compareDomains);
  let domain3 = todayDomains
    .slice(0, 3)
    .map((domain) => (
      <div className="domain-text">{`${domain.name}.seconds :${domain.days[todayString].seconds}`}</div>
    ));
  console.log("domain3:", domain3);

  return (
    <div>
      <div className="category-title">{categoryName}</div>
      {domain3}
    </div>
  );
};

function compareDomains(d1, d2) {
  if (d1.days[todayString].seconds < d2.days[todayString].seconds) return 1;
  else if (d1.days[todayString].seconds == d2.days[todayString].seconds)
    return 0;
  else return -1;
}

export default Option;
