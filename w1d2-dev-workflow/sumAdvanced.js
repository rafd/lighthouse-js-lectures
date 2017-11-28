// this is an alternative solution
// it is just as "right" / "correct" as the other
// some devs would consider this solution "simpler", but others not
// this solution does rely on some syntax that you don't have experience with, so don't worry if you don't understand

function isWholeNumber(x) {
  return x % 1 === 0;
}

var out = process.argv
           .slice(2)
           .map(Number)
           .filter(isWholeNumber)
           .reduce(function(sum, x) { return sum + x }, 0)
 
console.log(out)
