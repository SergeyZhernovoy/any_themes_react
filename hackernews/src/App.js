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

const  isSearched = searchTerm => item =>
       item.title.toLowerCase().includes(searchTerm.toLowerCase());
  
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
      searchTerm: ''
    }
    this.onDismiss = this.onDismiss.bind(this);
    this.clickMe = this.clickMe.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  clickMe() {
    console.log(this);
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value});
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
        <form>
          <input type="text" onChange={this.onSearchChange}/>
        </form>
       {
         this.state.list.filter(isSearched(this.state.searchTerm)).map(item =>
           <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title} </a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
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
