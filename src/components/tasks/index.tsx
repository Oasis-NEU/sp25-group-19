import React, { useState, useEffect } from 'react';
import supabase from "C://Users/maryg/OneDrive/Documents/GitHub/sp25-group-19/src/supabaseClient.js"

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Fetch tasks
  useEffect(() => {
    async function fetchTasks() {
      try {
        const { data, error } = await supabase
          .from('testTasks')
          .select('*');
        
        if (error) throw error;
        setTasks(data || []);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async (e) => {
    e.preventDefault();
    
    if (!newTaskName.trim()) {
      alert("Please enter a task name");
      return;
    }
    
    try {
      setIsAdding(true);
      
      const { data, error } = await supabase
        .from('testTasks')
        .insert([{ AnyString: newTaskName }])
        .select();
      
      if (error) throw error;
      
      // Add new task to the list
      if (data && data.length > 0) {
        setTasks([...tasks, ...data]);
      }
      
      // Clear input
      setNewTaskName('');
    } catch (err) {
      console.error("Error adding task:", err);
      alert("Failed to add task: " + err.message);
    } finally {
      setIsAdding(false);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      const { error } = await supabase
        .from('testTasks')
        .delete()
        .eq('id', taskId);
      
      if (error) throw error;
      
      // Remove task from state
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task");
    }
  };

  return (
    <div style={{ 
      padding: 20, 
      maxWidth: 600, 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Tasks</h1>
      
      {error && (
        <div style={{ 
          color: 'white', 
          backgroundColor: 'red', 
          padding: 10, 
          borderRadius: 4,
          marginBottom: 20 
        }}>
          Error: {error}
        </div>
      )}
      
      {/* Form to add tasks */}
      <form onSubmit={addTask} style={{ marginBottom: 30, display: 'flex' }}>
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Enter a new task..."
          style={{ 
            padding: 12, 
            flex: 1, 
            marginRight: 10,
            border: '1px solid #ccc',
            borderRadius: 4,
            fontSize: 16
          }}
          disabled={isAdding}
        />
        <button 
          type="submit" 
          style={{ 
            padding: '10px 20px',
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 16,
            fontWeight: 'bold'
          }}
          disabled={isAdding}
        >
          {isAdding ? 'Adding...' : 'Add Task'}
        </button>
      </form>
      
      {/* Loading state */}
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading tasks...</p>
      ) : (
        <div>
          {tasks.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No tasks yet. Add some tasks to get started!</p>
          ) : (
            <ul style={{ 
              listStyleType: 'none', 
              padding: 0,
              border: '1px solid #eee',
              borderRadius: 4
            }}>
              {tasks.map((task, index) => (
                <li 
                  key={task.id || index}
                  style={{ 
                    padding: 16,
                    borderBottom: index < tasks.length - 1 ? '1px solid #eee' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    color: 'black'
                  }}
                >
                  <span style={{ fontSize: 16 }}>{task.AnyString || 'Unnamed task'}</span>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    style={{
                      backgroundColor: '#ff4d4d',
                      color: 'white',
                      border: 'none',
                      borderRadius: 4,
                      padding: '5px 10px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Tasks;