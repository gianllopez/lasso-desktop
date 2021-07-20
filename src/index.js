import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { NavBar } from './shared/components/NavBar';
import { Home } from './pages/Home';
import { Package } from './pages/Package';
import { Queue } from './pages/Queue';
import './index.scss';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/package" component={Package} exact/>
        <Route path="/queue" component={Queue} exact/>
      </Switch>
      <p id="my-creds">by @gianlop3z</p>
    </BrowserRouter>
  );
};

ReactDOM.render(<App/>, document.getElementById('root'));