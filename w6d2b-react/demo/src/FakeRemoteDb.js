const db = [
  {id: 1, name: "Canada"},
  {id: 2, name: "Poland"},
  {id: 3, name: "Brazil"},
  {id: 4, name: "Korea"},
  {id: 5, name: "Zimbabwe"},
  {id: 6, name: "China"},
  {id: 7, name: "Japan"},
  {id: 8, name: "Taiwan"},
  {id: 9, name: "Americuh!"}
]

const countriesStartingWith = function(query) {
  if(query.length > 0) {
    return db.filter(function(country) {
      return country.name.match(new RegExp("^"+query))
    });
  } else {
    return [];
  }
}

const FakeRemoteDb = {};

FakeRemoteDb.query = (query, callback) => {
	setTimeout(() => {
  	callback(countriesStartingWith(query))
  }, 500);

  return true;
}

export default FakeRemoteDb;