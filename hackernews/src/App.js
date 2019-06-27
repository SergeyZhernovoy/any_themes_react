import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import PropTypes from 'prop-types';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';
const DEFAULT_HPP = '100';

class App extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);

        this.state = {
            results: null,
            searchKey: '',
            searchTerm: DEFAULT_QUERY,
            error: null,
            isLoading: false

        };
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    }

    needsToSearchTopStories(searchTerm) {
        return !this.state.results[searchTerm];
    }

    onSearchSubmit(event) {
        const {searchTerm} = this.state;
        this.setState({searchKey: searchTerm});
        if (this.needsToSearchTopStories(searchTerm)) {
            this.fetchSearchTopStories(searchTerm);
        }

        event.preventDefault();
    }

    setSearchTopStories(result) {
        const {hits, page} = result;
        const {searchKey, results, isLoading} = this.state;
        const oldHits = results && results[searchKey] ?results[searchKey].hits : [];
        const updateHits = [
            ...oldHits,
            ...hits
        ];
        this.setState({
            results: {
                ...result,
                [searchKey]: {hits, updateHits, page}
            },
            isLoading: false
        });

    }

    fetchSearchTopStories(searchTerm, page = 0) {
        //fetch
        this.setState({isLoading: true});
        axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            //.then(response => response.json())
            .then(result => this._isMounted && this.setSearchTopStories(result.data))
            .catch(error => this._isMounted && this.setState({error}));
    }

    componentDidMount() {
        this._isMounted = true;
        const {searchTerm } = this.state;
        this.setState({searchKey: searchTerm});
        this.fetchSearchTopStories(searchTerm);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onDismiss(id) {
        const {searchKey, results} = this.state;
        const {hits, page} = results[searchKey];

        const updateList = hits.filter(item => item.objectID !== id);
        this.setState({
            results: {
                ...results,
                [searchKey]: {hits: updateList, page}
            }
        });
    }

    onSearchChange(event) {
        this.setState({searchTerm: event.target.value});
    }

    render() {
        const {
            results,
            searchTerm,
            searchKey,
            error,
            isLoading
        } = this.state;
        const page = (
            results &&
            results[searchKey] &&
            results[searchKey].page
        ) || 0;
        const list = (
          results &&
          results[searchKey] &&
          results[searchKey].hits
        ) || [];

        return (
            <div className="page">
                <div className="interactions">


                    <Search
                        value={searchTerm}
                        onChange={this.onSearchChange}
                        onSubmit={this.onSearchSubmit}
                    >
                    Поиск
                    </Search>
                </div>
                {   error
                    ? <div className="interactions">
                        <p>Something went wrong.</p>
                      </div> :
                        <Table
                            list={list}
                            onDismiss={this.onDismiss}
                        />
                }
                <div className="interactions">
                    {
                        isLoading
                            ? <Loading/>
                            : <Button
                                onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
                            >
                                More
                            </Button>
                    }
                </div>
            </div>
        );
    }
}

const Loading = () =>
    <div>Loading ...</div>

const Search = ({value, onChange, onSubmit, children})=>
        <form onSubmit={onSubmit}>
            <input
                   type="text"
                   value={value}
                   onChange={onChange}
            />
            <button type="submit">
                {children}
            </button>
        </form>


const Table = ({list, onDismiss}) =>
        <div className="table">
            {list.map(item =>
                <div key={item.objectID} className="table-row">
                        <span style={{width: '40%'}}>
                            <a href={item.uri}>{item.title}</a>
                        </span>
                    <span style={{width: '30%'}}>{item.author}</span>
                    <span style={{width: '10%'}}>{item.num_comments}</span>
                    <span style={{width: '10%'}}>{item.points}</span>
                    <span style={{width: '10%'}}>
                        <Button
                            onClick={() => onDismiss(item.objectID)}
                            className="button-inline"
                        >
                            Отбросить
                        </Button>
                        </span>
                </div>
            )}
        </div>


const Button = ({onClick, className ='',children}) =>
        <button
            onClick={onClick}
            className={className}
            type="button">
            {children}
        </button>

Button.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node
}


export default App;
