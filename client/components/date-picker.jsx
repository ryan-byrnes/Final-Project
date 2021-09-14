import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Example() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="row justify-content-center">
      <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
    </div>
  );
}
