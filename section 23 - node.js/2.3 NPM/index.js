import generateName from "sillyName";
import superheroes, { randomSuperhero } from "superheroes";

var name = generateName();
console.log(`my name is ${name}!`);

var superheroName = randomSuperhero();
console.log(`my name is now ${superheroName}!`);