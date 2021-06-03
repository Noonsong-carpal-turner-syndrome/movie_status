/*global chrome*/
import React, { useState } from "react";
import "./css/Week.css";
import { Link } from "react-router-dom";
import { getDateString, getTimeString, isEmpty } from "./js/popup-config";
import BarChart from "./BarChart";
import OptionWeek from "./OptionWeek";
import OptionWeekTotal from "./OptionWeekTotal";
const Week = () => {
  let date = new Date();
  let yyyy = date.getFullYear();
  let mm = date.getMonth();
  let dd = date.getDate();
  const [barIndex, setBarIndex] = useState(-1);
  const [barChartData, setBarChartData] = useState({});
  function ping() {
    chrome.runtime.sendMessage(
      { request: "BAR_CHART_DATA" },
      function (response) {
        if (chrome.runtime.lastError) {
          //console.log("error ping in request BAR_CHART_DATA");
          setTimeout(ping, 1000);
        } else {
          setBarChartData(response.msg);
          //console.log("barChartData in Week.js: ", barChartData);
        }
      }
    );
  }
  isEmpty(barChartData) && ping();

  return (
    <div className="Week">
      <header className="Week-header">
        <div className="date">{`${yyyy}년 ${mm + 1}월 ${dd}일`}</div>
        <div className="settingIcon">
          <Link to="/Setting" className="setting-button">
            설정
          </Link>
        </div>
      </header>
      <main className="Main">
        <div className="main-header">
          <Link to="/" className="day-week-button">
            Week
          </Link>
          <div className="accumulate-time">
            {getTimeString(barChartData.weekTotalSeconds)}
          </div>
        </div>
        <div className="bar-wrapper">
          <BarChart
            barChartData={barChartData}
            optionOnHandler={(index) => {
              setBarIndex(index);
            }}
            optionOutHandler={() => {
              setBarIndex(-1);
            }}
          />
        </div>
      </main>
      <div className="option-wrapper">
        {barIndex > -1 ? (
          <OptionWeek
            barData={barChartData.barData[getDateString(6 - barIndex)]}
            date={getDateString(6 - barIndex)}
          />
        ) : (
          <OptionWeekTotal barChartData={barChartData} />
        )}
      </div>
    </div>
  );
};

export default Week;
