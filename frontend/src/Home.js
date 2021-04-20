/*global chrome*/
import "./css/Home.css";
import { Link } from "react-router-dom";
import React from "react";
import MyResponsivePie from "./js/MyResponsivePie";
const backgroundJS = chrome.extension.getBackgroundPage();

function Home() {
  let date = new Date();
  let yyyy = date.getFullYear();
  let mm = date.getMonth();
  let dd = date.getDay();
  const data = [
    //dummy
    {
      id: "java",
      label: "java",
      value: 178,
      color: "hsl(3, 70%, 50%)",
    },
    {
      id: "make",
      label: "make",
      value: 224,
      color: "hsl(54, 70%, 50%)",
    },
    {
      id: "css",
      label: "css",
      value: 464,
      color: "hsl(129, 70%, 50%)",
    },
    {
      id: "c",
      label: "c",
      value: 319,
      color: "hsl(64, 70%, 50%)",
    },
    {
      id: "python",
      label: "python",
      value: 215,
      color: "hsl(226, 70%, 50%)",
    },
  ];

  return (
    <div className="Home">
      <header className="Home-header">
        <div className="date">{`${yyyy}년 ${mm + 1}월 ${dd + 1}일`}</div>
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
          <div className="Cumulative-time">누적시간</div>
        </div>
        <div className="graphWrapper">
          {/*<MyResponsivePie data={data} />*/}
        </div>
      </main>
      <div className="Option">option</div>
    </div>
  );
}

export default Home;
