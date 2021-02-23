const Form = (
    {addName, handleNameChange, handleNumberChange, newNumber, newName}
    ) => {

    return (
        <>
            <form onSubmit={addName}>
                <div>
                name: <input onChange={handleNameChange} value={newName}/>
                <br/>
                number: <input onChange={handleNumberChange} value={newNumber}/>
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default Form;