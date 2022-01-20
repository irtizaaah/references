# JavaScript (Behind The Scenes)
## How does the computer understand JavaScript code?
### JavaScript Engine
The JavaScript engine contains lexers, syntax parsers, an interpreter, and a JIT (just-in-time) compiler. 

It determines what the code means by tokenizing and parsing every line of code into an abstract syntax tree. The interpreter (or JIT compiler) then executes the thread of execution by converting it to byte code (or machine code) line by line. 

### JavaScript is Synchronous & Single threaded
Every thread is executed in order (line by line, top to bottom), making JavaScript synchronous. 

Every thread is handled one at a time (multiple threads cannot be running simultaniously), making JavaScript single threaded.

## How JavaScript handles data types (Coercion)
JavaScript is a dynamically typed language. The literals of the variables determine what type a variable is. A variable can be a string, number (floating type only), boolean, and an object. They can also have special values like 'undefined' or 'null'.

JavaScript often automatically/implicitly converts the data type of one variable when it interacts with one of another type. This is called coercion. 

```javascript
    console.log(3 < 2 < 1)
    // (3 < 2 < 1) <=> (false < 1) <=> (0 < 1) <=> true
    console.log('3'+1) => 31
    // converts 1 to '1' and concatenate the string 3 with 1 and forms '31'

    if(null){ // this is evaluated as false
        return ("null is true");
    }
    else{
        return ("null is false");
    }

    if(undefined){ // this is evaluated as false
        return ("undefined is true");
    }
    else{
        return ("undefined is false");
    }
```

## How does the JS engine execute every code instruction?
With every thread of execution, the present variables and functions are loaded into the memory space.

**Execution Context**: The 'space' that holds the current thread of execution (the function) and all it's data (the variables) is called the execution context.

**Global Context**: The global context and global memory is the execution context of the entire program.

**Local Context**: The local context and local memory is the execution context of a function inside a global function and it's global context.

Everytime an execution context is created, it is pushed into the call stack which executes in the order of 'last in first out'.

```javascript
    function localFunc(){
        return "local"
    }
    const globalVar = localFunc(); // assigned return value of function

    console.log(globalVar); // returns "local"
```

| Call Stack|
|---|
|Local Context: *localFunc*|
|Global Context: *globalVar*|

**Hoisting**: The JS engine initially allocates space for every variable and function in memory before executing the code instructions.

* All functions are initially declared and initialized
* All vairables are initially declared and initialized as undefined in memory  

Due to this, it is legal to call a function before it was lexically declared, because it's stored to memory before execution time (it's as if the function was hoisted to the top).

```javascript

    console.log(hoistedFunc()); // returns "Hoisted"
    console.log(hoistedVar); // returns 'undefined' 

    function hoistedFunc(){
        return "Hoisted"
    }

    var hoistedVar = 10; // since variable is called before initialization it is returned as undefined instead of 10
```

## Functions Have Special Properties (Closures)

**Scope**: The area a piece of code is accessible to other code.

**Local Scope**: The scope is limited to inside of it's closest function.

**Lexical Scope**: A scope where the inner function has access to code in it's outer function. In other words, A function has access to all the variables from it's parent function at all times. 

**Lexical Environment**: This is where the code spacially sits with it's surrounding code. 

A lexical environment object is created for every time a function is invoked. This object contains two things:
1. Environment record (code in the local scope)
2. Reference to the outer environment (the code from it's nearest outer scope).

*In other words, any variable in-scope of the function is included in it's lexical environment object.

**Scope Chaining**: Nested functions have lexical environments that reference their outer environments. This creates a chain of scopes from the inner most function to the outer function.

innerMost() --acces-to-> inner() --access-to-> outer() --access-to-> global()

So, if a function were to be returned, all the variables present in it's nearest outer environment would come attatched with it. Another way to think of closures is like a function that carries around a little backpack with all the variables it needs. This allows you to store permenant data, protected from the global environment. This idea is called a closure or more accurately, a persistent lexically scoped reference data. 

Here are a few things to note:
1. Only the variables from the lexical environment called inside of the function will be persisted or "carried in it's backpack".
2. Everytime The function is referenced, it recieves a new closure.

```javascript
    function giveMeAClosure() {

    var counter = 0; // persisted in closure

    function incrementCounter() { 
            counter++; // lexical scope gives it access to it's parent function
            console.log(counter);
        }

    return incrementCounter; // return reference to function
    }

    const func = giveMeAClosure(); // creates new closure 
    func(); // counter = 1
    func(); // counter = 2

    const func1 = giveMeAClosure(); // creates new closure (counter = 0)
    func1(); // counter = 1
    func1(); // counter = 2
```

## How to Get More Out of Functions (Higher Order Functions)
### Calling and Assigning Functions
```javascript
    function func(){
        return "A"
    }
    const val = func(); // assigned return value of function
    const funcRef = func; // assigned reference to function

    console.log(val); // returns "A"
    console.log(funcRef); // returns object
```
### Pure functions and Callback Functions
```javascript
    function forEachElementDoSomething(oldArray, doSomething){ // pure function
        let newArray = []; // do not mutate existing array & return a copy to keep it pure

        for(let i = 0; i < oldArray.length; i++){
            newArray.push(doSomething(oldArray[i]));
        }
        return newArray;
    }

    function doubleValue(value){ // callback function
        return value*2;
    }

    let array = [1,2,3]
    let doubledArray = forEachElementDoSomething(array, doubleValue)

    console.log(doubledArray);
```

# Using JavaScript with the Web (Asynchronous Code and Promises)
## Asynchronous Code
When we click on a link and the browser fetches the data from a server, we can still interact freely with the rest of the website. But this shouldn't be possible if you think about it. JavaScript is synchronous, meaning it can't jump from one line to another line of code. So when something like a fetch request is sent, shouldn't it freeze everything and wait until it's recieved a response before continuing?

JavaScript is only one part of what makes up a web browser. There are features and functions we can perform outside of JavaScript in a browser through the web browser API. Event listeners, setTimeout(), and fetch() (really anything that can break the flow of execution) are all asynchronous features outside of JavaScript. 

While something like 'setTimeout(callback(),1000)' looks like an ordinary JavaScript function, they're not. Essentially, it just prints the parameters (callback(),1000) to the web browser API where it's executed and returned to an event queue. 

Once JavaScript has synchronously gone through all it's code and the execution context is empty, it checks the event queue and executes that. These events are checked at a constant interval (this is called an event loop). 

## Promises
ES6 introduced promises. Promises handle asynchronous code in a way that avoids using callback functions (the pyramid of doom). 'Two pronged facade' functions are functions that effect both the browser and JavaScript. It returns a 'promise', an object with a value, status, and array of funcitons (named 'unfulfilled') in the JavaScript, whilst executing on the request in the web browser. 

For 'fetch()' a get request is sent to the web browser API. A promise object is returned. The promise's value stores the return value expected from the website, status shows whether that value has been returned yet, and unfulfilled is an array that holds all the functions it will execute once the promise's status has changed.

Whenever the value of the promise is updated, the status is changed from 'pending' to 'resolved', the functions in the unfulfilled array get enqueued to the microtask queue.

Promised based functionality uses the microtask queue. Anything using the browser timer API uses the callback queue. 

```javascript
    function display(futureData){ // is enqueued to microstask queue once promise recieves value
        console.log(futureData)
    }

    futureData = fetch("https://twitter.com/regis/tweets/1"); // return promise object
    futureData.then(display); // add function to unfulfilled arrayin promise object

    console.log("Me First"); // add to call stack
```
