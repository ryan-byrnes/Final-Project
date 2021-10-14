import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.props.date
    };
  }

  render() {
    return (
    <div className="row justify-content-center">
      <DatePicker className="font-weight-bold date-input font-size-medium" selected={ this.props.date } onChange={ this.props.handleChange } name="startDate" dateFormat="MM/dd/yyyy" />
    </div>

    );
  }
}
