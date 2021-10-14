import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default class PrGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prData: this.props.prData,
      showGraph: this.props.showGraph
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.prData !== this.state.prData) {
      this.setState({
        prData: this.props.prData,
        showGraph: this.props.showGraph
      });
    }
  }

  render() {
    if (this.state.prData.length > 0) {
      return (
    <div className="width-100 row flex-direction-column align-items-center">
      <div className="row justify-content-center">
        <h2>{this.state.prData[0].exercise}</h2>
      </div>
      <ResponsiveContainer width="75%" height={300}>
        <LineChart data={this.state.prData} margin={{ top: 5, bottom: 5 }}>
          <Line type="monotone" dataKey="weight" stroke="#2451B7" activeDot={{ r: 6 }} strokeWidth={ 2 } />
          <CartesianGrid opacity={0.3} vertical={false} stroke="#ccc" />
          <XAxis dataKey="to_char" domain={['dataMin', 'dataMax + 1']} padding={{ right: 20 }} stroke="black" />
          <YAxis width={36} dataKey="weight" domain={[0, 'dataMax + 50']} stroke="black" />
              <Tooltip contentStyle={{ backgroundColor: '#2451B7', color: 'white', borderRadius: 5 }} itemStyle={{ color: 'white' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
      );
    } else if (this.state.showGraph) {
      return (
      <div>
        <p className="font-size-medium color-gray font-style-italic">No Personal Records recorded for this exercise</p>
      </div>
      );
    } else {
      return (
        <p className="font-size-medium color-gray font-style-italic">Select an Exercise to Begin</p>
      );
    }
  }
}
