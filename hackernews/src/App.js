import React, { Component } from 'react';
import Search from './Search';
import Table from './Table'
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
    this.onSearchChange = this.onSearchChange.bind(this);
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
    const {searchTerm, list } = this.state;
    return (
      <div className="page">
       <div className="interactions">
          <Search
            value = {searchTerm}
            onChange = {this.onSearchChange}
          >
          Поиск
          </Search>
       </div>
      <Table 
        list = {list}
        pattern = {searchTerm}
        onDismiss = {this.onDismiss}
      />
      </div>
    );
  }
}

export default App;
