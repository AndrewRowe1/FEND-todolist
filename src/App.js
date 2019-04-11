import React, { Component } from "react";
import "./App.css";

class App extends Component {
  //old
  // constructor() {
  //   this.state = {}
  // }

  //new!
  state = {
    tasks: ["sleep", "make fend flapjacks"]
  };

  render() {
    return (
      <div className="App">
        <Title />
        <TaskAdder addTask={this.addTask} />
        <List tasks={this.state.tasks} removeTask={this.removeTask} />
      </div>
    );
  }

  removeTask = taskToDelete => {
    //no-no - this is MUTATION :(
    // this.state.tasks = this.state.tasks.filter(task => task !== taskToDelete)

    //yes-yes - this is avoids mutation and is best practice
    this.setState(prevState => {
      const newTasks = prevState.tasks.filter(task => task !== taskToDelete);
      return { tasks: newTasks };
    });
  };

  addTask = taskToAdd => {
    this.setState(prevState => {
      const newArray = [...prevState.tasks, taskToAdd];
      return { tasks: newArray };
    });
  };
}

function Title() {
  return <h1 id="heading">My to-do list</h1>;
}

class TaskAdder extends Component {
  state = {
    input: ""
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleTyping}
          type="text"
          value={this.state.input}
        />
      </form>
    );
  }

  handleTyping = changeEvent => {
    const userInput = changeEvent.target.value;
    this.setState({ input: userInput });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addTask(this.state.input);
    this.setState({ input: "" });
  };
}

function List(props) {
  return (
    <ul>
      {props.tasks.map(task => {
        return (
          <li onClick={event => props.removeTask(task)} key={task}>
            {task}
          </li>
        );
      })}
    </ul>
  );
}

export default App;
