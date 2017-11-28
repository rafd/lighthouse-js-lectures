/*
  Write a node program that takes in an
  unlimited number of command line arguments,
  goes through each and prints out the sum of 
  them. If any argument is not a whole number, 
  skip it. Do support negative numbers though.

  node sum.js 2 4 6 blah 1.0 -10
  2
*/

function isWholeNumber(x) {
	return x % 1 === 0;
}

// ignore first two values from input
var inputs = process.argv.splice(2);

var sum = 0;

for(var i = 0; i < inputs.length; i++) {
  if (isWholeNumber(inputs[i])) {
    sum += Number(inputs[i]);
	}
}

console.log(sum);