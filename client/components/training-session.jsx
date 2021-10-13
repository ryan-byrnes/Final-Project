import React from 'react';
import moment from 'moment';

export default class TrainingSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainingSession: [],
      startDate: this.props.date,
      isLoading: true,
      failed: false
    };
  }

  componentDidMount() {
    const sessionDate = moment(this.state.startDate).format('LL');
    fetch(`/api/training/${sessionDate}`)
      .then(res => res.json())
      .then(trainingSession => {
        this.setState({
          trainingSession,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({ isLoading: false, failed: true });
        console.error(err);
      });
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
    if (this.state.failed) {
      return (
        <div className="row justify-content-center">
          <p className="font-size-20 color-red font-style-italic">Network Error! Please check your internet connection.</p>
        </div>
      );
    }
    if (this.state.isLoading) {
      return (
        <div className="lds-spinner spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
    }
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
          <div className="row justify-content-center align-items-start border-bottom-lightgray training-log padding-top-10" key={exercise.exerciseId}>
              <div className="margin-left-2rem text-align-center">
                <h4 className="margin-top-0 font-weight-bold font-size-10 padding-right-20">{index + 1}. {exercise.exercise}</h4>
              </div>
              <div className="">
                {exercise.sets.map((set, index) => {
                  return (
                    <div className="row width-100 justify-content-center" key={index}>
                      <div className="margin-left-rem">
                        <h5 className="margin-top-0 font-size-10 margin-left-rem">{set.reps} reps</h5>
                      </div>
                      <div className="margin-right-rem margin-left-rem">
                        <h5 className="margin-top-0 font-size-10 margin-left-rem">{set.weight} lbs.</h5>
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
