// different ways to using Errors 

// 1) synchronous:

function doSomething(param) {
	if(param < 0) {
  	throw new Error("param must be > 0");
	} else {
		return "OK";
	}
}

console.log("before");
doSomething(-1); // will crash program
console.log("after");

console.log("before");
// will prevent error from crashing program, instead will just log
try {
  doSomething(-1);
} catch (e) {
  console.log(e.name, e.message);
}
console.log("after");



// 2) async via callbacks:

// try-catch doesn't work with callbacks
// instead, the convention in node is 
// for the callback to receive an error object as the first argument

function doSomethingAsync(param, callback) {
	if(param < 0) {
  	callback(new Error("param must be > 0"));
	}
	setTimeout(() => {
		callback(null, "OK");
	}, 1000); 
}


doSomethingAsync(-1, (e, result) => {
  if(e) {
    console.log(e.name, e.message);
  }
  console.log(result);
});


// 3) when using promises

 function myPromise (param) {
   return new Promise(function(resolve, reject) {
   	 if(param < 0) {
     	 reject(new Error("param must be > 0"))
   	 }
   	 setTimeout(() => {
   	 	 resolve("OK")
   	 }, 1000)
   });
 }

 myPromise(-1)
   .then((result) => {
   	 console.log(result);
   })
   .catch((e) => { 
   		console.log(e.name, e.message)
   });