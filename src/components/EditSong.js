import React, { Component, Fragment } from 'react';
import './EditSong.css';
import Input from './form-components/input';
import Select from './form-components/select.js';

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
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = evt => {
    console.log('Form was submitted');
    evt.preventDefault();
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

  componentDidMount() {
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
          <hr />
          <form onSubmit={this.handleSubmit}>
            <input
              type='hidden'
              name='id'
              id='id'
              value={song.id}
              onChange={this.handleChange}
            />

            <Input
              title={'Title'}
              type={'text'}
              name={'title'}
              value={song.title}
              handleChange={this.handleChange}
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
              type={'text'}
              name={'artist'}
              value={song.artist}
              handleChange={this.handleChange}
            />

            <hr />

            <button className='btn btn-primary'>Save</button>
          </form>

          <div className='mt-3'>
            <pre>{JSON.stringify(this.state, null, 3)}</pre>
          </div>
        </Fragment>
      );
    }
  }
}
