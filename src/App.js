import React, { Fragment } from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div className='container'>
        <div className='row'>
          <h1 className='mt-3'>Go Music!</h1>
          <hr className='mb-3' />
        </div>
        <div className='row'>
          <div className='col-md-2'>
            <nav>
              <ul className='list-group'>
                <li className='list-group-item'>
                  <Link to='/'>Home</Link>
                </li>
                <li className='list-group-item'>
                  <Link to='/music'>Music</Link>
                </li>
                <li className='list-group-item'>
                  <Link to='/admin'>Manage Songs</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className='col-md-10'>
            <Switch>
              <Route path='/music'>
                <Music />
              </Route>
              <Route path='/admin'>
                <Admin />
              </Route>
              <Route path='/'>
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Music() {
  return <h2>Music</h2>;
}

function Admin() {
  return <h2>Manage Songs</h2>;
}
