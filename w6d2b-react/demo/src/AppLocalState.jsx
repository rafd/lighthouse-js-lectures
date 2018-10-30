import React, {Component} from 'react';


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
                <Result content={result}
                        key={result}/>
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
   render() {
     return (
       <div className="search view">
         SEARCH
         <input
           value={this.state.query}
           onChange={(e) => {
             this.setState({query: e.target.value});
             this.props.updateResults(e.target.value);
           }}
           />
       </div>
       )
   }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [
        "Canada",
        "Poland",
        "Brazil",
        "Korea",
        "Zimbabwe",
        "China",
        "Japan",
        "Taiwan",
        "Americuh!"
      ],
      results: []
    };

    const filterCountries = (countries, query) => {
      if(query.length > 0) {
        return countries.filter((country) => {
          return country.match(new RegExp(query))
        });
      } else {
        return [];
      }
    }

    this.updateResults = (query) => {
      this.setState({results: filterCountries(this.state.countries, query)});
    }
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
