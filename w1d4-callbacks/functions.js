// functions

// plain ol' function

function bakeACake() {
  console.log("mix ingredients")
  console.log("put in oven")
  console.log("wait 1 hr")
}

bakeACake()


// function that takes data

function bakeACake(type) {
  if(type == "Black Forest") {
    console.log("mix ingredients")
    console.log("put in oven")
    console.log("wait 1 hr")
    return "yummy-cake"
  } else if (type == "cheesecake") {
    // ....
    return "cake"
  }
}

var myCake1 = bakeACake("cheesecake")
var myCake2 = bakeACake("cheesecake")
var myCake3 = bakeACake("Black Forest")


// functions are objects, like numbers and strings, etc.
// they can be passed around



// function that receives a function
// and calls it multiple times

function map(list, f) {
  var out = [];
  for(var i = 0; i < list.length; i++) {
    out.push(f(list[i]))
  }
  return out;
}


// we can use map() with different input functions

// ex. to multiply a list of numbers by 10

var result = map([1,2,3,4,5,6,7,8],
  function(x) {
    return x * 10;
})

console.log(result)


// ex. to square a list of numbers

var result = map([1,2,3,4,5,6,7,8],
  function(x) {
    return x * x;
})

console.log(result)


// ex. to uppercase a list of strings

var result = map(["hello", "goodbye"],
  function(s) {
    return s.toUpperCase();
})

console.log(result)




// you can also just pass variables instead of the function directly:

var list = ["hello", "goodbye"];

function upperCase(s) {
    return s.toUpperCase();
}

var result = map(list, upperCase);

console.log(result)


