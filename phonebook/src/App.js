import React, {useState, useEffect} from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Form from "./components/Form";
import personInfo from "./personinfo/personInfos";
import Notification from "./components/Notification";

function App() {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState("")

  const getPersons = () => {
    personInfo
    .getAll()
    .then(initialInfo => {
      console.log(initialInfo)
      setPersons(initialInfo)
    })
    .catch(error => {
      alert("ei löydy")
    })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const filterNames = e => {
    console.log(e.target.value)
    setFilter(e.target.value)
  }

  const numbers = persons.filter(person => {
    return person.name.toLowerCase().includes(filter.toLowerCase())
  })

  // Adds new name to the persons array and checks if it already exist.
  const addName = (event) => {
    event.preventDefault();
    const numberExist = persons.some(person => newNumber === person.number)
    const personExist = persons.some(person => newName === person.name)
    const checkName = persons.find(person => person.name === newName)
    const changeNumber = { ...checkName, number: newNumber}
    console.log("####",changeNumber.id)
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    if(!numberExist && newName !== "" && newNumber !== "") {
      if(personExist) {
        console.log(changeNumber)
        personInfo
          .update(changeNumber.id, changeNumber)
          .then(returnedPerson => {
            console.log("new number", returnedPerson)
            setPersons(persons.map(person => person.id === changeNumber.id ? returnedPerson : person))
            setNewName("")
            setNewNumber("")
            setMessage(`Changed ${changeNumber.name}s number`)
            setTimeout(() => {
              setMessage("")
            }, 5000)
          })
          .catch(error => {
            console.log(error)
            setMessage(`Information of ${changeNumber.name} has already been removed from server`)
            setTimeout(() => {
              getPersons()
              setMessage("")
            }, 5000)
          })
      } else if (!personExist) {
        personInfo
        .create(nameObject)
        .then(initialInfo => {
          console.log(initialInfo)
          setPersons(persons.concat(initialInfo))
          setNewName("")
          setNewNumber("")
          setMessage(`Added name: ${initialInfo.name} number: ${initialInfo.number}`)
          setTimeout(() => {
            setMessage("")
          }, 5000)
      })
      .catch(error => console.log(error))
      }
      
    } else {
        setPersons(persons)
        alert(`${newName} already exist`)
    }
  }

  const deletePerson = (id) => {
    if(window.confirm("Are you sure you want to delete this?")) {
      personInfo
      .deleteInfo(id)
      .then(data => {
        console.log("deleted successfully", data)
        getPersons()
      })
    }
    
  }

 

  useEffect(getPersons, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter filterNames={filterNames}/>
      <h2>Add new</h2>
      <Form 
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons deletePerson={deletePerson} numbers={numbers}/>
    </div>
  );
}

export default App;
