/*global chrome*/
//import "./css/Home.css";
import "./css/HomeCSS.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Chart from "./Chart";
import Option from "./Option";

function Home({ pieData }) {
  let date = new Date();
  let yyyy = date.getFullYear();
  let mm = date.getMonth();
  let dd = date.getDate();
  const [hoverFrag, setHoverFrag] = useState("");
  const [fragIndex, setFragIndex] = useState(-1);
  console.log("msg from home: ", pieData);
  return (
    <div className="Home">
      <header className="Home-header">
        <div className="date">{`${yyyy}년 ${mm + 1}월 ${dd}일`}</div>
        <div className="settingIcon">
          <Link to="/Setting" className="SettingButton">
            환경설정
          </Link>
        </div>
      </header>
      <main className="Main">
        <div className="Day-cumulative-time">
          <Link to="/Week" className="Day-button">
            일간
          </Link>
          <div className="Cumulative-time">
            {getTimeString(pieData.total.seconds)}
          </div>
        </div>
        <div className="graphWrapper">
          <div id="js-pie">
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
        </div>
      </main>
      <div className="Option">
        {fragIndex >= 0 && hoverFrag && (
          <div>
            <Option
              hoverFrag={hoverFrag}
              fragIndex={fragIndex}
              categories={pieData.categories}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function getTimeString(second) {
  let tempSec = second;
  const hour = Math.floor(tempSec / (60 * 60));
  tempSec = tempSec - hour * 60 * 60;
  let min = Math.floor(tempSec / 60);
  let hourString = "";
  let minString = "";
  if (hour) {
    hour = hour < 10 ? "0" + hour : hour;
    hourString = `${hour}시간 `;
  }
  min = min < 10 ? "0" + min : min;
  minString = `${min}분`;
  return `${hourString}${minString}`;
}

export default Home;
