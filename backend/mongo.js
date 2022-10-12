const mongoose = require("mongoose");
if (process.argv.length < 3) {
  console.log("Please: node mongo.js <password> <name> <number>");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://admin:${password}@cluster0.kssm4bs.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length > 4) {
  //add person
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  mongoose
    .connect(url)
    .then(() => person.save())
    .then((pers) => {
      console.log(`added ${pers.name} number ${pers.number} to phonebook`);
      mongoose.connection.close();
    })
    .catch((error) => console.log(`Error: ${error}`));
} else {
  // list all
  mongoose.connect(url);
  console.log("phonebook:");
  Person.find({}).then((persons) => {
    persons.forEach((person) => console.log(person.name, person.number));
    mongoose.connection.close();
  });
}
