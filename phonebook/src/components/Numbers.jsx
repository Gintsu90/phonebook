const Numbers = ({person, number, deletePerson}) => {
    
    return (
        <>
            <li>{person.name} {number} <button onClick={deletePerson}>delete</button></li>
        </>
    )
}

export default Numbers;