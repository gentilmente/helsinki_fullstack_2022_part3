const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(morgan("tiny"));

app.use(express.json());
let persons = require("./data.json");

app.get("/", (request, response) => {
  response.send("<h1>Hello Helsinki!</h1>");
});

app.get("/info", (request, response) => {
  response.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p> ${new Date()}</p>
  `);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const generateId = () => {
  min = Math.ceil(0);
  max = Math.floor(9999999);
  return Math.floor(Math.random() * (max - min + 1) + min);
  /*     const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
    return maxId + 1; */
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }
  if (persons.some((p) => body.name === p.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});
/*
 */

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
