import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: "Sergey"
    }
  }

  changeStateData = () => {
    this.setState({
      userName: this.state.userName === "Sergey" ? "Bob" : "Sergey",
      todoItems: [{action: "Buy Flower", done: false},
        {action: "Get shoes", done: false},
        {action: "Collect tickets", done: true},
        {action: "Call Joe", done: false}],
      newItemText: ""
    })
  }

  updateNewTextValue = (event) => {
    this.setState({
      newItemText: event.target.value
    });
  }

  createNewTodo = () => {
    if (!this.state.todoItems.find(item => item.action === this.state.newItemText)) {
      this.setState({
        tooItems: [...this.state.todoItems, {action: this.state.newItemText, done: false}],
        newItemText: ""
      });
    }
  }


  render() {
    return (
      <div>
        <h4 className="bg-primary text-white text-center p-2">
          {this.state.userName}'s ToDo List
          ({this.state.todoItems.filter(t => !t.done).length} items to do)
        </h4>
        <div className="container-fluid">
          <div className="my-1">
            <input className="form-control"
                   value={this.state.newItemText}
                   onChange={this.updateNewTextValue}
            />
            <button className="btn btn-primary mt-1" onClick={this.createNewTodo}>Add</button>
          </div>
        </div>
        <button className="btn btn-success m-2" onClick={this.changeStateData}>
          Change name
        </button>
      </div>
    );
  }
}

export default App;
