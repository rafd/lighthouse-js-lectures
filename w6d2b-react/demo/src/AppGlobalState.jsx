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
       State.getResults().map((result) => {
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
       value={State.getQuery()}
       onChange={(e) => {
         State.onSearch(e.target.value);
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
