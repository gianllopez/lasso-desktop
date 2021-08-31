import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Home, Package } from './pages';
import { NavBar } from './shared/components';
import './index.scss';

const { shell } = window.require('electron@remote');

function App() {

  const toPortfolio = () => {
    shell.openExternal('gianlop3z-dev.web.app');
  };

  return (
    <HashRouter>
      <Provider store={store}>
        <NavBar/>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/package" component={Package} exact/>
        </Switch>
      </Provider>
      <p id="my-creds" onClick={toPortfolio}>by @gianlop3z</p>
    </HashRouter>
  );

};

ReactDOM.render(<App/>, document.getElementById('root'));