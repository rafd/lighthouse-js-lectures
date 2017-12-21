// problem: 
// want to roll die 3 times and get average
// but... rolling is async and takes some time (also, occasionally errors)
// (similar to say: a db request, http request, etc.)


// first, some helper functions

function roll(sides) {
  return Math.floor(Math.random()*sides)+1;
}


function rollAsync(sides, callback) {
  setTimeout(() => {
    if(Math.random() < 0.1) {
      callback(new Error("The Die Exploded"))
    } else {
      callback(null, roll(sides));
    }
  }, 2000+Math.random()*100);
}

function average(vec) {
  return vec.reduce((memo,x) => { return memo + x / vec.length }, 0);
}


// solution 1: nested callbacks 
// in series:  |-----|-----|-----| 

console.time('v1')

rollAsync(10, (err, result1) => {
  rollAsync(15, (err, result2) => {
    rollAsync(20, (err, result3) => {
      console.log(average([result1,result2,result3]));
      console.timeEnd('v1')
    });
  });
});


// solution 2: callback w/ accumulator variable 
// in parallel:  |-----|
//               |-----|
//               |-----| 


console.time('v2')

var results = [];
function handleResult(err, result) {
  results.push(result);
  if(results.length == 3){
    console.log(average(results));
    console.timeEnd('v2');
  }
}

rollAsync(10, handleResult);
rollAsync(15, handleResult);
rollAsync(20, handleResult);


// promises

// first, we can wrap our async function with a function that returns a promise

function rollAsyncPromise (sides) {
  return new Promise((resolve, reject) => {
      return rollAsync(sides, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
  });
};


// solution 3: promises (one after the other)
// in series:  |-----|-----|-----| 

console.time('v3')

var results = [];

rollAsyncPromise(10)
  .then((result) => {
    results.push(result);
    return rollAsyncPromise(15)
  }).then((result) => {
    results.push(result);
    return rollAsyncPromise(20)
  }).then((result) => {
    results.push(result);
    return results;
  }).then((results) => {
    console.log(average(results));
    console.timeEnd('v1');
  }).catch((error) => {
    console.log(error);
  });


// solution 4: promises in parallel
// in parallel:  |-----|
//               |-----|
//               |-----| 

console.time('v4')

Promise.all([rollAsyncPromise(10), 
             rollAsyncPromise(15), 
             rollAsyncPromise(20)])
    .then((results) => {
       console.log(average(results));
       console.timeEnd('v4');
    })
    .catch((error) => {
      console.log(error);
    });