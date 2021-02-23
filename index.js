const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

let persons = 
[
    {
        id: 1,
        name: "Toni Pekkala",
        number: "040-123132"
    },
    {
        id: 2,
        name: "Apina Mies",
        number: "101-090909"
    },
    {
        id: 3,
        name: "Vitun Mulukku",
        number: "898-202020"
    },
    {
        id: 4,
        name: "Möö Möö",
        number: "848-098098"
    },
]

app.use(express.json())
app.use(express.static("build"));
app.use(cors());

morgan.token("person", (req, res) => {
    return JSON.stringify(req.body)
})


app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms', ,' person',
      tokens['person'](req, res),
    ].join(' ')
  }))



const generateId = () => {
    const randomId = Math.floor(Math.random() * 10000 + 1)
    return randomId;
}


app.get("/", (req, res) => {
    res.status(202).send("Toimii")
});

app.get("/api/persons", (req, res) => {
    res.json(persons)
    console.log(persons)
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        res.json(person)
    } else {
        console.log("ei löydy")
        res.status(404).end()
    }
})

app.get("/info", (req, res) => {
    const amountOfPersons = persons.length;
    const date = new Date()
    console.log(`${amountOfPersons} persons`)
    res.send(`<p>Phonebook has ${amountOfPersons} people.</p> <p>${date}</p>`)
})

app.post("/api/persons", (req, res) => {
    
    const newPerson = {
        id: generateId(),
        name: req.body.name,
        number: req.body.number,
    };
    const personName = persons.some(person => person.name === newPerson.name)

    if(req.body.number && personName !== true) {
        persons = persons.concat(newPerson)
        res.json(newPerson)

    } else {
        return res.status(400).json({
            error: "name must be unique or number missing"
        })
    }
    
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id);
    if(person) {
        res.status(204).end();
    } else {
        res.status(404).end();
    }
})

app.listen(PORT)
console.log(`Server is running on ${PORT}`);