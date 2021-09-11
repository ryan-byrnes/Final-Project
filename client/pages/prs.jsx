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
    if (!this.state.prs.length) {
      return (
        <div>
          <AddPrModal userId={this.state.userId} prs={this.state.prs} />
        </div>
      );
    }
    return (
    <div className="container">
      <div>
        <div className="row justify-content-center">
          <div className="column-half border-bottom-black text-align-center">
            <h2 className="font-weight-bold">Personal Records</h2>
          </div>
        </div>
        {
          this.state.prs.map(pr => (
            <div className="prs" key={pr.prId}>
              <Pr pr={pr}/>
            </div>
          ))
        }
      </div>
      <div>
        <AddPrModal userId={this.state.userId} prs={this.state.prs} />
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
    this.submitPR = this.submitPR.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      isOpen: false,
      exercises: [],
      prs: this.props.prs,
      filteredExercises: [],
      activeSuggestions: 0,
      showSuggestions: false,
      userInput: '',
      addExercise: [],
      userId: this.props.userId,
      exerciseId: 1,
      reps: '',
      weight: ''
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
      isOpen: false,
      addExercise: []
    });
  }

  addExercise() {
    event.preventDefault();
    for (let i = 0; i < this.state.exercises.length; i++) {
      if (this.state.userInput === this.state.exercises[i].exercise) {
        this.setState({
          exerciseId: this.state.exercises[i].exerciseId
        });
      }
    }
    this.setState({
      addExercise: this.state.userInput,
      userInput: ''
    });
  }

  submitPR() {
    const { userId, exerciseId, reps, weight } = this.state;
    fetch('/api/pr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userId,
        exerciseId: exerciseId,
        reps: reps,
        weight: weight
      })
    })
      .then(res => res.json())
      .then(data => {
        const updatedPrArray = this.state.prs.concat(data);
        this.setState({
          prs: updatedPrArray,
          isOpen: false,
          addExercise: []
        });
      });
  }

  handleChange() {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value
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
        <div className="row justify-content-center margin-top-50">
          <button className="button-width button-height border-radius-5 button-color-primary add-pr-button-font" onClick={this.handleOpen}>+ Add PR</button>
        </div>
      );
    }
    if (this.state.addExercise.length > 0) {
      return (
        <div>
          <div className="row justify-content-center">
            <button className="button-width button-height border-radius-5 button-color-primary add-pr-button-font">+ Add PR</button>
          </div>
          <div className="modal">
            <div className="modal-content position-relative">
              <h1>Add PR</h1>
              <Search state={this.state} onType={this.onType} click={this.onClick} addExercise={this.addExercise} />
              <div className="row">
                <form onSubmit={this.submitPR}>
                  <div className="row">
                    <h3 className="margin-bottom-5">{this.state.addExercise}</h3>
                  </div>
                  <div className="row justify-content-center">
                    <div className="column-half margin-right-10">
                      <h5>Number of Reps (RM)</h5>
                      <input className="input-width" type="text" name="reps" onChange={this.handleChange}></input>
                    </div>
                    <div className="column-half">
                      <h5>Weight (lbs)</h5>
                      <input className="input-width" type="text" name="weight" onChange={this.handleChange}></input>
                    </div>
                  </div>
                  <div className="margin-top-10">
                    <button className="button-width button-height border-radius-5 button-color-primary add-pr-button-font" type="submit">Submit PR</button>
                  </div>
                </form>
              </div>
              <div>
                <button className="button-color-close button-width button-height position-absolute border-radius-5 add-pr-button-font" onClick={this.handleClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="row justify-content-center">
          <button>+ Add PR</button>
        </div>
        <div className="modal">
          <div className="modal-content position-relative">
            <h1>Add PR</h1>
            <Search state={this.state} onType={this.onType} click={this.onClick} addExercise={this.addExercise} />
            <div>
              <button className="button-height button-width border-radius-5 button-color-close position-absolute add-pr-button-font" onClick={this.handleClose}>Close</button>
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
    <div className="row justify-content-center container-list">
      <div className="column-third border-bottom-lightgray padding-left-10">
        <h3 className="font-weight-bold">{ exercise }</h3>
      </div>
      <div className="flex-basis border-bottom-lightgray">
        <h3 className="font-weight-bold">{ reps } RM:</h3>
      </div>
      <div className="flex-basis border-bottom-lightgray">
        <h3>{weight} lbs</h3>
      </div>
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
              {filteredExercises.map(suggestion => {
                return (
                  <li key={suggestion.exerciseId} onClick={this.props.click}>
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
        <button className="button-width button-height border-radius-5 button-color-primary add-pr-button-font height" type="submit">Add</button>
        {listSuggestions}
      </form>
    );
  }
}

Search.propTypes = {
  suggestions: PropTypes.instanceOf(Array)
};
