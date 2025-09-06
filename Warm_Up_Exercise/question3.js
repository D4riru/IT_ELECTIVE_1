// Use reduce: Find the oldest person in the list.
let people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 32 },
  { name: "Charlie", age: 29 }
];

let oldestPerson = people.reduce((oldest, currentPerson) => {
  return (currentPerson.age > oldest.age) ? currentPerson : oldest;
});

console.log(oldestPerson);