const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url =
`mongodb+srv://Toni:${password}@cluster.vmkjd.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const phonebookEntrySchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Entry = mongoose.model('Entry', phonebookEntrySchema)

// Entry.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note)
//     })
//     mongoose.connection.close()
// })

const phonebookEntry = new Entry({
  name: name,
  number: number,
})

if(name !== undefined && number !== undefined) {
    phonebookEntry.save().then(result => {
        console.log(`Added ${name} ${number} to phonebook`) 
        mongoose.connection.close()
    })
} else {
    Entry.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(entry => {
            console.log(`${entry.name} ${entry.number}`)
        });
        mongoose.connection.close()
    })
}
 
  