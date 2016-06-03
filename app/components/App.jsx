import uuid from 'node-uuid';
import React from 'react';
import Notes from './Notes.jsx';

export default class App extends React.Component {
  //defines the initial state of the component
  //gets called when the component is instantiated initially
  constructor(props) {
    //if props aren't passed to super this.props won't get set
    super(props);
    //initial data definitions as state
    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: 'Do Something Cool'
        },
        {
          id: uuid.v4(),
          task: 'Make the Codes work'
        },
        {
          id: uuid.v4(),
          task: 'Walk dog'
        },
        {
          id: uuid.v4(),
          task: 'Eat Donuts'
        }
      ]
    }
  }
  // **** React lifecycle functions, explained ****
    /* componentWillMount() -> triggeed before component rendered. One way to use would be to load data async and force rendering through setState */
    /* componentDidMount() -> Triggered after initial rendering. Have access to the DOM here. Could use this hook to wrap a jQuery plugin within a component */
    /* componentWillReceiveProps(object nextProps) -> triggers when the component receives new props. Can be used to modify component state based on new props */
    /* shouldComponentUpdate(object nextProps, object nextState) -> allows you to optimize the rendering. If you check the props and state and see that htere's no need to update, return false */
    /* componentWillUpdate(object nextProps, object nextState) -> gets triggered after shouldComponentUpdate above and before render. Cannot use setState here, but you can set class properties - where immutable data structures come into play */
    /* componentDidUpdate() -> triggered after rendering. You can modify the DOM here. Can be useful for adapting other code to work with React.
    /* componentWillUnmount() -> triggered just before a component is unmounted from the DOM. Where to perform cleanup (remove timers, custom DOM elements, etc.)*/

  addNote  = () => {
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        task: 'New task'
      }])
    });
  }
  editNote = (id, task) => {
    //don't modify if trying to set an empty value
    if(!task.trim()) {
      return;
    }

    const notes = this.state.notes.map(note => {
      if(note.id === id && task) {
        note.task = task;
      }
      return note;
    });
    this.setState({notes});
  }
  deleteNote = (id, e) => {
    e.stopPropagation();

    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    });
  }
  render() {
    const notes = this.state.notes;

    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>
        <Notes notes={notes}
          onEdit={this.editNote}
          onDelete={this.deleteNote} />
      </div>
    );
  }
}
