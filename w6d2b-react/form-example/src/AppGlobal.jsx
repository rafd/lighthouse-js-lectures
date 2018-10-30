import React, {Component} from 'react';

/* Global State Stuff
 *   should be in a seperate file */

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

const globalState = {
  query: "",
  results: []
};

window.updateQuery = (newQuery) => {
  globalState.query = newQuery;
  globalState.results = filterCountries(newQuery);
  window.render();
}

/* React Components
 *   could be better organized in seperate files
 * */

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
           this.props.results.map(function(result){
              return (
                <Result content={result} />
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
           value={this.props.query}
           onChange={(e) => {
             updateQuery(e.target.value);
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
        <Search query={globalState.query}/>
        <Results results={globalState.results}/>
      </div>
    );
  }
}

export default App;
