import React from 'react';
import Search from './search-bar';

export default class TrainingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      exercises: [],
      filteredExercises: [],
      showSuggestions: false,
      userInput: '',
      addExercise: [],
      exerciseId: this.props.exerciseId,
      ModalisOpen: this.props.ModalisOpen,
      newSet: this.props.newSet,
      date: this.props.date
    };
    this.onType = this.onType.bind(this);
    this.onClick = this.onClick.bind(this);
    this.addExercise = this.addExercise.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addSet = this.addSet.bind(this);
  }

  componentDidMount() {
    fetch('/api/exercise-list')
      .then(res => res.json())
      .then(exercises => this.setState({ exercises }));
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

  addSet() {
    event.preventDefault();
    this.setState(({
      newSet: [...this.state.newSet, { reps: '', weight: '' }]
    }));
  }

  removeSet(index) {
    const newSet = this.state.newSet;
    newSet.splice(index, 1);
    this.setState({ newSet });
  }

  handleChange(index, event) {
    const newSet = this.state.newSet;
    newSet[index][event.target.name] = event.target.value;
    this.setState({ newSet });
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
    if (this.state.addExercise.length > 0) {
      return (
          <div className="modal">
            <div className="modal-content position-relative overflow-scroll">
              <h1>Add Exercise</h1>
              <Search state={this.state} onType={this.onType} click={this.onClick} addExercise={this.addExercise} />
              <div className="row">
                <form onSubmit={this.props.submitExercise}>
                  <div className="row">
                    <h3 className="margin-bottom-5">{this.state.addExercise}</h3>
                  </div>
                  {this.state.newSet.map((element, index) => (
                  <div className="row justify-content-center align-items-flex-end" key={index}>
                    <div className="column-third margin-right-10">
                      <h5>Number of Reps (RM)</h5>
                      <input className="input-width" type="text" name="reps" onChange={event => this.handleChange(index, event)}></input>
                    </div>
                    <div className="column-third">
                      <h5>Weight (lbs)</h5>
                      <input className="input-width" type="text" name="weight" onChange={event => this.handleChange(index, event)}></input>
                      <div className="row justify-content-end margin-top-10">
                        <div>
                            <button type="button" onClick={() => this.addSet()}>Add Set</button>
                        </div>
                          {
                            index
                              ? <div className="margin-left-10">
                                <button type="button" onClick={() => this.removeSet(index)}>Remove Set</button>
                              </div>
                              : null
                          }
                      </div>
                    </div>
                  </div>
                  ))}
                  <div className="margin-top-10">
                    <button type="submit" className="button-width-150 button-height border-radius-5 button-color-primary add-pr-button-font">Submit Exercise</button>
                  </div>
                </form>
              </div>
              <div>
              <a className="color-red position-absolute close-size" onClick={this.props.handleClose}><i className="fas fa-times"></i></a>
              </div>
            </div>
          </div>
      );
    }
    return (
        <div className="modal">
          <div className="modal-content position-relative">
            <h1>Add Exercise</h1>
            <Search state={this.state} onType={this.onType} click={this.onClick} addExercise={this.addExercise} />
            <div>
            <a className="color-red position-absolute close-size" onClick={this.props.handleClose}><i className="fas fa-times"></i></a>
            </div>
          </div>
        </div>
    );
  }
}
