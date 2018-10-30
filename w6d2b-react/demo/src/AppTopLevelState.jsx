import React, {Component} from 'react';

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
            <Result content={result} key={result}/>
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
         tx.updateQuery(e.target.value);
       }}
     />
   </div>
 )
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
      query: "",
      results: []
    }

    const filterCountries = (query) => {
      if(query.length > 0) {
        return this.state.countries.filter((country) => {
          return country.match(new RegExp(query))
        });
      } else {
        return [];
      }
    }

    this.tx = {
      updateQuery: (newValue) => {
        this.setState({query: newValue,
                       results: filterCountries(newValue) });
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
