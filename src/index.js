import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Home, Package } from './pages';
import { NavBar } from './shared/components/NavBar';
import './index.scss';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <NavBar/>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/package" component={Package} exact/>
        </Switch>
      </Provider>
      <p id="my-creds">by @gianlop3z</p>
    </BrowserRouter>
  );
};

ReactDOM.render(<App/>, document.getElementById('root'));