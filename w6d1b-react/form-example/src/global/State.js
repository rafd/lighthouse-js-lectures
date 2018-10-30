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

let state = {
  query: "",
  results: []
}

let listeners = [];

const setState = (newState) => {
  // merges old state with newState
  Object.assign(state, newState)
  // triggers re-render of entire UI
  listeners.forEach((listener) => {
    listener();
  })
}

const addStateListener = (callback) => {
  listeners.push(callback);
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

export { state, tx, addStateListener };
