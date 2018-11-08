import React, { Component } from 'react';
import './App.css';

const list = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1
    }
];

const user = {
  name: 'Sergey Zhernovoy',
  age: 40
}
/**
 *
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
/**
 *Creates an instance of App.
 * @param {*} props
 * @memberof App
 */
constructor(props) {
    super(props);
    this.state = {
      list,
      user
    }
    this.onDismiss = this.onDismiss.bind(this);
    this.clickMe = this.clickMe.bind(this);
  }

  clickMe() {
    console.log(this);
  }


/**
 *
 *
 * @param {*} id
 * @memberof App
 */
onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updateList = this.state.list.filter(isNotId);
    this.setState({list: updateList});
  }

  /**
   *
   *
   * @returns
   * @memberof App
   */
render() {
    return (
      <div className="App">
       {
         this.state.list.map(item =>
           <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title} </a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <p><span>{this.state.user.name}</span></p>
              <span>
                <button onClick={() => this.onDismiss(item.objectID)}
                type = "button"
                >
                  Отбросить
                </button>
              </span>
              <span>
                <button onClick={this.clickMe} type="button">
                  Кликни на меня.
                </button>
              </span>
              <span>
                <button onClick={()=>console.log(item.objectID)} type="button">
                  Смотри логи .
                </button>
              </span>
           </div>
          )
       }
      </div>
    );
  }
}

export default App;
