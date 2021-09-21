import React from 'react';
import Search from '../components/search-bar';

export default class PrPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prs: [],
      userId: 1,
      exerciseId: 1
    };
    this.updateNewPr = this.updateNewPr.bind(this);
    this.exerciseIdSelected = this.exerciseIdSelected.bind(this);
  }

  componentDidMount() {
    fetch(`/api/pr/${this.state.userId}`)
      .then(res => res.json())
      .then(prs => this.setState({ prs }));
  }

  updateNewPr(pr) {
    this.setState({
      prs: pr
    });
  }

  exerciseIdSelected(id) {
    this.setState({
      exerciseId: id
    });
  }

  render() {
    if (!this.state.prs.length) {
      return (
        <div>
          <AddPrModal exerciseIdSelected={this.exerciseIdSelected} updateNewPr={this.updateNewPr} userId={this.state.userId} prs={this.state.prs} />
        </div>
      );
    }
    return (
    <div className="container">
      <div>
        <div className="row justify-content-center">
            <h1 className="font-weight-bold border-bottom-black">Personal Records</h1>
        </div>
        {
          this.state.prs.map(pr => (
            <div className="prs" key={pr.prId}>
              <Pr pr={pr}/>
            </div>
          ))
        }
      </div>
      <div>
          <AddPrModal exerciseIdSelected={this.exerciseIdSelected} updateNewPr={this.updateNewPr} userId={this.state.userId} prs={this.state.prs} />
      </div>
    </div>
    );
  }
}

class AddPrModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.addExercise = this.addExercise.bind(this);
    this.submitPR = this.submitPR.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.exerciseSelected = this.exerciseSelected.bind(this);
    this.state = {
      isOpen: false,
      exercises: [],
      prs: this.props.prs,
      filteredExercises: [],
      activeSuggestions: 0,
      showSuggestions: false,
      nextExercise: '',
      selectedExercise: '',
      userId: this.props.userId,
      exerciseId: 1,
      reps: '',
      weight: '',
      date: new Date()
    };
  }

  componentDidMount() {
    fetch('/api/exercise-list')
      .then(res => res.json())
      .then(exercises => this.setState({ exercises }));
  }

  handleOpen() {
    this.setState({ isOpen: true });
  }

  exerciseSelected(exercise) {
    this.setState({
      selectedExercise: exercise
    });
  }

  handleClose() {
    this.setState({
      isOpen: false,
      nextExercise: ''
    });
  }

  addExercise() {
    event.preventDefault();
    for (let i = 0; i < this.state.exercises.length; i++) {
      if (this.state.selectedExercise === this.state.exercises[i].exercise) {
        this.setState({
          exerciseId: this.state.exercises[i].exerciseId
        });
      }
    }
    this.setState({
      nextExercise: this.state.selectedExercise,
      selectedExercise: ''
    });
  }

  submitPR(event) {
    event.preventDefault();
    const { userId, exerciseId, reps, weight, nextExercise, date } = this.state;
    fetch('/api/pr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userId,
        exerciseId: exerciseId,
        reps: reps,
        weight: weight,
        date: date,
        exercise: nextExercise
      })
    })
      .then(res => res.json())
      .then(data => {
        data.exercise = nextExercise;
        for (let i = 0; i < this.props.prs.length; i++) {
          if (this.props.prs[i].exercise === data.exercise) {
            const array = [...this.props.prs.slice(0, i), ...this.props.prs.slice(i + 1)];
            const updatedArray = array.concat(data);
            this.props.updateNewPr(updatedArray);
            this.setState({
              isOpen: false,
              nextExercise: ''
            });
            return;
          }
        }
        const updatedPrArray = this.state.prs.concat(data);
        this.props.updateNewPr(updatedPrArray);
        this.setState({
          prs: updatedPrArray,
          isOpen: false,
          nextExercise: ''
        });
      });
  }

  handleChange() {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value
    });
  }

  render() {
    if (!this.state.isOpen) {
      return (
        <div className="row justify-content-center margin-top-50">
          <button className="button-width button-height border-radius-5 button-color-primary add-pr-button-font" onClick={this.handleOpen}>+ Add PR</button>
        </div>
      );
    }
    if (this.state.nextExercise.length > 0) {
      return (
        <div>
          <div className="row justify-content-center">
            <button className="button-width button-height border-radius-5 button-color-primary add-pr-button-font">+ Add PR</button>
          </div>
          <div className="modal">
            <div className="modal-content position-relative overflow-scroll">
              <h1>Add PR</h1>
              <Search exerciseSearch={this.exerciseSearch} selectedExercise={this.exerciseSelected} state={this.state} onType={this.onType} click={this.onClick} addExercise={this.addExercise} />
              <div className="row">
                <form onSubmit={this.submitPR}>
                  <div className="row">
                    <h3 className="margin-bottom-5">{this.state.nextExercise}</h3>
                  </div>
                  <div className="row justify-content-center">
                    <div className="column-half margin-right-10">
                      <h5>Number of Reps (RM)</h5>
                      <input className="input-width" type="text" name="reps" onChange={this.handleChange}></input>
                    </div>
                    <div className="column-half">
                      <h5>Weight (lbs)</h5>
                      <input className="input-width" type="text" name="weight" onChange={this.handleChange}></input>
                    </div>
                  </div>
                  <div className="margin-top-10">
                    <button className="button-width button-height border-radius-5 button-color-primary add-pr-button-font" type="submit">Submit PR</button>
                  </div>
                </form>
              </div>
              <div>
                <a className="color-red position-absolute close-size" onClick={this.handleClose}><i className="fas fa-times"></i></a>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="row justify-content-center">
          <button className="button-width button-height border-radius-5 button-color-primary add-pr-button-font">+ Add PR</button>
        </div>
        <div className="modal">
          <div className="modal-content position-relative overflow-scroll">
            <h1>Add PR</h1>
            <Search exerciseSearch={this.exerciseSearch} selectedExercise={this.exerciseSelected} state={this.state} onType={this.onType} click={this.onClick} addExercise={this.addExercise} />
            <div>
              <a className="color-red position-absolute close-size" onClick={this.handleClose}><i className="fas fa-times"></i></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function Pr(props) {
  const { exercise, reps, weight } = props.pr;
  return (
    <div className="row justify-content-center container-list">
      <div className="column-15 border-bottom-lightgray padding-left-10">
        <h3 className="font-weight-bold">{ exercise }</h3>
      </div>
      <div className="flex-basis border-bottom-lightgray">
        <h3 className="font-weight-bold">{ reps } RM:</h3>
      </div>
      <div className="flex-basis border-bottom-lightgray">
        <h3>{weight} lbs</h3>
      </div>
    </div>
  );
}
