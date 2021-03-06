import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export default class OneGenre extends Component {
  state = {
    songs: [],
    isLoaded: false,
    error: null,
    genreName: '',
  };

  componentDidMount() {
    fetch(
      `${process.env.REACT_APP_API_URL}/v1/songs/` + this.props.match.params.id
    )
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
            genreName: this.props.location.genreName,
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
    let { songs, isLoaded, error, genreName } = this.state;
    if (!songs) {
      songs = [];
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <p>Loading...</p>;
    } else if (songs.length === 0) {
      return (
        <Fragment>
          <h2>Genre: {genreName}</h2>
          <p>
            You don't have any <strong>{genreName}</strong> songs yet.
          </p>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <h2>Genre: {genreName}</h2>

          <div className="list-group">
            {songs.map(m => (
              <Link
                to={`/songs/${m.id}`}
                className="list-group-item list-group-item-action"
              >
                {m.title}
              </Link>
            ))}
          </div>
        </Fragment>
      );
    }
  }
}
