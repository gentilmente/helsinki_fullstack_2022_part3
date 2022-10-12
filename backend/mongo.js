const mongoose = require("mongoose");

if (process.argv.length < 5) {
  console.log("Please: node mongo.js <password> <name> <number>");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://admin:${password}@cluster0.kssm4bs.mongodb.net/phonebook?retryWrites=true&w=majority`;

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", phoneSchema);
const person = new Person({
  name: name,
  number: number,
});

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected");
    return person.save();
  })
  .then((data) => {
    console.log("person saved! \n", person);
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));
