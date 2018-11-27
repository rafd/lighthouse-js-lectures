import FakeRemoteDb from './FakeRemoteDb.js'

let actualState = {
  query: "",
  results: []
};

const set = (newPartialState) => {
  actualState = {...actualState, ...newPartialState};
  window.render();
}



const State = {

  // GETTERS

  getQuery: () => {
    return actualState.query;
  },

  getResults: () => {
    return actualState.results;
  },

  // SETTERS

  onSearch: (newQuery) => {
    set({query: newQuery});
    
    FakeRemoteDb.query(newQuery, (results) => {
      set({results: results});
    });
  }
}

export default State;