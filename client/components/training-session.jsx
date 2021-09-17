import React from 'react';
import moment from 'moment';

export default class TrainingSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainingSession: [{
        exercise: 'Bench Press',
        exerciseId: 2,
        sets: [
          {
            reps: 5,
            weight: 200
          },
          {
            reps: 5,
            weight: 205
          }
        ]
      }],
      date: this.props.date
    };
  }

  // componentDidMount() {
  //   const date = moment(this.state.date).format();
  //   fetch(`/api/training/${date}`)
  //     .then(res => res.json())
  //     .then(trainingSession => {
  //       this.setState({
  //         trainingSession
  //       });
  //     });
  // }

  render() {
    const session = this.state.trainingSession;
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
