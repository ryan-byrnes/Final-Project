import React from 'react';
import PropTypes from 'prop-types';

export default class Search extends React.Component {

  render() {
    const { showSuggestions, userInput, filteredExercises } = this.props.state;
    let listSuggestions;
    if (showSuggestions && userInput) {
      if (filteredExercises.length) {
        listSuggestions = (
          <div>
            <ul className="suggestions">
              {filteredExercises.map(suggestion => {
                return (
                  <li key={suggestion.exerciseId} onClick={this.props.click}>
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
        <input type="text" onChange={this.props.onType} value={userInput} />
        <button className="button-width button-height border-radius-5 button-color-primary add-pr-button-font height" type="submit">Add</button>
        {listSuggestions}
      </form>
    );
  }
}

Search.propTypes = {
  suggestions: PropTypes.instanceOf(Array)
};
