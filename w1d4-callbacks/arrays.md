# Useful Array Methods

## For Each

[1,2,3,4].forEach(function(x) {
  console.log(x * 2);
})

## Map

[1,2,3,4].map(function(x) {
  return x * 2;
})


## Filter

[1,2,3,4].filter(function(x) {
	return x > 3;
})


## Sort


```
[1,10,7,12].sort(function(a,b) {
	return a - b;
})
```

```
var users = [{name: "Bob", id: 3}, {name: "Alice", id: 2}, {name: "Joe", id: 4}]

users.sort(function(a,b) {
	if(a.name > b.name) {
		return 1
	} else if (a.name < b.name) {
		return -1;
	}
	return 0;
})
```




## Reduce


### Summing Up a List

Without reduce:

```
var list = [1,2,3,4,5];

var sum = 0;

list.forEach(function(x) {
	sum += x;
})

console.log(sum)
```

With reduce:

```
var list = [1,2,3,4,5];

var sum = list.reduce(function(memo,x) {
	return memo + x;
})

console.log(sum);
```

### Counting occurences

Without reduce:

```
var list = ["A","B","A","A","B","A","C"];

var counts = {};

list.forEach(function(x) {
	if(counts[x]) {
		counts[x] += 1;
	} else {
		counts[x] = 1;
	}
});

console.log(counts);
// { A: 4, B: 2, C: 1 }
```

With reduce:

```
var list = ["A","B","A","A","B","A","C"];

var counts = list.reduce(function(memo,x) {
	if(memo[x]) {
		memo[x] += 1;
	} else {
		memo[x] = 1;
	}
	return memo;
}, {});

console.log(counts);
// { A: 4, B: 2, C: 1 }
```