import React, { Component } from 'react';
import Headphones from '../images/headphones.png';
import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className='text-center'>
        <h2>Home</h2>
        <hr />
        <img src={Headphones} alt='headphones' className='headphones' />
        <hr />
      </div>
    );
  }
}
