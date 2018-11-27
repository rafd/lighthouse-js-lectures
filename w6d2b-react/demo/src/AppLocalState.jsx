import React, {Component} from 'react';
import FakeRemoteDb from './FakeRemoteDb.js'

class Result extends Component {
   render() {
     return (
       <div className="result view">
         RESULT
         {this.props.content}
       </div>
      )
   }
}

class Results extends Component {
   render() {
     return (
       <div className="results view">
         RESULTS
         {
           this.props.results.map((result) => {
              return (
                <Result content={result.name} key={result.id}/>
              )
           })
         }
       </div>
       )
   }
}

class Search extends Component {
   constructor (props) {
     super(props);
     this.state = {
       query: ""
     };
   }

   handleInput = (e) => {
     this.setState({query: e.target.value});
     FakeRemoteDb.query(e.target.value, (results) =>
      this.props.updateResults(results))
   }

   render() {
     return (
       <div className="search view">
         SEARCH
         <input value={this.state.query}
                onChange={this.handleInput} />
       </div>
      )
   }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  updateResults = (results) => {
    this.setState({results: results});
  }

  render() {
    return (
      <div className="app view">
        APP
        <Search updateResults={this.updateResults}/>
        <Results results={this.state.results}/>
      </div>
    );
  }
}

export default App;
