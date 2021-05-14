/*global chrome*/
//import "./css/Home.css";
import "./css/HomeCSS.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Chart from "./Chart";
import Option from "./Option";
import { getTimeString } from "./js/popup-config.js";
import OptionCategory from "./OptionCatetory";

function Home({ pieData }) {
  let date = new Date();
  let yyyy = date.getFullYear();
  let mm = date.getMonth();
  let dd = date.getDate();
  const [hoverFrag, setHoverFrag] = useState(""); //지워도 될듯?
  const [fragIndex, setFragIndex] = useState(-1);
  console.log("msg from home: ", pieData);
  return (
    <div className="Home">
      <header className="Home-header">
        <div className="date">{`${yyyy}년 ${mm + 1}월 ${dd}일`}</div>
        <div className="settingIcon">
          <Link to="/Setting" className="setting-button">
            환경설정
          </Link>
        </div>
      </header>
      <main className="Main">
        <div className="main-header">
          <Link to="/Week" className="day-week-button">
            Today
          </Link>
          <div className="accumulate-time">
            {getTimeString(pieData.total.seconds)}
          </div>
        </div>
        <div className="pie-wrapper">
          <Chart
            data={pieData}
            optionOnHandler={(name, index) => {
              setHoverFrag(name);
              setFragIndex(index);
            }}
            optionOutHandler={() => {
              setHoverFrag("");
              setFragIndex(-1);
            }}
          ></Chart>
        </div>
      </main>
      <div className="option-wrapper">
        {fragIndex >= 0 ? (
          <Option fragIndex={fragIndex} categories={pieData.categories} />
        ) : (
          <OptionCategory categories={pieData.categories} />
        )}
      </div>
    </div>
  );
}

export default Home;
