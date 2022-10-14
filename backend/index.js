require("dotenv").config();
const Person = require("./models/person");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("build"));
const morgan = require("morgan");

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/", (request, response) => {
  response.send("<h1>Hello Phonebook!</h1>");
});

app.get("/info", (request, response) => {
  response.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p> ${new Date()}</p>
  `);
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((coso) => {
    console.log(coso);
    response.json(coso);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((p) => {
    response.json(p);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  const peson = new Person({
    name: body.name,
    number: body.number,
  });

  peson.save().then((savedNote) => {
    response.json(savedNote);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
