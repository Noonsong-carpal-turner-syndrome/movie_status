import React from "react";
import { CATEGORIES, getTimeString } from "./js/popup-config.js";
import "./css/OptionCategory.css";

export default function OptionCategory({ categories }) {
  let category3 = categories.slice(0, 3);
  category3 = category3.map((category) => (
    <div className="category-item">
      <div className="category-name">{CATEGORIES[category.name].name}</div>
      <div className="category-time">{getTimeString(category.seconds)}</div>
    </div>
  ));
  return (
    <div className="category-container">
      <div className="category-title">
        <div className="top3">Top 3</div>
        <div className="title-category"></div>
      </div>
      <div className="category-items">{category3}</div>
    </div>
  );
}
