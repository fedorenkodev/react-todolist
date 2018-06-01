import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox'
import Button from './Button'

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.editing) {
      this.refs.title.focus();
      this.refs.title.select();
    }
  }

  handleOnSubmit(e) {
    e.preventDefault();
    
    let title = this.refs.title.value;
    let id = this.props.id;

    this.props.ondEdit(id, title);
    this.setState({
      editing: false
    });
  }

  renderEdit() {
    return(
      <form className="todo-edit-form" onSubmit={this.handleOnSubmit}>
        <input type="text" ref="title" defaultValue={this.props.title} />
        <Button className="save icon" icon="save" type="submit" />
      </form>
    );
  }

  renderStatic() {
    return (
      <div className={`todo ${this.props.completed ? 'completed' : ''}`}>
        <Checkbox checked={this.props.completed} onChange={ () => this.props.onStatusChange(this.props.id) } />
        <span className="todo-title">{this.props.title}</span>
        <Button className="edit icon" icon="edit" onClick={ () => this.setState({ editing: true }) } />
        <Button className="delete icon" icon="delete" onClick={ () => this.props.onDelete(this.props.id) } />
      </div>
    );
  }

  render() {
    return this.state.editing ? this.renderEdit() : this.renderStatic();
  }
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  onStatusChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  ondEdit: PropTypes.func.isRequired
}

Todo.defaultProps = {
  completed: false
};

export default Todo;