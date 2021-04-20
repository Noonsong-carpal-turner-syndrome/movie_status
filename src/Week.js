import React from 'react';
import './css/Week.css';
import {Link} from 'react-router-dom';

const Week = () => {
    let date=new Date();
  let yyyy=date.getFullYear();
  let mm=date.getMonth();
  let dd=date.getDay();
    return (
        <div className="Week">
      <header className="Week-header">
        <div className="date">
          {`${yyyy}년 ${mm+1}월 ${dd+1}일`}
        </div>
        <div className="settingIcon">
          <Link to="/Setting" className="SettingButton">
              환경설정</Link>
        </div>
      </header>
      <main className="Main">
        <div className="Day-cumulative-time">
          <Link to="/"className="Day-button">
            주간
          </Link>
          <div className="Cumulative-time">
            누적시간
          </div>
        </div>
        <div>그래프</div>
      </main>
      <div className="Option">
        option
      </div>
    </div>
    )
}

export default Week;