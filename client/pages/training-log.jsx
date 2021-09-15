import React from 'react';
import TrainingModal from '../components/modal';
import Calendar from '../components/date-picker';

export default class TrainingLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      ModalIsOpen: false,
      startDate: new Date(),
      trainingLog: [],
      newSet: [{ reps: '', weight: '' }],
      exerciseId: 1
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitExercise = this.submitExercise.bind(this);
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
      addExercise: []
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
          ModalIsOpen: false,
          addExercise: []
        });
      });
  }

  render() {
    if (this.state.ModalIsOpen) {
      return (
        <TrainingModal exerciseId={this.state.exerciseId} newSet={this.state.newSet} handleClose={this.handleClose} isOpen={this.state.ModalisOpen} date={this.state.startDate} submitExercise={this.submitExercise} />
      );
    }
    return (
      <div className="container">
        <div className="row justify-content-center margin-top-50">
          <Calendar date={this.state.startDate} handleChange={this.handleChange} />
        </div>
        <div className="row justify-content-center margin-top-50">
          <button className="button-width-150 button-height border-radius-5 button-color-primary add-pr-button-font" onClick={this.handleOpen}>+ Add Session</button>
        </div>
      </div>
    );
  }
}
