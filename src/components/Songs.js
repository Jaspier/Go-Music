import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export default class Music extends Component {
  state = { movies: [] };

  componentDidMount() {
    this.setState({
      movies: [
        { id: 1, title: 'Fair Trade', duration: 193 },
        { id: 2, title: 'Love Nwantiti', duration: 203 },
        { id: 3, title: 'Dancing in the Kitchen', duration: 630 },
      ],
    });
  }

  render() {
    return (
      <Fragment>
        <h2>Choose Song</h2>

        <ul>
          {this.state.movies.map(m => (
            <li key={m.id}>
              <Link to={`/songs/${m.id}`}>{m.title}</Link>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}
