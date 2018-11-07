import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    var helloWorld = 'Добро пожаловать в Путь изучения React';
    return (
      <div className="App">
        <h2>{helloWorld}</h2>
      </div>
    );
  }
}

export default App;
