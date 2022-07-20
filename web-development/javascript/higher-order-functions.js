function print(name="", arr=null, arr2=null, output=null){
  console.log("\n");
  console.log(name)
  console.log("\tarray: ", arr)
  console.log("\tarray 2: ", arr2)
  console.log("\toutput: ", output);
  console.log("\n");
}

let arr = null;
let arr2 = null;
let output = null;

// all immutable
// All hof functions takes in an anonymous function with the following parameters in that exact order
// arr.hof((elem, index, arrMapCalledOn)=>{})
// exception: arr.reduce((prevVal, currVal, currIndex, array)=>{}, initialValue)

// map
arr = [1,2,3];
arr2 = ['a','b','c'];
output = arr.map((elem,i, arr)=>[elem, arr2[i], arr])
// takes elem from array, transfroms it using an anonymous function, maps return output to new array, and returns new array
print("map", arr, arr2, output);

// filter
arr = [1,2,3];
output = arr.filter((elem)=>elem%2!=0)
// iterates through array, checks condition in anonymous function, returns elem in new array for every true returned by anonymous function
print("filter", arr, null, output);

// for each
arr = [1,2,3];
output = arr.forEach(elem=>console.log(elem))
// iterates through array and performs a function for each index
print("for each", arr, null, output)

// reduce
arr = [1,2,3];
output = arr.reduce((prev,curr)=>prev+curr,0);
// add all elems in an array and return the sum
print("reduce", arr, null, output)
