import React from 'react';
import PropTypes from 'prop-types';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      filteredExercises: [],
      showSuggestions: false,
      exerciseSearch: '',
      isLoading: true,
      failed: false
    };
    this.onType = this.onType.bind(this);
    this.onSelection = this.onSelection.bind(this);
  }

  componentDidMount() {
    fetch('/api/exercise-list')
      .then(res => res.json())
      .then(exercises => this.setState({
        exercises,
        isLoading: false
      }))
      .catch(err => {
        this.setState({ isLoading: false, failed: true });
        console.error(err);
      });
  }

  onSelection() {
    this.props.selectedExercise(event.target.innerText);
    this.setState({
      filteredExercises: [],
      showSuggestions: false,
      exerciseSearch: event.target.innerText
    });
  }

  onType(event) {
    const exerciseSearch = event.target.value;
    const filteredExercises = this.state.exercises.filter(
      exercise => exercise.exercise.toLowerCase().indexOf(exerciseSearch.toLowerCase()) > -1
    );
    this.setState({
      filteredExercises,
      showSuggestions: true,
      exerciseSearch: event.target.value
    });
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
    const { showSuggestions, filteredExercises } = this.state;
    const value = this.state.exerciseSearch;
    let listSuggestions;
    if (showSuggestions && value) {
      if (filteredExercises.length) {
        listSuggestions = (
          <div>
            <ul className="suggestions">
              {filteredExercises.map(suggestion => {
                return (
                  <li key={suggestion.exerciseId} onClick={this.onSelection}>
                    {suggestion.exercise}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      } else {
        listSuggestions = (
          <div>
            <div className="no-suggestions">
              <p>No suggestions available</p>
            </div>
          </div>
        );
      }
    }

    return (
      <form onSubmit={this.props.addExercise}>
        <input type="text" onChange={this.onType} value={value} />
        <button className="button-width button-height border-radius-5 button-color-primary add-pr-button-font height-34" type="submit">Add</button>
        {listSuggestions}
      </form>
    );
  }
}

Search.propTypes = {
  suggestions: PropTypes.instanceOf(Array)
};
