import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    tasks: ["sleep", "make fend flapjacks"],
    category: ["unproductive", "productive"],
    display: true
  };

  render () {
    return (
      <div className="App">
        < Title />
        {this.state.display ?
          <p addsum={this.addsum}>{2} + {3} = {this.addsum(2, 3)}</p>
          : <p>Sum not here</p>
        }
        <TaskCatAdder addTask={this.addTask} addCategory={this.addCategory} />
        <ListTask tasks={this.state.tasks} removeTask={this.removeTask} category={this.state.category} removeCategory={this.removeCategory} />
      </div>
    );
  }

  addsum = (num1, num2) => {
    return num1 + num2;
  }

  removeTask = taskToDelete => {
    this.setState(prevState => {
      const newTasks = prevState.tasks.filter(task => task !== taskToDelete);
      return { tasks: newTasks };
    });
  };

  removeCategory = categoryToDelete => {
    this.setState(prevState => {
      const newCategory = prevState.category.filter(category => category !== categoryToDelete);
      return { category: newCategory };
    });
  };

  addTask = taskToAdd => {
    this.setState(prevState => {
      const newArray = [...prevState.tasks, taskToAdd];
      return {
        tasks: newArray,
        display: !this.state.display
      };
    });
  };

  addCategory = categoryToAdd => {
    this.setState(prevState => {
      const newArray = [...prevState.category, categoryToAdd];
      return {
        category: newArray
      };
    });
  };
}

function Title () {
  return <h1 id="heading">My to-do list</h1>;
}

class TaskCatAdder extends Component {
  state = {
    task_input: "",
    category_input: ""
  };

  validateForm = () => {
    return this.state.task_input && this.state.category_input;
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>Task input: <input
          onChange={this.handleTyping}
          type="text"
          value={this.state.task_input}
          name='task_input' />
          Category input: <input
            onChange={this.handleTyping}
            type="text"
            value={this.state.category_input}
            name='category_input'
          />
        </div>
        <button disabled={!this.validateForm()}
          type="submit">
          Add Task / Category
        </button>
      </form>
    );
  }

  handleTyping = changeEvent => {
    const userInput = changeEvent.target.value;
    this.setState({ [changeEvent.target.name]: userInput });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addTask(this.state.task_input);
    this.props.addCategory(this.state.category_input);
    this.setState({ task_input: "", category_input: "" });
  };
}

function ListTask (props) {
  return (
    <div>
      <table >
        <tr>
          <th>Task</th>
          <th>Category</th>
        </tr>
        <tr>
          <td>
            {props.tasks.map(task => {
              return (
                <li onClick={event => props.removeTask(task)} key={task}>
                  {task}
                </li>
              );
            })}
          </td>
          <td>
            {props.category.map(category => {
              return (
                <li onClick={event => props.removeCategory(category)} key={category}>
                  {category}
                </li>
              );
            })}
          </td>
        </tr>
      </table>
    </div>
  );
}

export default App;
