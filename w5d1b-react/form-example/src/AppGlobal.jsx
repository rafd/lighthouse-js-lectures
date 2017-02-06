import React, {Component} from 'react';

const countries = [
  "Canada",
  "Poland",
  "Brazil",
  "Korea",
  "Zimbabwe",
  "China",
  "Japan",
  "Taiwan",
  "Americuh!"
]

const filterCountries = function(query) {
  if(query.length > 0) {
    return countries.filter(function(country) {
      return country.match(new RegExp(query))
    });
  } else {
    return [];
  }
}


/* Global State Stuff
 *   should be in a seperate file */

window.state = {
  query: "",
  results: []
}

const setState = (newState) => {
  // merges old state with newState
  Object.assign(state, newState)
  // triggers re-render of entire UI
  window.render();
}


/* Transactions
 *  our app's events that change the state
 *  called inside of components
 */

window.tx = {};

tx.updateQuery = (newQuery) => {
  setState({query: newQuery,
            results: filterCountries(newQuery)});
}

tx.selectResult = (result) => {
  setState({query: result,
            results: []});
}

/* React Components
 *   could be better organized in seperate files
 * */

class Result extends Component {
   render() {
     return (
       <div className="result view" onClick={() => { tx.selectResult(this.props.content) }}>
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
           state.results.map(function(result){
              return (
                <Result key={result} content={result} />
              )
           })
         }
       </div>
     )
   }
}

class Search extends Component {
   render() {
     return (
       <div className="search view">
         SEARCH
         <input
           value={state.query}
           onChange={(e) => {
             tx.updateQuery(e.target.value);
           }}
         />
       </div>
     )
   }
}

class App extends Component {
  render() {
    return (
      <div className="app view">
        APP
        <Search/>
        <Results/>
      </div>
    );
  }
}

export default App;
