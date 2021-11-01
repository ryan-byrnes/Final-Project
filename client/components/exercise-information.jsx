import React from 'react';

export default class ExerciseInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercise: this.props.exercise
    };
  }

  render() {
    return (
      <div className="modal">
        <div className="modal-content position-relative overflow-scroll">
          <h1 className="margin-top-10 margin-bottom-10">{this.state.exercise}</h1>
          <a className="color-red position-absolute close-size" onClick={this.props.handleClose}><i className="fas fa-times"></i></a>
        </div>
      </div>
    );
  }
}
