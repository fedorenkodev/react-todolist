import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Todo from './components/Todo';
import Form from './components/Form';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: this.props.initialData
    }
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/todos')
      .then(response => response.data)
      .then(todos => this.setState({todos}))
      .catch(this.handleError);
  }

  handleStatusChange(id) {
    axios.patch(`/api/todos/${id}`)
      .then(response => {
        let todos = this.state.todos.map(todo => {
          if(todo.id === id) {
            todo = response.data
          }
    
          return todo;
        });

        this.setState({
          todos
        });
      })
      .catch(this.handleError);
  }

  handleDelete(id) {
    axios.delete(`/api/todos/${id}`)
      .then(() => {
        let todos = this.state.todos.filter(todo => todo.id !== id);

        this.setState({
          todos
        });
      });
  }

  handleAdd(title) {
    axios.post('/api/todos', { title })
      .then(response => response.data)
      .then(todo => {
        let todos = [...this.state.todos, todo];
        this.setState({
          todos
        });
      })
      .catch(this.handleError);    
  }

  handleError(error) {
    console.error(error);
  }

  handleEdit(id, title) {
    axios.put(`/api/todos/${id}`, {title})
    .then(response => {
      let todos = this.state.todos.map(todo => {
        if(todo.id === id) {
          todo = response.data;
        }
  
        return todo;
      });
  
      this.setState({
        todos
      });
    })
    .catch(this.handleError);
  }

  render() {
    return (
      <main>
        <Header todos={this.state.todos} title={this.props.title}/>
        {
          this.state.todos.map(todo => 
            <Todo 
              key={todo.id} 
              id={todo.id}
              title={todo.title} 
              completed={todo.completed} 
              onStatusChange={this.handleStatusChange} 
              onDelete={this.handleDelete}
              ondEdit={this.handleEdit}
            />
          )
        }
        <Form onAdd={this.handleAdd}/>
      </main>
    )
  }
}

App.propTypes = {
  initialData: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    id: PropTypes.number.isRequired
  }))
};

export default App;