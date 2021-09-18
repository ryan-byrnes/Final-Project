import React from 'react';
import PropTypes from 'prop-types';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      filteredExercises: [],
      showSuggestions: false,
      exerciseSearch: ''
    };
    this.onType = this.onType.bind(this);
    this.onSelection = this.onSelection.bind(this);
  }

  componentDidMount() {
    fetch('/api/exercise-list')
      .then(res => res.json())
      .then(exercises => this.setState({ exercises }));
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
        <button className="button-width button-height border-radius-5 button-color-primary add-pr-button-font height" type="submit">Add</button>
        {listSuggestions}
      </form>
    );
  }
}

Search.propTypes = {
  suggestions: PropTypes.instanceOf(Array)
};
