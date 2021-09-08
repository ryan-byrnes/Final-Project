import React from 'react';

export default class PrPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prs: [],
      userId: 1
    };
  }

  componentDidMount() {
    fetch(`/api/pr/:${this.state.userId}`)
      .then(res => res.json())
      .then(prs => this.setState({ prs }));
  }

  render() {
    return (
    <div className="container">
      <div className="row">
        {
          this.state.prs.map(pr => (
            <div key={pr.prId}>
              <Pr pr={pr}/>
            </div>
          ))
        }
      </div>
    </div>
    );
  }
}

function Pr(props) {
  const { exercise, reps, weight } = props.pr;
  return (
    <span>
      <h3>{ exercise }</h3>
      <h5>{ reps } RM</h5>
      <h5>{ weight }</h5>
    </span>
  );
}
