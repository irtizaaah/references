function print(name="", input=null, output=null){
  console.log(name)
  console.log("\tarray: ", input)
  console.log("\toutput: ", output);
  console.log("\n");
}

let input = null;
let output = null;

// string to array
input = "123";
output = [...input]
print("string to array", input, output)

// string to float
input = "123";
output = parseFloat(input);
print("string to float", input, output)

// float to int
input = 3.14;
output = parseInt(input);
print("string to float", input, output)

// int to string
input = 123;
output = String(input);
print("int to string", input, output)

// absolute value
input = -1;
output = Math.abs(input);
print("aboslute value", input, output)

// round
input = 3.14;
output = Math.round(input);
print("aboslute value", input, output)

// max value
input = Infinity;
print("max value", input)

input = Number.POSITIVE_INFINITY;
print("max value", input)

// min value
input = Number.NEGATIVE_INFINITY;
print("max value", input)

// ternary operator 
input = true;
output = input ? "fizz" : "buzz";
print("ternary operator", input, output)

// anonymous function
function funct(){
  return "fizz";
}
console.log(funct())
funct = () => "fizz";
console.log(funct())
funct = () => {return "fizz"};
console.log(funct());
