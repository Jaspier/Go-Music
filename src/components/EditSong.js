import React, { Component, Fragment } from 'react';
import './EditSong.css';
import Input from './form-components/input';
import Select from './form-components/select.js';

export default class EditSong extends Component {
  state = {
    song: {},
    isLoaded: false,
    error: null,
  };

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

  componentDidMount() {}

  render() {
    let { song } = this.state;

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
          {/* <div className='mb-3'>
            <label htmlFor='title' className='form-label'>
              Title
            </label>
            <input
              type='text'
              className='form-control'
              id='title'
              name='title'
              value={song.title}
              onChange={this.handleChange}
            />
          </div> */}

          <Input
            title={'Title'}
            type={'text'}
            name={'title'}
            value={song.title}
            handleChange={this.handleChange}
          />

          {/* <div className='mb-3'>
            <label htmlFor='release_date' className='form-label'>
              Release date
            </label>
            <input
              type='text'
              className='form-control'
              id='release_date'
              name='release_date'
              value={song.release_date}
              onChange={this.handleChange}
            />
          </div> */}

          <Input
            title={'Release Date'}
            type={'date'}
            name={'release_date'}
            value={song.release_date}
            handleChange={this.handleChange}
          />

          {/* <div className='mb-3'>
            <label htmlFor='duration' className='form-label'>
              Duration
            </label>
            <input
              type='text'
              className='form-control'
              id='duration'
              name='duration'
              value={song.duration}
              onChange={this.handleChange}
            />
          </div> */}

          <Input
            title={'Duration'}
            type={'text'}
            name={'duration'}
            value={song.duration}
            handleChange={this.handleChange}
          />

          {/* <div className='mb-3'>
            <label htmlFor='riaa_rating' className='form-label'>
              RIAA RATING
            </label>
            <select
              name='riaa_rating'
              className='form-select'
              value={song.riaa_rating}
              onChange={this.handleChange}
            >
              <option className='form-select'>Choose...</option>
              <option className='form-select' value='G'>
                G
              </option>
              <option className='form-select' value='PG'>
                PG
              </option>
              <option className='form-select' value='PG13'>
                PG13
              </option>
              <option className='form-select' value='R'>
                R
              </option>
              <option className='form-select' value='NC17'>
                NC17
              </option>
            </select>
          </div> */}

          <Select
            title={'RIAA Rating'}
            name={'riaa_rating'}
            options={this.state.riaaOptions}
            value={song.riaa_rating}
            handleChange={this.handleChange}
            placeholder={'Choose...'}
          />

          {/* <div className='mb-3'>
            <label htmlFor='rating' className='form-label'>
              Rating
            </label>
            <input
              type='text'
              className='form-control'
              id='rating'
              name='rating'
              value={song.rating}
              onChange={this.handleChange}
            />
          </div> */}

          <Input
            title={'Rating'}
            type={'text'}
            name={'rating'}
            value={song.rating}
            handleChange={this.handleChange}
          />

          {/* <div className='mb-3'>
            <label htmlFor='artist' className='form-label'>
              Artist
            </label>
            <input
              type='text'
              className='form-control'
              id='artist'
              name='artist'
              value={song.artist}
              onChange={this.handleChange}
            />
          </div> */}

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
