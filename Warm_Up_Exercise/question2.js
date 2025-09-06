// Using .filter(), filter people with age 18 and above.
  let people = [
  { name: "Tom", age: 16 },
  { name: "Jerry", age: 18 },
  { name: "Spike", age: 22 }
];

let adults = people.filter(person => person.age >= 18);

console.log(adults);
