import React from "react";
import Home from "./Home";
import Setting from "./Setting";
import Week from "./Week";
import { Route } from "react-router-dom";

function App({ pieData }) {
  return (
    <div>
      <Route path="/" exact render={() => <Home pieData={pieData} />} />
      <Route path="/Setting" component={Setting} />
      <Route path="/Week" component={Week} />
    </div>
  );
}

export default App;
