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
             this.props.updateQuery(e.target.value);
           }}
           />
       </div>
       )
   }
}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: "",
      results: []
    };

    this.updateQuery = this.updateQuery.bind(this);
  }

  updateQuery(newValue) {
    this.setState({query: newValue,
                   results: filterCountries(newValue) });
  }

  render() {
    return (
      <div className="app view">
        APP
        <Search query={this.state.query} updateQuery={this.updateQuery}/>
        <Results results={this.state.results}/>
      </div>
    );
  }
}
export default App;
