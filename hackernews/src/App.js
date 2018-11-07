import React, { Component } from 'react';
import './App.css';


function formatName(user) {
  return user.name + ' ' + user.surname;
}

class App extends Component {
  render() {
    const helloWorld = 'Добро пожаловать в Путь изучения React';
    var user = {name: 'Sergey', surname : 'Zhernovoy', age : 40};
    return (
      <div className="App">
        <h2>{helloWorld}</h2>
        <h3>Hello , {formatName(user)}</h3>
        <h2>Сейчас {new Date().toLocaleTimeString()}</h2>
      </div>
    );
  }
}

export default App;
