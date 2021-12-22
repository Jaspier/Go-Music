import React, { Component, Fragment } from 'react';

export default class OneSong extends Component {
  state = { song: {}, isLoaded: false, error: null };

  componentDidMount() {
    fetch(
      `${process.env.REACT_APP_API_URL}/v1/song/` + this.props.match.params.id
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
            song: json.song,
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
    const { song, isLoaded, error } = this.state;
    if (song.genres) {
      song.genres = Object.values(song.genres);
    } else {
      song.genres = [];
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <Fragment>
          <h2>
            Song: {song.title} ({song.year})
          </h2>

          {song.cover !== '' && (
            <div>
              <img
                src={song.cover}
                alt="album cover"
                style={{ width: '300px' }}
              />
            </div>
          )}

          <div className="float-start">
            <small>Rating: {song.riaa_rating}</small>
          </div>
          <div className="float-end">
            {song.genres.map((m, index) => (
              <span className="badge bg-secondary me-1" key={index}>
                {m}
              </span>
            ))}
          </div>
          <div className="clearfix"></div>

          <hr />

          <table className="table table-compact table-striped">
            <thead></thead>
            <tbody>
              <tr>
                <td>
                  <strong>Title:</strong>
                </td>
                <td>{song.title}</td>
              </tr>
              <tr>
                <td>
                  <strong>Artist:</strong>
                </td>
                <td>{song.artist}</td>
              </tr>
              <tr>
                <td>
                  <strong>Duration:</strong>
                </td>
                <td>{song.duration} seconds</td>
              </tr>
            </tbody>
          </table>
        </Fragment>
      );
    }
  }
}
