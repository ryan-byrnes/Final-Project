import React from 'react';
import Search from './search-bar';

export default class TrainingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      selectedExercise: '',
      nextExercise: '',
      exerciseId: this.props.exerciseId,
      isOpen: this.props.isOpen,
      startDate: this.props.date,
      isLoading: true
    };
    this.addExercise = this.addExercise.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.exerciseSelected = this.exerciseSelected.bind(this);
  }

  componentDidMount() {
    fetch('/api/exercise-list')
      .then(res => res.json())
      .then(exercises => this.setState({
        exercises,
        isLoading: false
      }));
  }

  addExercise() {
    event.preventDefault();
    for (let i = 0; i < this.state.exercises.length; i++) {
      if (this.state.selectedExercise === this.state.exercises[i].exercise) {
        const id = this.state.exercises[i].exerciseId;
        this.props.getExerciseId(id);
      }
    }
    this.setState({
      nextExercise: this.state.selectedExercise,
      selectedExercise: ''
    });
  }

  handleChange(index, event) {
    const setCopy = this.props.newSet.slice(0);
    const exerciseCopy = Object.assign({}, setCopy[index]);
    exerciseCopy[event.target.name] = event.target.value;
    setCopy[index] = exerciseCopy;
    this.props.setInfo(setCopy);
  }

  exerciseSelected(exercise) {
    this.setState({
      selectedExercise: exercise
    });
  }

  render() {
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
    if (this.state.nextExercise.length > 0) {
      return (
          <div className="modal">
            <div className="modal-content position-relative overflow-scroll">
              <h1>Add Exercise</h1>
              <Search selectedExercise={this.exerciseSelected} addExercise={this.addExercise} />
              <div className="row">
                <form onSubmit={this.props.submitExercise}>
                  <div className="row">
                    <h3 className="margin-bottom-5">{this.state.nextExercise}</h3>
                  </div>
                  {this.props.sets.map((element, index) => (
                  <div className="row justify-content-center align-items-flex-end" key={index}>
                    <div className="flex-basis-40 flex-basis-65 flex-basis-60 flex-basis-75 margin-right-10">
                      <h5>Number of Reps (RM)</h5>
                      <input className="input-width" type="text" name="reps" onChange={event => this.handleChange(index, event)}></input>
                    </div>
                    <div className="flex-basis-40 flex-basis-65 flex-basis-60 flex-basis-75">
                      <h5>Weight (lbs)</h5>
                      <input className="input-width" type="text" name="weight" onChange={event => this.handleChange(index, event)}></input>
                      <div className="row justify-content-end margin-top-10">
                        <div className="row">
                            {
                              index > 0 &&
                              <div className="margin-right-10">
                                <button className="remove-set-button font-weight-bold" type="button" onClick={() => this.props.removeSet(index)}>Remove Set</button>
                              </div>
                            }
                            <button className="add-set-button font-weight-bold" type="button" onClick={() => this.props.addSet({ reps: '', weight: '' })}>Add Set</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  ))}
                  <div className="margin-top-10">
                    <button type="submit" className="button-width-150 button-height border-radius-5 button-color-primary add-pr-button-font">Submit Exercise</button>
                  </div>
                </form>
              </div>
              <div>
              <a className="color-red position-absolute close-size" onClick={this.props.handleClose}><i className="fas fa-times"></i></a>
              </div>
            </div>
          </div>
      );
    }
    return (
        <div className="modal">
          <div className="modal-content position-relative">
            <h1>Add Exercise</h1>
          <Search selectedExercise={this.exerciseSelected} addExercise={this.addExercise} />
            <div>
            <a className="color-red position-absolute close-size" onClick={this.props.handleClose}><i className="fas fa-times"></i></a>
            </div>
          </div>
        </div>
    );
  }
}
