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

const state = {
  query: "",
  results: []
};

export default {

  get: (k) => {
    return state[k];
  },

  updateQuery: (newQuery) => {
    state.query = newQuery;
    state.results = filterCountries(newQuery);
    window.render();
  }
}

