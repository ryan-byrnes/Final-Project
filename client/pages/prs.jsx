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
    fetch(`/api/pr/${this.state.userId}`)
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
      <div>
        <AddPrModal />
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
    this.state = {
      isOpen: false
    };
  }

  handleOpen() {
    this.setState({ isOpen: true });
  }

  handleClose() {
    this.setState({
      isOpen: false
    });
  }

  render() {
    if (!this.state.isOpen) {
      return (
        <div>
          <button onClick={this.handleOpen}>+ Add PR</button>
        </div>
      );
    }
    return (
      <div>
        <a href="">+ Add PR</a>
        <div className="modal">
          <div className="modal-content">
            <h1>Hello</h1>
            <button onClick={this.handleClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }
}

function Pr(props) {
  const { exercise, reps, weight } = props.pr;
  return (
    <div className="row">
      <h3>{ exercise }</h3>
      <h5>{ reps } RM</h5>
      <h5>{weight}</h5>
    </div>
  );
}
