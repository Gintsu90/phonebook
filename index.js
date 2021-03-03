const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();
const Person = require("./models/persons");
const app = express();
const PORT = process.env.PORT || 3001;

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



// const generateId = () => {
//     const randomId = Math.floor(Math.random() * 10000 + 1)
//     return randomId;
// }

const errorHandler = (error, req, res, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
      return res.status(400).send({ error: "malformed id" })
    }
    next(error)
  }


app.get("/", (req, res) => {
    res.status(202).send("Toimii")
});

app.get("/api/persons", (req, res, next) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()));
    })
    .catch(error => next(error))
});

app.get("/api/persons/:id", (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        res.json(person.toJSON());
    })
    .catch(error => next(error))
});



app.get("/info", async (req, res) => {
    const amountOfPersons = await Person.find().count();
    const date = new Date()
    console.log(`${amountOfPersons} persons`)
    res.send(`<p>Phonebook has ${amountOfPersons} people.</p> <p>${date}</p>`)
})

app.post("/api/persons", (req, res, next) => {
    const body = req.body
    const person = new Person({
        name: body.name,
        number: body.number,
    })
    
    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON())
    })
    .catch(error => next(error));
})

app.put("/api/persons/:id", (req, res, next) => {
    const body = req.body;
    const person = {
        name: body.name,
        number: body.number,
    };

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end();
        })
        .catch(error => next(error)) 
})

app.use(errorHandler)


app.listen(PORT)
console.log(`Server is running on ${PORT}`);