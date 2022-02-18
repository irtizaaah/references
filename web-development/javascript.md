# JavaScript (Behind The Scenes)
## How does the computer understand JavaScript code?
### JavaScript Engine
The JavaScript engine contains lexers, syntax parsers, an interpreter, and a JIT (just-in-time) compiler. 

It determines what the code means by tokenizing and parsing every line of code into an abstract syntax tree. The interpreter (or JIT compiler) then executes the thread of execution by converting it to byte code (or machine code) line by line. 

### JavaScript is Synchronous & Single threaded
Every thread is executed in order (line by line, top to bottom), making JavaScript synchronous. 

Every thread is handled one at a time (multiple threads cannot be running simultaniously), making JavaScript single threaded.

This means JavaScript will execute lines of code one after another, but if something like setTimeout() is used then the code would need to run in parallel somehow. This is technically not possible because JavaScript is not multithreaded, so this problem is solved by the JS engine using an event loop (more about it later). 

## How JavaScript handles data types (Coercion)
JavaScript is a dynamically typed language. The literals of the variables determine what type a variable is. A variable can be a string, number (floating type only), boolean, and an object. They can also have special values like 'undefined' or 'null'.

JavaScript often automatically/implicitly converts the data type of one variable to another when it interacts with another data type. This is called coercion. 

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

**Local Scope**: The scope is limited to inside of the current function.

**Lexical Scope**: A scope where the inner function has access to code in it's outer function. In other words, A function has access to all the variables from it's parent function at all times. 

**Lexical Environment**: This is where the code spacially sits with it's surrounding code. 

A lexical environment object is created for every time a function is invoked. This object contains two things:
1. **Environment record** (code in the local scope)
2. **Reference to the outer environment** (the code from it's nearest outer scope).

*In other words, any variable in-scope of the function is included in it's lexical environment object.

**Scope Chaining**: Nested functions have lexical environments that reference their outer environments. This creates a chain of scopes from the inner most function to the outer function.

innerMost() --access-to-> inner() --access-to-> outer() --access-to-> global()

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

## Using JavaScript with the Web (Asynchronous Code and Promises)
### Asynchronous Code
When we click on a link and the browser fetches the data from a server, we can still interact freely with the rest of the website. But this shouldn't be possible if you think about it. JavaScript is synchronous, meaning it can't jump from one line to another line of code. So when something like a fetch request is sent, shouldn't it freeze everything and wait until it's recieved a response before continuing?

JavaScript is only one part of what makes up a web browser. There are features and functions we can perform outside of JavaScript in a browser through the web browser API. Event listeners, setTimeout(), and fetch() (really anything that can break the flow of execution) are all asynchronous features outside of JavaScript. 

While something like 'setTimeout(callback(),1000)' looks like an ordinary JavaScript function, they're not. Essentially, it just prints the parameters (callback(),1000) to the web browser API where it's executed and returned to an event queue. 

Once JavaScript has synchronously gone through all it's code and the execution context is empty, it checks the event queue and executes that. These events are checked at a constant interval (this is called an event loop). 

### Synchronous code
```javascript
    console.log("start");
    function loginUser(email, password){
        setTimeout(()=>{ // simulate wait time when fetching data from a server
            return {userEmail: email};
        },1550)
    }
    
    const user = loginUser(devedf@goomail.com, 123456);
    console.log(user) // this will output 'undefined' because when this line of code runs, the user data has not been fetched yet
    
    console.log("finish");
```
### Callbacks
```javascript
    console.log("start");
    function loginUser(email, password, callback){
        setTimeout(()=>{ // simulate wait time when fetching data from a server
            callback({userEmail: email}); // pass it to a callback instead of returning the value like before
        },1550)
    }
    
    const user = loginUser(devedf@goomail.com, 123456, user => {
        console.log(user); // instead of outputting the return value of user, we pass into a callback function that's run after the asynchronous function is completed
    });
    
    console.log("finish");
```

### Callback Hell
```javascript
    console.log("start");
    function loginUser(email, password, callback){
        setTimeout(()=>{ // simulate wait time when fetching data from a server
            callback({userEmail: email}); // pass it to a callback instead of returning the value like before
        },1550)
    }
    
    const user = loginUser(devedf@goomail.com, 123456, user => {
        console.log(user);
            /*
                getUserVideos(user.username, videos()=>{ // fetch videos after fetching user
                    console.log(videos);
                    getVideoDetails(videos[0], title()=>{ // fetch video details after fetching videos
                        console.log(title);
                    
                    });
                });
           */
    });
    
    console.log("finish");
```
### Updated Callback
```javascript
    console.log("start");
    function loginUser(email, password, onSuccess, onFailure){ // there's typically two callbacks to handle the two cases
        //if(onFailure)... // do this if data is not recieved
        setTimeout(()=>{ // simulate wait time when fetching data from a server
            onSuccess({userEmail: email}); // do this if data is recieved
        },1550)
    }
    
    const user = loginUser(devedf@goomail.com, 123456, user => {
        console.log(user);
    });
    
    console.log("finish");
```

### Promises
ES6 introduced promises. Promises handle asynchronous code in a way that avoids using callback functions (the pyramid of doom). 'Two pronged facade' functions are functions that effect both the browser and JavaScript. It returns a 'promise' (an object with a value, status, and array of funcitons named 'unfulfilled') whilst executing on the request in the web browser. 

For 'fetch()' a get request is sent to the web browser API. A promise object is returned. The promise's value stores the return value expected from the website, status shows whether that value has been returned yet, and unfulfilled is an array that holds all the functions it will execute once the promise's status has changed.

Whenever the value of the promise is updated, the status is changed from 'pending' to 'resolved', the functions in the unfulfilled array get enqueued to the microtask queue.

Promised based functionality uses the microtask queue. Anything using the browser timer API uses the callback queue. 

```javascript
    function display(futureData){ // is enqueued to microstask queue once promise recieves value
        console.log(futureData)
    }

    futureData = fetch("https://twitter.com/regis/tweets/1"); // return promise object
    futureData.then(display); // add function to unfulfilled array in promise object

    console.log("Me First"); // add to call stack
```
```javascript
    functionloginUser(email, password){
        return promise = new promise((resolve, reject)=>{
            setTimeout(()=>{ // simulate wait time when fetching data from a server
                console.log("got the user")
                resolve({userEmail:email}); 
            },2000)
    }; // return promise object

    loginUser('Ed','123')
        .then(user()=>{console.log(user)});
        //.then(getVideos()=>{console.log(videos recieved)}); // string along functions instead of the callbacks with the pyramid of doom
        .catch(err => console.log(err.message));
```
## Async Await 
This is just syntactical sugar for the promises we already saw.
```javascript

    async function displayUser(){
        const loggedUser = await loginUser('ed',123) // instead of ".then"
        console.log(loggedUser)
    };

    displayUser();
```
```javascript

    async function displayUser(){
        try(){ // catch errors if they pop up
            const loggedUser = await loginUser('ed',123);
            console.log(loggedUser);
        }
        catch(err){
            console.log("Failed");
        }
    };

    displayUser();
```

## Object Oriented Programming
Let's build object oriented classes from scratch. We'll update each solution as we go. 

### JavaScript Objects
```javascript
    const user1 = {
        name: "Will";
        score: 3;
        increment: function(){
            user1.score++
        }
    };
```
### Dot Notation
```javascript
    const user2 = {};

    user2.name = "Tim";
    user2.score = 6;
    user2.increment = function() {
        user2.score++;
    }
```
### Object.create
```javascript
    const user3 = Object.create(null);

    user3.name = "Eva";
    user3.score = 9;
    user3.increment = function() {
        user3.score++;
    }
```
### Generate objects using a function
```javascript
    function userCreator(name, score){
        const newUser = {};
        newUser.name = name;
        newUser.score = score;
        newUser.increment = function() { // this function is being recreated for every object so it's an unsustainable solution
            newUser.score++;
        };

        return newUser;
    }

    const user4 = userCreator("Jim", 4);
    user4.increment(); 
```
### Generate objects using a function and prototype chain
One of the hidden properties of any object created with userCreator is __proto. When the increment method is invoked from an object, and JavaScript sees it's not one of it's properties, it goes to the prototype which does hold the functionStore function. 

```javascript
    function userCreator(name, score){
        const newUser = Object.create(functionStore); // this bonds functionStore to the user using the prototype chain
        newUser.name = name;
        newUser.score = score;

        return newUser
    }

    const functionStore = { 
        increment = function() { 
            this.score++; // the 'this' key word label refers to the object left of the method.
        };
    }

    const user5 = userCreator("Fin", 8);
    user5.increment(); 
```
### Generate objects using a function and prototype and new
Functions are all objects.

Methods are functions that are a part of an object, thus the 'this' keyword refers to the object itself.

Regular functions references the global object or window

The this is bound to the global object(the window) unless the "new" keyword is used.

```javascript
    function UserCreator(name, score){
        newUser.name = name;
        newUser.score = score;
    }

    UserCreator.increment = function() { 
        this.score++; // here the 'this' refers to object.create() and forms a bond to the prototype property
    };

    const user6 = new UserCreator("Bob", 2); // this does what const newUser = Object.create(functionStore) used to do (it binds to the prototype and automates all the other things as before)

    user6.increment(); 
```

### Generate objects using a function and prototype and new
```javascript
    function UserCreator(name, score){
        newUser.name = name;
        newUser.score = score;
    }

    UserCreator.increment = function() { 
        this.score++; // the 'this' key word label refers to the object left of the method.
    };

    const user7 = new UserCreator("Bob", 2); // this does what const newUser = Object.create(functionStore) used to do (it binds to the prototype and automates all the other things as before)

    user7.increment(); 
```

### Generate objects using a class
```javascript
    class UserCreator()){
        constructor(name, score){
            this.name = name;
            this.score = score;
        }

        increment() { 
            this.score++;
        } 
    }

    const user8 = new UserCreator("Pam", 5); 
    user8.increment(); 
```

## This Keyword in depth (this)
Functions are all objects.

Methods are functions that are a part of an object, thus the 'this' keyword refers to the object itself.

Regular functions references the global object or window

The this is bound to the global object(the window) unless the "new" keyword is used.

```javascript
    const object = {
        var: 'a'
        method1(){
            console.log(this); // returns object
        }
    };

    object.method2 = function(){
        console.log(this); // returns object
    }

    object.method1();
    object.method2();
```
```javascript
    const object = {
        var: 'a'
        method1(){
            console.log(this); // returns object
        }
    };

    function func(){
        console.log(this); // returns window/global object
    }

    func();
```
```javascript
    const object = {
        var: 'a'
        method1(){
            console.log(this); // returns object
        }
    };

    function Func(val){
        this.val = val;
        console.log(this); // returns window/global object
    }

    const object = new Func('b'); // new operator creates new empty object when used on construction functions and makes this point it/
```

* If a callback function inside of a method uses the 'this' keyword then it will point to the window/global object because the callback function is a regular function.

*Sources: Will Sentance (CodeSmith), Michael O'Halloran (CodeSmith), Tony Alicea, Mosh Hamedani, Dev Ed*
