import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import Songs from './components/Songs';
import Home from './components/Home';
import Admin from './components/Admin';
import OneSong from './components/OneSong';
import Genres from './components/Genres';
import OneGenre from './components/OneGenre';

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
                  <Link to='/songs'>Songs</Link>
                </li>
                <li className='list-group-item'>
                  <Link to='/genres'>Genres</Link>
                </li>
                <li className='list-group-item'>
                  <Link to='/admin'>Manage Collection</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className='col-md-10'>
            <Switch>
              <Route path='/songs/:id' component={OneSong} />

              <Route path='/songs'>
                <Songs />
              </Route>

              <Route path='/genre/:id' component={OneGenre} />

              <Route exact path='/genres'>
                <Genres />
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
