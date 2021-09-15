import React from 'react';
import TrainingModal from '../components/modal';
import Calendar from '../components/date-picker';

export default class TrainingLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      ModalIsOpen: false,
      startDate: new Date()
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  render() {
    if (this.state.ModalIsOpen) {
      return (
        <TrainingModal handleClose={this.handleClose} isOpen={this.state.ModalisOpen} date={this.state.startDate} />
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
