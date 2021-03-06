import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Input from './form-components/input';

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
      searchTerm: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = evt => {
    let value = evt.target.value;

    this.setState(prevState => ({
      searchTerm: value,
    }));

    if (value.length > 2) {
      this.performSearch();
    } else {
      this.setState({ songs: [] });
    }
  };

  performSearch() {
    const payload = `
    {
      search(titleContains: "${this.state.searchTerm}") {
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

    fetch(`${process.env.REACT_APP_API_URL}/v1/graphql`, requestOptions)
      .then(response => response.json())
      .then(data => {
        let theList = Object.values(data.data.search);
        return theList;
      })
      .then(theList => {
        if (theList.length > 0) {
          this.setState({
            songs: theList,
          });
        } else {
          this.setState({
            songs: [],
          });
        }
      });
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

    fetch(`${process.env.REACT_APP_API_URL}/v1/graphql`, requestOptions)
      .then(response => response.json())
      .then(data => {
        let theList = Object.values(data.data.list);
        return theList;
      })
      .then(theList => {
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

        <Input
          title={'Search'}
          type={'text'}
          name={'search'}
          value={this.state.searchTerm}
          handleChange={this.handleChange}
        />

        <div className="list-group">
          {songs.map(s => (
            <Link
              key={s.id}
              className="list-group-item list-group-item-action"
              to={`/songsgraphql/${s.id}`}
            >
              <strong>{s.title}</strong>
              <br />
              <small className="text-muted">
                ({s.year}) - {s.duration} seconds
              </small>
              <br />
              {s.artist}
            </Link>
          ))}
        </div>
      </Fragment>
    );
  }
}
