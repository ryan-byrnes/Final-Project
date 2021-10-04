import React from 'react';
import moment from 'moment';

export default class TrainingSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainingSession: [],
      startDate: this.props.date
    };
  }

  async componentDidMount() {
    const sessionDate = moment(this.state.startDate).format('LL');
    const response = await fetch(`/api/training/${sessionDate}`);
    const trainingSession = await response.json();
    this.setState({ trainingSession });
  }

  componentDidUpdate(prevProps) {
    if (this.props.date !== this.state.startDate) {
      const sessionDate = moment(this.props.date).format('LL');
      fetch(`/api/training/${sessionDate}`)
        .then(res => res.json())
        .then(trainingSession => {
          this.setState({
            trainingSession,
            startDate: this.props.date
          });
        });
    }
  }

  render() {
    if (this.state.trainingSession.length < 1) {
      return (
        <div className="row justify-content-center">
          <p className="font-size-20 color-gray font-style-italic">No Training Session Recorded</p>
        </div>
      );
    } else {
      const session = this.state.trainingSession;
      return (
        session.map((exercise, index) => {
          return (
          <div className="row width-80 justify-content-center align-items-start border-bottom-lightgray training-log padding-top-10" key={exercise.exerciseId}>
              <div className="flex-basis-40 text-align-center">
                <h4 className="margin-top-0 font-weight-bold font-size-10">{index + 1}. {exercise.exercise}</h4>
              </div>
              <div className="flex-basis-40">
                {exercise.sets.map((set, index) => {
                  return (
                    <div className="row width-100 justify-content-center" key={index}>
                      <div className="flex-basis-40">
                        <h5 className="margin-top-0 font-size-10">{set.reps} reps</h5>
                      </div>
                      <div className="flex-basis-40">
                        <h5 className="margin-top-0 font-size-10">{set.weight} lbs.</h5>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      );
    }
  }
}
