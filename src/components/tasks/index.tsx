import React, { useState, useEffect } from 'react';
import supabase from '../../supabaseClient.js';

const Tasks = () => {
    const [tasks, setTasks] = useState([]); // Declare state for tasks

    // Fetch data on component mount
    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase
            .from('TasksData')
            .select('*');

            if (error) {
                console.error('Error fetching data:', error);
                return;
            }

            setTasks(data); // Store fetched tasks in state
        }

        fetchData();
    }, []); // Empty dependency array to run only on component mount

    return (
        <div>
            <h1 className='heading-style'>This is our tasks page</h1>
            <ul>
                {/* Render fetched tasks */}
                {tasks.map((task: any) => (
                    <li key={task.id}>{task.name}</li> // Adjust this according to your table structure
                ))}
            </ul>
        </div>
    );
};

export default Tasks;