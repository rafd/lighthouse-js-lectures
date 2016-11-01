import React, {Component} from 'react';

// V1. INLINE FUNCTIONS

class App2 extends Component {
  state = {query: "",
           provinces: ["Alberta", "Ontario", "British Columbia", "Quebec",
                       "Nova Scotia", "New Brunswick", "Manitoba", "Prince Edward Island",
                       "Saskatchewan", "Newfoundland and Labrador",
                       "Northwest Territories", "Yukon", "Nunavut"]}
  render() {
    return (
      <div>
        <input value={this.state.query}
               onChange={function(e) {
                 this.setState({query: e.target.value});
               }.bind(this)}/>
        <div>
          {this.state.provinces
            .filter(function(p) {
              return p.toLowerCase().match(new RegExp(query.toLowerCase()))
               }.bind(this))
            .map(function(p) {
               return (<div key={p}>{p}</div>)
            })}
        </div>
      </div>
    );
  }
}

// V2. FUNCTIONS AS METHODS ON THE COMPONENT:

class App extends Component {
  state = {query: "",
           provinces: ["Alberta", "Ontario", "British Columbia", "Quebec",
                       "Nova Scotia", "New Brunswick", "Manitoba", "Prince Edward Island",
                       "Saskatchewan", "Newfoundland and Labrador",
                       "Northwest Territories", "Yukon", "Nunavut"]}

  constructor(props) {
    super(props);
    this.updateQuery = this.updateQuery.bind(this);
  }

  updateQuery(e) {
    this.setState({query: e.target.value});
  }

  getFilteredProvinces() {
    const regex = new RegExp(this.state.query.toLowerCase());
    return this.state.provinces.filter(function(p) { return p.toLowerCase().match(regex) })
  }

  render() {
    return (
      <div>
        <input value={this.state.query}
               onChange={this.updateQuery}/>
        <div>
          {
            this.getFilteredProvinces().map(function(p) {
               return (
                   <div key={p}>{p}</div>
               )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
