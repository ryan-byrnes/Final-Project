import React from 'react';

export default class ExerciseInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseName: this.props.exercise,
      exerciseVideo: this.props.video,
      exerciseDescription: this.props.description
    };
  }

  render() {
    const length = this.state.exerciseVideo.length;
    const videoImage = this.state.exerciseVideo.slice(length - 11);
    return (
      <div className="modal">
        <div className="modal-content position-relative overflow-scroll">
          <h1 className="margin-top-10 margin-bottom-10">{this.state.exerciseName}</h1>
          <iframe className="margin-top-10 margin-bottom-10 border-radius-5" width="455" height="255" srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${this.state.exerciseVideo}/?autoplay=1&start=4><img src=https://img.youtube.com/vi/${videoImage}/hqdefault.jpg alt='Back Squat'><span>▶</span></a>`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <a className="color-red position-absolute close-size" onClick={this.props.handleClose}><i className="fas fa-times"></i></a>
          <div className="row">
            <h4>{this.state.exerciseDescription}</h4>
          </div>
        </div>
      </div>
    );
  }
}
