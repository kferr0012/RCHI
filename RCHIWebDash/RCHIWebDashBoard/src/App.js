import React, { Component } from 'react';

import './bootstrap.min.css'
import './App.css';

import Header from './components/Header';
import Content from './components/Content';

export default class App extends Component {
  render() {   
    return (
      <div className="App">
        <Header/>
        <Content/>
     </div>
    );
  }
}
