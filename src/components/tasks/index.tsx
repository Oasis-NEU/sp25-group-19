<<<<<<< Updated upstream
import supabase from '../supabaseClient.js';
=======

>>>>>>> Stashed changes

const Tasks = () => {

    async function fetchData() {
        const { data, error } = await supabase
        .from('TasksData')
        .select('*');

        if (error) {
            console.error('Error fetching data');
            return;
        }

        console.log('Fetched data:', data);
    }

    return (
        <div>
            <h1 className = 'heading-style'>This is our tasks page</h1>
            <label form="Tasks">Tasks</label>
            <textarea id="Tasks" name="Tasks" rows={10} cols={100}></textarea>
        </div>
    )
}

<<<<<<< Updated upstream
export default Tasks;
=======

export default Tasks;

// Types of data it will hold
// String = Description of what the task is
// String = When the task is due
// Boolean = Repeat tasks. If false, no repeat. If true, repeat.
// Boolean = remind (int) hours before event?
// int = number of hours before event starts
>>>>>>> Stashed changes
