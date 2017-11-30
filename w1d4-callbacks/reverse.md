# Making Reverse: Our Own Function that takes a Function

Let's make reverse(), a function that works the opposite of filter().
Given a list and a function, reverse() will return a new list, based on the provided list, 
but with the items removed where the provided function returns true.


## Using a for loop:

```
var remove = function (list, callback) {
  var result = [];
  for(var i = 0; i < list.length; i++){
    if(!callback(list[i])) {
      result.push(list[i]);
    }
  }
  return result;
}

var newList = remove([1,2,3,4,5], function(x) {
  return x > 2;
})

// newList is [1,2]
```

## Using reduce


```
var remove = function (list, callback) {
  list.reduce(function(m,x) {
    if(!callback(x)) {
      m.push(x);
    }
    return m;
  }, []);
}


var newList = remove([1,2,3,4,5], function(x) {
  return x > 2;
})

// newList is [1,2]
```


## Reduce + modifying the array prototype 

```
Array.prototype.remove = function(callback) {
  return this.reduce(function(m,x) {
    if(!callback(x)) {
      m.push(x);
    }
    return m;
  }, []);
}


var newList = [1,2,3,4,5].remove(function(x) {
  return x > 2;
})

// newList is [1,2]
```