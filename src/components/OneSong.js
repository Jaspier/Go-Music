import React, { Component, Fragment } from 'react';

export default class OneSong extends Component {
  state = { song: {} };

  componentDidMount() {
    this.setState({
      song: {
        id: this.props.match.params.id,
        title: 'Example Song',
        duration: 180,
      },
    });
  }

  render() {
    return (
      <Fragment>
        <h2>
          Song: {this.state.song.title} {this.state.song.id}
        </h2>

        <table className='table table-compact table-striped'>
          <thead>
            <tbody>
              <tr>
                <td>
                  <strong>Title:</strong>
                </td>
                <td>{this.state.song.title}</td>
              </tr>
              <tr>
                <td>
                  <strong>Duration:</strong>
                </td>
                <td>{this.state.song.duration} seconds</td>
              </tr>
            </tbody>
          </thead>
        </table>
      </Fragment>
    );
  }
}
