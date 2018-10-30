import React, {Component} from 'react';
import State from './State.js';

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
       State.get("results").map((result) => {
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
       value={State.get("query")}
       onChange={(e) => {
         State.updateQuery(e.target.value);
       }}
     />
   </div>
 )
}

const App = () => {
  return (
    <div className="app view">
      APP
      <Search />
      <Results />
    </div>
  );
}

export default App;
