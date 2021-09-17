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
    const date = moment(this.state.startDate).format();
    const sessionDate = date.slice(0, 10);
    const response = await fetch(`/api/training/${sessionDate}`);
    const trainingSession = await response.json();
    this.setState({ trainingSession });
  }

  async componentDidUpdate(prevProps) {
    if (this.props.date !== prevProps.date) {
      await this.setState({
        startDate: this.props.date
      });
      const date = moment(this.state.startDate).format();
      const sessionDate = date.slice(0, 10);
      fetch(`/api/training/${sessionDate}`)
        .then(res => res.json())
        .then(trainingSession => {
          this.setState({ trainingSession });
        });
      // const date = moment(this.state.startDate).format();
      // const sessionDate = date.slice(0, 10);
      // const response = await fetch(`/api/training/${sessionDate}`);
      // const trainingSession = await response.json();
      // this.setState({ trainingSession });
    }
  }

  render() {
    const session = this.state.trainingSession;
    if (!session) {
      return null;
    }
    return (
      session.map(exercise => {
        return (
          <div className="row width-80 justify-content-center align-items-start border-bottom-lightgray training-log padding-top-10" key={exercise.exerciseId}>
              <div className="flex text-align-center">
                <h4 className="margin-top-0 font-weight-bold">{exercise.exercise}</h4>
              </div>
              <div className="flex">
                {exercise.sets.map((set, index) => {
                  return (
                    <div className="row width-100 justify-content-center" key={index}>
                      <div className="flex">
                        <h5 className="margin-top-0">{set.reps} reps</h5>
                      </div>
                      <div className="flex">
                        <h5 className="margin-top-0">{set.weight} lbs.</h5>
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
