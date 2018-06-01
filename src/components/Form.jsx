import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button'

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ''
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    let title = this.state.title;

    if(title.length) {
      this.props.onAdd(title);
      this.setState({ title: '' });
    }
  }

  handleOnChange(e) {
    let title = e.target.value;
    this.setState({title});
  }

  render() {
    return (
      <form className="todo-form" onSubmit={this.handleOnSubmit}>
        <input type="text" value={this.state.title} onChange={this.handleOnChange} placeholder="What should be done?"/>
        <Button type="submit">Add</Button>
      </form> 
    ); 
  }
}

Form.propTypes = {
  onAdd: PropTypes.func.isRequired
};

export default Form;