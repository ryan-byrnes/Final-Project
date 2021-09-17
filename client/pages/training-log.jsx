import React from 'react';
import TrainingModal from '../components/modal';
import Calendar from '../components/date-picker';

export default class TrainingLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center margin-top-50">
          <Calendar date={this.state.startDate} handleChange={this.handleChange} />
        </div>
        <div className="rrow justify-content-center">
          <TrainingModal userId={this.state.userId} date={this.state.startDate} />
        </div>
      </div>
    );
  }
}
