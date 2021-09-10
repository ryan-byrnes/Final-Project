import React from 'react';
import PropTypes from 'prop-types';

export default class PrPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prs: [],
      userId: 1
    };
  }

  componentDidMount() {
    fetch(`/api/pr/${this.state.userId}`)
      .then(res => res.json())
      .then(prs => this.setState({ prs }));
  }

  render() {
    return (
    <div className="container">
      <div className="row">
        {
          this.state.prs.map(pr => (
            <div key={pr.prId}>
              <Pr pr={pr}/>
            </div>
          ))
        }
      </div>
      <div>
        <AddPrModal />
      </div>
    </div>
    );
  }
}

class AddPrModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onType = this.onType.bind(this);
    this.onClick = this.onClick.bind(this);
    this.addExercise = this.addExercise.bind(this);
    this.state = {
      isOpen: false,
      exercises: [],
      filteredExercises: [],
      activeSuggestions: 0,
      showSuggestions: false,
      userInput: '',
      addExercise: []
    };
  }

  componentDidMount() {
    fetch('/api/exercise-list')
      .then(res => res.json())
      .then(exercises => this.setState({ exercises }));
  }

  handleOpen() {
    this.setState({ isOpen: true });
  }

  handleClose() {
    this.setState({
      isOpen: false
    });
  }

  addExercise() {
    event.preventDefault();
    this.setState({
      addExercise: this.state.userInput,
      userInput: ''
    });
  }

  onType(event) {
    const userInput = event.currentTarget.value;
    const filteredExercises = this.state.exercises.filter(
      exercise => exercise.exercise.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    this.setState({
      activeSuggestions: 0,
      filteredExercises,
      showSuggestions: true,
      userInput: event.target.value
    });
  }

  onClick(event) {
    this.setState({
      activeSuggestions: 0,
      filteredExercises: [],
      showSuggestions: false,
      userInput: event.currentTarget.innerText
    });
  }

  render() {
    if (!this.state.isOpen) {
      return (
        <div>
          <button onClick={this.handleOpen}>+ Add PR</button>
        </div>
      );
    }
    if (this.state.addExercise.length > 0) {
      return (
        <div>
          <a href="">+ Add PR</a>
          <div className="modal">
            <div className="modal-content">
              <h1>Add PR's</h1>
              <Search state={this.state} onType={this.onType} click={this.onClick} addExercise={this.addExercise} />
              <div>
                <h1>{this.state.addExercise}</h1>
              </div>
              <div>
                <button onClick={this.handleClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <a href="">+ Add PR</a>
        <div className="modal">
          <div className="modal-content">
            <h1>Add PR's</h1>
            <Search state={this.state} onType={this.onType} click={this.onClick} addExercise={this.addExercise} />
            <div>
              <button onClick={this.handleClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function Pr(props) {
  const { exercise, reps, weight } = props.pr;
  return (
    <div className="row">
      <h3>{ exercise }</h3>
      <h5>{ reps } RM</h5>
      <h5>{weight}</h5>
    </div>
  );
}

class Search extends React.Component {

  render() {
    const { showSuggestions, userInput, filteredExercises } = this.props.state;
    let listSuggestions;
    if (showSuggestions && userInput) {
      if (filteredExercises.length) {
        listSuggestions = (
          <div>
            <ul className="suggestions">
              {filteredExercises.map((suggestion, index) => {
                return (
                  <li key={suggestion.exercise} onClick={this.props.click}>
                    {suggestion.exercise}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      } else {
        listSuggestions = (
          <div>
            <div className="no-suggestions">
              <p>No suggestions available</p>
            </div>
          </div>
        );
      }
    }

    return (
      <form onSubmit={this.props.addExercise}>
        <input type="text" onChange={this.props.onType} value={userInput} />
        <button className="height" type="submit">Add</button>
        {listSuggestions}
      </form>
    );
  }
}

Search.propTypes = {
  suggestions: PropTypes.instanceOf(Array)
};
