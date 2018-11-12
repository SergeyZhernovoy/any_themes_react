import React from 'react';
import Button from './Button'
import './App.css';

const  isSearched = searchTerm => item =>
       item.title.toLowerCase().includes(searchTerm.toLowerCase());

const Table = ({list, pattern, onDismiss}) =>
    <div className = "table">
      {list.filter(isSearched(pattern)).map(item =>
                  <div key={item.objectID} className="table-row">
                    <span>
                      <a href={item.url}>{item.title} </a>
                    </span>
                    <span>{item.author}</span>
                    <span>{item.num_comments}</span>
                    <span>{item.points}</span>
                    <span>
                      <Button 
                      onClick={() => onDismiss(item.objectID)}
                      className="button-inline"
                      >
                          Отбросить
                      </Button>
                    </span>
                  </div>
                  )
        }
    </div>

export default Table;