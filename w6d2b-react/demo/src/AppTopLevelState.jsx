import React, {Component} from 'react';
import FakeRemoteDb from './FakeRemoteDb.js'

const Result = ({content}) => {
 return (
   <div className="result view">
     RESULT
     {content}
   </div>
  )
}

const Results = ({results}) => {
  return (
    <div className="results view">
     RESULTS
     {
       results.map((result) => {
          return (
            <Result content={result.name} key={result.id}/>
          )
       })
     }
    </div>
  )
}


const Search = ({query, tx}) => {
 return (
   <div className="search view">
     SEARCH

     <input
       value={query}
       onChange={(e) => {
         tx.onSearch(e.target.value);
       }}
     />
   </div>
 )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: []
    }

    // since all state is in App
    // we create this object that contains all functions to change state
    // this helps avoid passing multiple functions as props
    this.tx = {
      _updateQuery: (newValue) => {
        this.setState({query: newValue});
      },
      _updateResults: (newResults) => {
        this.setState({results: newResults});
      },
      onSearch: (query) => {
        this.tx._updateQuery(query);
        FakeRemoteDb.query(query, (results) => {
          this.tx._updateResults(results);
        })
      }
    }

  } 

  render() {
    return (
      <div className="app view">
        APP
        <Search query={this.state.query}
                tx={this.tx}/>
        <Results results={this.state.results}/>
      </div>
    );
  }
}

export default App;
