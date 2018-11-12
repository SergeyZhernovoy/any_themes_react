import React, { Component } from 'react';
import Search from './Search';
import Table from './Table'
import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';

const PATH_SEARCH = '/search';

const PARAM_SEARCH = 'query=';

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
      result: null,
      searchTerm: DEFAULT_QUERY,
    }
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
  }

  setSearchTopStories(result) {
    this.setState({result});
  }

  componentDidMount() {
    const {searchTerm} = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(error => error);

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
    const {searchTerm, result } = this.state;

    if (!result) {return null;}

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
        list = {result.hits}
        pattern = {searchTerm}
        onDismiss = {this.onDismiss}
      />
      </div>
    );
  }

  componentDidCatch(error, info) {

  }

}

export default App;
