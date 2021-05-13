/*global chrome*/
import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import { MemoryRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

function ping() {
  chrome.runtime.sendMessage({ request: "log" }, function (response) {
    if (chrome.runtime.lastError) {
      console.log("error ping");
      setTimeout(ping, 1000);
    } else {
      console.log("well ping");
      const msg = response.msg;
      ReactDOM.render(
        <React.StrictMode>
          <Router>
            <App pieData={msg} />
          </Router>
        </React.StrictMode>,
        document.getElementById("root")
      );
    }
  });
}

ping();
/*
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
