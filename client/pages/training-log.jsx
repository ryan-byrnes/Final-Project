import React from 'react';
import TrainingModal from '../components/modal';
import Calendar from '../components/date-picker';
import TrainingSession from '../components/training-session';

export default class TrainingLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      isOpen: false,
      startDate: new Date(),
      trainingSession: [],
      sets: [{ reps: '', weight: '' }],
      exerciseId: 1,
      isLoading: false,
      failed: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submitExercise = this.submitExercise.bind(this);
    this.addSet = this.addSet.bind(this);
    this.repsWeightInput = this.repsWeightInput.bind(this);
    this.removeSet = this.removeSet.bind(this);
    this.getExerciseId = this.getExerciseId.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
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
      sets: [{ reps: '', weight: '' }]
    });
  }

  submitExercise() {
    event.preventDefault();
    const { startDate, userId, sets, exerciseId } = this.state;
    fetch('/api/training', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: startDate.toLocaleString(),
        exerciseId: exerciseId,
        sets: JSON.stringify(sets),
        userId: userId
      })
    })
      .then(res => {
        this.setState({
          isLoading: true
        });
        res.json();
      })
      .then(data => {
        const session = this.state.trainingSession.concat(data);
        this.setState({
          trainingSession: session,
          isOpen: false,
          isLoading: false,
          sets: [{ reps: '', weight: '' }]
        });
      })
      .catch(err => {
        this.setState({ isLoading: false, failed: true });
        console.error(err);
      });
  }

  addSet(set) {
    event.preventDefault();
    this.setState(({
      sets: [...this.state.sets, set]
    }));
  }

  getExerciseId(id) {
    this.setState({
      exerciseId: id
    });
  }

  repsWeightInput(input) {
    this.setState({
      sets: input
    });
  }

  removeSet(index) {
    const newSet = this.state.sets;
    const cloneSet = [...newSet.slice(0, index), ...newSet.slice(index + 1)];
    this.setState({
      sets: cloneSet
    });
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="row justify-content-center">
          <p className="font-size-medium color-red font-style-italic">Network Error! Please check your internet connection.</p>
        </div>
      );
    }
    if (this.state.isLoading) {
      return (
        <div className="lds-spinner spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
    }
    if (this.state.isOpen) {
      return (
        <div>
          <TrainingModal getExerciseId={this.getExerciseId} setInfo={this.repsWeightInput} sets={this.state.sets} addSet={this.addSet} removeSet={this.removeSet} exerciseId={this.state.exerciseId} newSet={this.state.sets} handleClose={this.handleClose} isOpen={this.state.isOpen} date={this.state.startDate} submitExercise={this.submitExercise} />
          <div className="container">
            <div className="row margin-top-10 justify-content-center width-100">
              <h1 className="border-bottom-black">Training Log</h1>
            </div>
            <div className="row margin-top-10 flex-direction-column align-items-center width-100">
              <TrainingSession date={this.state.startDate} />
            </div>
            <div className="row justify-content-center margin-top-50">
              <button className="button-width-150 button-height border-radius-5 button-color-primary add-pr-button-font" onClick={this.handleOpen}>+ Add Exercise</button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="row justify-content-center margin-top-50">
          <Calendar date={this.state.startDate} handleChange={this.handleChange} />
        </div>
        <div className="row margin-top-10 justify-content-center width-100">
          <h1 className="border-bottom-black">Training Log</h1>
        </div>
        <div className="row margin-top-10 flex-direction-column align-items-center width-100">
          <TrainingSession date={this.state.startDate} />
        </div>
        <div className="row justify-content-center margin-top-50">
          <button className="button-width-150 button-height border-radius-5 button-color-primary add-pr-button-font" onClick={this.handleOpen}>+ Add Exercise</button>
        </div>
      </div>
    );
  }
}
