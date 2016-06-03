import React from 'react';

export default class Note extends React.Component {
  constructor(props) {
    super(props);

    //Track editing state
    this.state = {
      editing: false
    };
  }
  render() {
    //Render the component differently based on state
    if(this.state.editing) {
      return this.renderEdit();
    }

    return this.renderNote();
  }
  renderEdit = () => {
    console.log("renderEdit");
    return <input type="text"
      ref={
        (e) => e ? e.selectionState = this.props.task.length : null
      }
      autoFocus={true}
      defaultValue={this.props.task}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter} />
  }
  renderNote = () => {
    console.log("renderNote");

    // if the user clicks a normal note, trigger editing logic
    return <div onClick={this.edit}>{this.props.task}</div>;
  };
  edit = () => {
    console.log("edit");
    //Enter edit mode
    this.setState({
      editing: true
    });
  };
  checkEnter = (e) => {
    console.log("checkEnter");
    // The user hit enter -> finish up
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  };
  finishEdit = (e) => {
    console.log("finishEdit");

    const value = e.target.value;

    if(this.props.onEdit) {
      this.props.onEdit(value);
      //exit edit mode
      this.setState({
        editing: false
      });
    }
  };
}
