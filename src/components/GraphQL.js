import React, { Component, Fragment } from 'react';

export default class GraphQL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      isLoaded: false,
      error: null,
      alert: {
        type: 'd-none',
        message: '',
      },
    };
  }

  componentDidMount() {
    const payload = `
    {
      list {
        id
        title
        duration
        year
        artist
      }
    }
    `;

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      body: payload,
      headers: myHeaders,
    };

    fetch('http://localhost:4000/v1/graphql/list', requestOptions)
      .then(response => response.json())
      .then(data => {
        let theList = Object.values(data.data.list);
        return theList;
      })
      .then(theList => {
        console.log(theList);
        this.setState({
          songs: theList,
        });
      });
  }

  render() {
    let { songs } = this.state;
    return (
      <Fragment>
        <h2>GraphQL</h2>
        <hr />
        <div className="list-group">
          {songs.map(s => (
            <a
              key={s.id}
              className="list-group-item list-group-item-action"
              href="#!"
            >
              <strong>{s.title}</strong>
              <br />
              <small className="text-muted">
                ({s.year}) - {s.duration} seconds
              </small>
              <br />
              {s.artist}
            </a>
          ))}
        </div>
      </Fragment>
    );
  }
}
