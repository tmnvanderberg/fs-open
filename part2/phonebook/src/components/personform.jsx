const PersonForm = ({newName, handleNewNameChange, newNumber, handleNumberChanged, handleSubmit}) => {
    return (
        <form>
            <div>
                name: <input
                    value={newName}
                    onChange={handleNewNameChange}
                />
            </div>
            <div>number: <input
                value={newNumber}
                onChange={handleNumberChanged}
            />
            </div>
            <div>
                <button
                    type="submit"
                    onClick={handleSubmit}>
                    add
                </button>
            </div>
        </form>
    )
}

export default PersonForm
