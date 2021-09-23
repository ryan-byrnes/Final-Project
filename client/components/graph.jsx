import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default class PrGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prData: this.props.prData
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.prData !== this.state.prData) {
      this.setState({
        prData: this.props.prData
      });
    }
  }

  render() {
    if (this.state.prData.length > 0) {
      return (
    <div>
      <div className="row justify-content-center">
        <h2>{this.state.prData[0].exercise}</h2>
      </div>
      <LineChart width={800} height={300} data={this.state.prData} margin={{ top: 5, bottom: 5 }}>
        <Line type="monotone" dataKey="weight" stroke="#2451B7" activeDot={{ r: 6 }} strokeWidth={ 2 } />
        <CartesianGrid opacity={0.3} vertical={false} stroke="#ccc" />
        <XAxis dataKey="to_char" domain={['dataMin', 'dataMax + 1']} padding={{ right: 20 }} stroke="black" />
        <YAxis dataKey="weight" domain={[0, 'dataMax + 50']} stroke="black" />
            <Tooltip contentStyle={{ backgroundColor: '#2451B7', color: 'white', borderRadius: 5 }} itemStyle={{ color: 'white' }} />
      </LineChart>
    </div>
      );
    }
    return (
      <div>

      </div>
    );
  }
}
