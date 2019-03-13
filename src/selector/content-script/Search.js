import * as React from 'react';
import './Search.css';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: props.initialQuery ? props.initialQuery : '',
    };
  }

  handleChange = (event) => {
    this.setState({
      query: event.currentTarget.value
    });
  }

  render() {
    return (
      <div className="Search">
        <div className="bar">
          <input
            type="search"
            placeholder="Search the blah"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
