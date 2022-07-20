function print(name="", arr=null, output=null){
  console.log(name)
  console.log("\tarray: " + arr)
  console.log("\toutput: "+ output);
  console.log("\n");
}

let arr = null;
let arr2 = null;
let output = null;

//length
arr = [1,2,3];
output = arr.length
print("length", arr, output);

//splice (mutable)
arr = [1,2,3];
output = arr.splice(1, 1, "fizz"); 
//After index 1, remove the next 1 elem, insert "fizz" to arr, output return elem (mutable)
print("splice (mutable)", arr, output);

arr = [1,2,3]
output = arr.splice(1, 0, "fizz"); 
//After index 1, remove the none of next elems, insert "fizz" to arr, return removed elem (mutable)
print("splice (mutable)", arr, output);

//slice (immutable)
arr = [1,2,3]
output = arr.slice(1,3);
//Including index 1, remove elems until index 2-1, return updated arr (immutable)
print("slice", arr, output);
arr = [1,2,3]
output = arr.slice(-2, 3);
//Including index (length-1)-1, remove elems until index 3-1, return updated arr (immutable)
print("slice (immutable)", arr, output);

// Tip (slice vs. splice): sPlice ('P' for 'in position (mutable)' & after place (exclusive of first index))

//insert at (mutable)
arr = [1,2,3];
arr[1] = "fizz";
print("insert at", arr);

//index of
arr = [1,2,3];
output = arr.indexOf(1);
arr = [1,2,3];
print("index of", arr);

//find
arr = [1,2,3];
output = arr.find(elem=>elem > 0)
//returns first elem that satisfies condition function
print("find", arr, output);

//push (mutable)
arr = [1,2,3];
output = arr.push(4);
print("push (mutable)", arr, output);

//pop (mutable)
arr = [1,2,3];
output = arr.pop();
print("pop (mutable)", arr, output);

//shift (mutable)
arr = [1,2,3];
output = arr.shift();
print("shift (mutable)", arr, output);

//remove (mutable)
arr = [1,2,3];
let i = (arr.indexOf(3));
output = arr.splice(i, 1);
print("remove (mutable)", arr, output);

//sort (mutable)
arr = [1,2,3];
output = arr.sort((a,b)=>b-a);
print("sort (mutable)", arr, output);

//reverse (mutable)
arr = [1,2,3];
output = arr.reverse();
print("reverse (mutable)", arr, output);

//Concatenate 2 arrays
arr = [1,2,3];
arr2 = ['a','b','c'];
output = [arr, arr2]
print("Concatenate 2 arrays (immutable)", arr, output);

arr = [1,2,3];
arr2 = ['a','b','c'];
output = arr.concat(arr2)
print("Concatenate 2 arrays (immutable)", arr, output);
