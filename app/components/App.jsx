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

  addNote  = () => {
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        task: 'New task'
      }])
    });
  }

  render() {
    const notes = this.state.notes;

    return (
      <div>
        <button onClick={this.addNote}>+</button>
        <Notes notes={notes} />
      </div>
    );
  }
}
