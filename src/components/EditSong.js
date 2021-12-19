import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './EditSong.css';
import Input from './form-components/input';
import Select from './form-components/select.js';
import Alert from './ui-components/Alert';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class EditSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: {
        id: 0,
        title: '',
        release_date: '',
        duration: '',
        riaa_rating: '',
        rating: '',
        artist: '',
        cover: '',
      },
      riaaOptions: [
        { id: 'G', value: 'G' },
        { id: 'PG', value: 'PG' },
        { id: 'PG13', value: 'PG13' },
        { id: 'R', value: 'R' },
        { id: 'NC17', value: 'NC17' },
      ],
      isLoaded: false,
      error: null,
      errors: [],
      alert: {
        type: 'd-none',
        message: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = evt => {
    evt.preventDefault();

    // client side validation
    let errors = [];
    if (this.state.song.title === '') {
      errors.push('title');
    }
    if (this.state.song.artist === '') {
      errors.push('artist');
    }

    this.setState({ errors: errors });

    if (errors.length > 0) {
      return false;
    }

    const data = new FormData(evt.target);
    const payload = Object.fromEntries(data.entries());
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + this.props.jwt);

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: myHeaders,
    };

    fetch('http://localhost:4000/v1/admin/editsong', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.setState({
            alert: { type: 'alert-danger', message: data.error.message },
          });
        } else {
          this.props.history.push({
            pathname: '/admin',
          });
        }
      });
  };

  handleChange = evt => {
    let value = evt.target.value;
    let name = evt.target.name;
    this.setState(prevState => ({
      song: {
        ...prevState.song,
        [name]: value,
      },
    }));
  };

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  componentDidMount() {
    if (this.props.jwt === '') {
      this.props.history.push({
        pathname: '/login',
      });
      return;
    }
    const id = this.props.match.params.id;
    if (id > 0) {
      fetch('http://localhost:4000/v1/song/' + id)
        .then(response => {
          if (response.status !== '200') {
            let err = Error;
            err.Message = 'Invalid response code: ' + response.status;
            this.setState({ error: err });
          }
          return response.json();
        })
        .then(json => {
          const releaseDate = new Date(json.song.release_date);

          this.setState(
            {
              song: {
                id: id,
                title: json.song.title,
                release_date: releaseDate.toISOString().split('T')[0],
                duration: json.song.duration,
                riaa_rating: json.song.riaa_rating,
                rating: json.song.rating,
                artist: json.song.artist,
                cover: json.song.cover,
              },
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
    } else {
      this.setState({
        isLoaded: true,
      });
    }
  }

  confirmDelete = e => {
    confirmAlert({
      title: 'Delete Song?',
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            // delete the song
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', 'Bearer ' + this.props.jwt);

            fetch(
              'http://localhost:4000/v1/admin/deletesong/' + this.state.song.id,
              { method: 'GET' }
            )
              .then(response => response.json)
              .then(data => {
                if (data.error) {
                  this.setState({
                    alert: {
                      type: 'alert-danger',
                      message: data.error.message,
                    },
                  });
                } else {
                  this.props.history.push({
                    pathname: '/admin',
                  });
                }
              });
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  render() {
    let { song, isLoaded, error } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <Fragment>
          <h2>Add/Edit Song</h2>
          <Alert
            alertType={this.state.alert.type}
            alertMessage={this.state.alert.message}
          />
          <hr />
          <form onSubmit={this.handleSubmit}>
            <input
              type="hidden"
              name="id"
              id="id"
              value={song.id}
              onChange={this.handleChange}
            />

            <Input
              title={'Title'}
              className={this.hasError('title') ? 'is-invalid' : ''}
              type={'text'}
              name={'title'}
              value={song.title}
              handleChange={this.handleChange}
              errorDiv={this.hasError('title') ? 'text-danger' : 'd-none'}
              errorMsg={'Please enter a title'}
            />

            <Input
              title={'Release Date'}
              type={'date'}
              name={'release_date'}
              value={song.release_date}
              handleChange={this.handleChange}
            />

            <Input
              title={'Duration'}
              type={'text'}
              name={'duration'}
              value={song.duration}
              handleChange={this.handleChange}
            />

            <Select
              title={'RIAA Rating'}
              name={'riaa_rating'}
              options={this.state.riaaOptions}
              value={song.riaa_rating}
              handleChange={this.handleChange}
              placeholder={'Choose...'}
            />

            <Input
              title={'Rating'}
              type={'text'}
              name={'rating'}
              value={song.rating}
              handleChange={this.handleChange}
            />

            <Input
              title={'Artist'}
              className={this.hasError('artist') ? 'is-invalid' : ''}
              type={'text'}
              name={'artist'}
              value={song.artist}
              handleChange={this.handleChange}
              errorDiv={this.hasError('artist') ? 'text-danger' : 'd-none'}
              errorMsg={'Please enter the song artist'}
            />

            <Input
              title={'Cover URL'}
              type={'text'}
              name={'cover'}
              value={song.cover}
              handleChange={this.handleChange}
            />

            <hr />

            <button className="btn btn-primary">Save</button>
            <Link to="/admin" className="btn btn-warning ms-1">
              Cancel
            </Link>
            {song.id > 0 && (
              <a
                href="#!"
                onClick={() => this.confirmDelete()}
                className="btn btn-danger ms-1"
              >
                Delete
              </a>
            )}
          </form>
        </Fragment>
      );
    }
  }
}
