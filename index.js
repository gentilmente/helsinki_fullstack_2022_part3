const express = require("express");
const app = express();
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

/*
const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number || "no number",
  };

  persons = persons.concat(person);

  response.json(person);
});
 */

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
