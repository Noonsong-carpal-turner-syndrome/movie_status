import React from 'react';
import Home from './Home';
import Setting from './Setting';
import Week from './Week';
import {Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <Route path = "/" exact component= {Home}/>
      <Route path = "/Setting" component={Setting}/>
      <Route path = "/Week" component={Week}/>
    </div>
  );
}

export default App;
