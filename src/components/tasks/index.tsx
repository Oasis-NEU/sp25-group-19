import supabase from '../supabaseClient.js';

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
        </div>
    )
}

export default Tasks;