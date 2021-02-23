import Numbers from "./Numbers";

const Persons = ({numbers, deletePerson}) => {

    return (
        <>
            <ul>
                {numbers.map((person, i) => 
                <Numbers key={i} deletePerson={() => deletePerson(person.id)} person={person} number={person.number}/>
                )}
            </ul>
        </>
    )
}

export default Persons;