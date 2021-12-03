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
import Categories from './components/Categories';
import OneSong from './components/OneSong';

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
                  <Link to='/by-category'>Categories</Link>
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
              <Route exact path='/by-category'>
                <CategoryPage />
              </Route>

              <Route
                exact
                path='/by-category/sad-rap'
                render={props => <Categories {...props} title={`Sad Rap`} />}
              />

              <Route
                exact
                path='/by-category/dance-pop'
                render={props => <Categories {...props} title={`Dance Pop`} />}
              />

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

function CategoryPage() {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <h2>Categories</h2>

      <ul>
        <li>
          <Link to={`${path}/sad-rap`}>Sad Rap</Link>
        </li>
        <li>
          <Link to={`${path}/dance-pop`}>Dance Pop</Link>
        </li>
      </ul>
    </div>
  );
}
