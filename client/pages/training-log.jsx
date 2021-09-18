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
      workout: [],
      sets: [{ reps: '', weight: '' }],
      exerciseId: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submitExercise = this.submitExercise.bind(this);
    this.addSet = this.addSet.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleOpen() {
    this.setState({
      ModalIsOpen: true
    });
  }

  handleClose() {
    this.setState({
      ModalIsOpen: false,
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

  addSet(set) {
    event.preventDefault();
    this.setState(({
      sets: [...this.state.sets, set]
    }));
  }

  removeSet(index) {
    const newSet = this.state.newSet;
    const cloneSet = [...newSet.slice(0, index), ...newSet.slice(index + 1)];
    this.setState({
      newSet: cloneSet
    });
  }

  render() {
    if (this.state.ModalIsOpen) {
      return (
        <TrainingModal sets={this.state.sets} addSet={this.addSet} removeSet={this.removeSet} exerciseId={this.state.exerciseId} newSet={this.state.newSet} handleClose={this.handleClose} isOpen={this.state.isOpen} date={this.state.startDate} submitExercise={this.submitExercise} />
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
          <button className="button-width-150 button-height border-radius-5 button-color-primary add-pr-button-font" onClick={this.handleOpen}>+ Add Session</button>
        </div>
      </div>
    );
  }
}
