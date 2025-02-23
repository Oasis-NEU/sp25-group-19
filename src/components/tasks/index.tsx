const Tasks = () => {
    return (
        <div>
            <h1 className = 'heading-style'>This is our tasks page</h1>
        </div>
    )
}

export default Tasks;

// Types of data it will hold
// String = Description of what the task is
// String = When the task is due
// Boolean = Repeat tasks. If false, no repeat. If true, repeat.
// Boolean = remind (int) hours before event?
// int = number of hours before event starts