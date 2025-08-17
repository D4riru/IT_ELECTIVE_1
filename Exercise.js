// 1
var myName = "Daryl";
console.log("My name:", myName + "\n");

// 2
let age = "20";
console.log("My Age:", age + "\n");

// 3
const PI = 3.1416;
console.log("PI value:", PI + "\n");

// 4
let isStudent = Number(age) < 25 ? true : false;
console.log("Is student?", isStudent + "\n");

// 5
let person = {
    name: myName,
    age: age,
    isStudent: isStudent,
    address: {
        city: "Davao",
        country: "Philippines"
    }
};
console.log("Person object:", person + "\n");

// 6
let colors = ["red", "blue", "green", "yellow", "red"];
console.log("Colors array:", colors + "\n");

// Reverse and Transform
let words = ["apple", "banana", "grape"];
let transformed = [];

for (let word of words) {
    let reversed = "";
    for (let i = word.length - 1; i >= 0; i--) {
        reversed += word[i];
    }
    transformed.push(reversed.toUpperCase());
}

console.log("Original words:", words);
console.log("Transformed words:", transformed + "\n");

// Filtering and Counting 
let numbers = [12, 45, 67, 23, 90, 32, 11, 9, 28];
let evenAndGreaterThan20 = numbers.filter(num => num % 2 === 0 && num > 20);

console.log(`Found ${evenAndGreaterThan20.length} numbers: [${evenAndGreaterThan20.join(", ")}]`);
