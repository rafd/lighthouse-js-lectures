import React from 'react';
import {state, tx} from './State.js';

/* React Components
 *   could be better organized in seperate files
 * */

function Result(props) {
   return (
     <div className="result" onClick={() => { tx.selectResult(props.content) }}>
       {props.content}
     </div>
    )
}

function Results() {
   return (
     <div className="results">
       {
         state.results.map((result) => {
            return (
              <Result key={result} content={result} />
            )
         })
       }
     </div>
   )
}

function Search() {
   return (
     <div className="search">
       <input
         value={state.query}
         onChange={(e) => {
           tx.updateQuery(e.target.value);
         }}
       />
     </div>
   )
}

function App() {
  return (
    <div className="app">
      <Search/>
      <Results/>
    </div>
  );
}

export default App;
