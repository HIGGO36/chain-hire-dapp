// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import B2BHomePage from './components/B2BHomePage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/b2b-home" component={B2BHomePage} />
        {/* Other routes */}
      </Switch>
    </Router>
  );
};

export default App;
