import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export default class Music extends Component {
  state = {
    songs: [],
    isLoaded: false,
    error: null,
  };

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/v1/songs`)
      .then(response => {
        if (response.status !== '200') {
          let err = Error;
          err.message = 'Invalid response code: ' + response.status;
          this.setState({ error: err });
        }
        return response.json();
      })
      .then(json => {
        this.setState(
          {
            songs: json.songs,
            isLoaded: true,
          },
          error => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
      });
  }

  render() {
    const { songs, isLoaded, error } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <Fragment>
          <h2>Choose Song</h2>

          <div className="list-group">
            {songs.map(m => (
              <Link
                key={m.id}
                className="list-group-item list-group-item-action"
                to={`/songs/${m.id}`}
              >
                {m.title} - {m.artist}
              </Link>
            ))}
          </div>
        </Fragment>
      );
    }
  }
}
