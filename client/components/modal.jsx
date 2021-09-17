import React from 'react';
import Search from './search-bar';
import TrainingSession from './training-session';

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
      exerciseId: 1,
      isOpen: false,
      newSet: [{ reps: '', weight: '' }],
      startDate: this.props.date,
      trainingLog: []
    };
    this.onType = this.onType.bind(this);
    this.onClick = this.onClick.bind(this);
    this.addExercise = this.addExercise.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addSet = this.addSet.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submitExercise = this.submitExercise.bind(this);
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
    const cloneSet = [...newSet.slice(0, index), ...newSet.slice(index + 1)];
    this.setState({
      newSet: cloneSet
    });
  }

  handleChange(index, event) {
    const setCopy = this.state.newSet.slice(0);
    const exerciseCopy = Object.assign({}, setCopy[index]);
    exerciseCopy[event.target.name] = event.target.value;
    setCopy[index] = exerciseCopy;
    this.setState({ newSet: setCopy });
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

  handleOpen() {
    this.setState({
      isOpen: true
    });
  }

  handleClose() {
    this.setState({
      isOpen: false,
      addExercise: [],
      newSet: [{ reps: '', weight: '' }]
    });
  }

  submitExercise() {
    event.preventDefault();
    const { startDate, userId, newSet, exerciseId } = this.state;
    fetch('/api/training', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: startDate,
        exerciseId: exerciseId,
        sets: JSON.stringify(newSet),
        userId: userId
      })
    })
      .then(res => res.json())
      .then(data => {
        const session = this.state.trainingLog.concat(data);
        this.setState({
          trainingLog: session,
          isOpen: false,
          addExercise: []
        });
      });
  }

  render() {
    if (!this.state.isOpen) {
      return (
        <div className="container">
          <div className="row margin-top-10 justify-content-center width-100">
            <h1 className="border-bottom-black">Training Log</h1>
          </div>
          <div className="row margin-top-10 flex-direction-column align-items-center width-100">
            <TrainingSession date={this.state.startDate} />
          </div>
          <div className="row justify-content-center margin-top-50">
            <button className="button-width-150 button-height border-radius-5 button-color-primary add-pr-button-font" onClick={this.handleOpen}>+ Add Session</button>
          </div>
        </div>
      );
    }
    if (this.state.addExercise.length > 0) {
      return (
          <div className="modal">
            <div className="modal-content position-relative overflow-scroll">
              <h1>Add Exercise</h1>
              <Search state={this.state} onType={this.onType} click={this.onClick} addExercise={this.addExercise} />
              <div className="row">
                <form onSubmit={this.submitExercise}>
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
                            index > 0 &&
                              <div className="margin-left-10">
                                <button type="button" onClick={() => this.removeSet(index)}>Remove Set</button>
                              </div>
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
              <a className="color-red position-absolute close-size" onClick={this.handleClose}><i className="fas fa-times"></i></a>
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
            <a className="color-red position-absolute close-size" onClick={this.handleClose}><i className="fas fa-times"></i></a>
            </div>
          </div>
        </div>
    );
  }
}
