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

/* app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
); */

//let persons = require("./data.json");

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
/* 
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});
 */
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

/*
const generateId = () => {
  min = Math.ceil(0);
  max = Math.floor(9999999);
  return Math.floor(Math.random() * (max - min + 1) + min);
  //    const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
    //return maxId + 1; 
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
 */

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
