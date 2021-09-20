import React from 'react';

export default class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      prData: [],
      exerciseId: 1
    };
    this.getExerciseId = this.getExerciseId.bind(this);
  }

  componentDidMount() {
    fetch('/api/exercise-list')
      .then(res => res.json())
      .then(exercises => this.setState({ exercises }));
  }

  getExerciseId(event) {
    for (let i = 0; i < this.state.exercises.length; i++) {
      if (this.state.exercises[i].exercise === event.target.value) {
        const id = this.state.exercises[i].exerciseId;
        this.setState({
          exerciseId: id
        });
      }
    }
  }

  render() {
    return (
      <form>
        <select onChange={this.getExerciseId} name="prs">
          <option value="">Choose an Exercise</option>
          {this.state.exercises.map(exercise => {
            return (
              <option key={exercise.exerciseId}value={exercise.exercise}>{exercise.exercise}</option>
            );
          })}
        </select>
      </form>
    );
  }
}
