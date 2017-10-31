// what does this code log?

var x = 0;

console.log('A: ', x);

function increment(i) {
  console.log('B: ', i);
  i = i + 1;
  console.log('C: ', i);
}

console.log('D: ', x);

increment(x);
increment(x);

console.log('E: ', x);
