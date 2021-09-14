import React from 'react';
import Example from '../components/date-picker';
import TrainingModal from '../components/modal';

export default class TrainingLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      ModalIsOpen: false
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
        <TrainingModal handleClose={this.handleClose} isOpen={this.state.ModalisOpen} />
      );
    }
    return (
      <div className="container">
        <div className="row justify-content-center margin-top-50">
          <Example />
        </div>
        <div className="row justify-content-center margin-top-50">
          <button className="button-width-150 button-height border-radius-5 button-color-primary add-pr-button-font" onClick={this.handleOpen}>+ Add Session</button>
        </div>
      </div>
    );
  }
}
