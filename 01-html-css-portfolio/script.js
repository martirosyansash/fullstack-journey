// variables
// const firstName  = "Sasha";
// const age = 28;
// const isDeveloper = true;

// objects
const numbers = [1, 2, 3, 4, 5];
const user = {
    firstName : "Sasha",
    age: 28,
    profession: "Developer"
}
const fruits = [
    "Apple",
    "Banana",
    "Orange",
    "Mango"
];

// functions

// function greet(name){
//     console.log(`hello ${name}!`);
// }
function sum(a, b) { 
    return(a+b);
}
function isAdult(age) { 
      return age >= 18 ? true : false;
}
function square(number) { 
    return(Math.pow(number,2))
}

// arrow funtions
const name2 = (name) => `hello ${name}` ;
console.log(name2('Ashot'));
// mainProgram
for (let i = 0; i < numbers.length; i++) { 
    console.log(numbers[i])
}
// console.log(firstName , age, isDeveloper);
// greet("Sasha");
// console.log(sum(5, 6));
// console.log(user);
// console.log("Is Adult:", isAdult(20));
for (let i = 0; i < fruits.length; i++) { 
    console.log(fruits[i]);
};
// console.log(square(9));
console.log(`My name is ${user.firstName} \nI am ${user.age} years old \nI am ${user.profession}`);
const { firstName, age, profession } = user;
console.log(firstName, age, profession);

const array1 = [1, 2, 3];
const array2 = [...array1, 4, 5];
console.log(array2);
const fruits1 = [
    "Apple",
    "Banana"
];
const allFruits = [...fruits1, "Orange", "Mango"];
console.log(allFruits);
const doubled = numbers.map((number) => { return number * 2; })
const filtered = numbers.filter((number) => number % 2 === 0);
const result = numbers.find((number) =>  number > 3 );
console.log(doubled);
console.log(filtered);
console.log(result);

const products = [
    { name: "Laptop", price: 1000 },
    { name: "Phone", price: 700 },
    { name: "Keyboard", price: 100}
];

const names = products.map((val) => { return val.name });
const filteredProduct = products.filter((val) => val.price > 500).map((val) => val.name);
const keyboard = products.find(product => product.name === "Keyboard");
console.log(names);
console.log(filteredProduct);
console.log(keyboard);

const users = [
    {
        name: "Sasha",
        age: 28
    },
    {
        name: "Anna",
        age: 19
    },
    {
        name: "David",
        age: 15
    }
];

const adultUsers = users.filter((user) => user.age >= 18);
console.log(adultUsers);