import React, { useState, useEffect } from 'react';
import supabase from 'C://Users/becky/Documents/sp25-group-19/src/supabaseClient.js';
import "./index.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [repeat, setRepeat] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [tableNames, setTableNames] = useState([]);

  // Fetch events - try different table names
  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        
        // Try different table names
        const tablesToTry = ['Events', 'events', 'Event', 'EVENT', 'testEvents'];
        
        for (const tableName of tablesToTry) {
          console.log(`Attempting to fetch from table: ${tableName}`);
          const { data, error } = await supabase
            .from(tableName)
            .select('*')
            .order('EventDate', { ascending: true });
          
          if (!error) {
            console.log(`Successfully found table: ${tableName}`);
            console.log("Data:", data);
            setEvents(data || []);
            return; // Exit if we found a working table
          }
        }
        
        // If we get here, none of the tables worked
        throw new Error("Could not find a valid events table. Please check your Supabase database.");
      } catch (err:any) {
        console.error("Error fetching events:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchEvents();
  }, []);

  // Add a new event
  const addEvent = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !eventDate) {
      alert("Please enter a title and date for the event");
      return;
    }
    
    try {
      setIsAdding(true);
      
      // Try different table names
      const tablesToTry = ['Events', 'events', 'Event', 'EVENT', 'testEvents'];
      let success = false;
      
      for (const tableName of tablesToTry) {
        const newEvent = {
          title: title,
          EventDesc: eventDesc,
          EventDate: eventDate,
          Repeat: repeat
        };
        
        const { data, error } = await supabase
          .from(tableName)
          .insert([newEvent])
          .select();
        
        if (!error) {
          // Add new event to the list
          if (data && data.length > 0) {
            setEvents([...events, ...data]);
            success = true;
            break; // Exit loop if successful
          }
        }
      }
      
      if (!success) {
        throw new Error("Could not add event to any table. Please check your Supabase database.");
      }
      
      // Clear input fields
      setTitle('');
      setEventDesc('');
      setEventDate('');
      setRepeat(false);
    } catch (err:any) {
      console.error("Error adding event:", err);
      alert("Failed to add event: " + err.message);
    } finally {
      setIsAdding(false);
    }
  };

  // Delete an event
  const deleteEvent = async (eventId:any) => {
    try {
      // Try different table names
      const tablesToTry = ['Events', 'events', 'Event', 'EVENT', 'testEvents'];
      let success = false;
      
      for (const tableName of tablesToTry) {
        const { error } = await supabase
          .from(tableName)
          .delete()
          .eq('id', eventId);
        
        if (!error) {
          success = true;
          break;
        }
      }
      
      if (!success) {
        throw new Error("Could not delete event. Please check your Supabase database.");
      }
      
      // Remove event from state
      setEvents(events.filter(event => event.id !== eventId));
    } catch (err:any) {
      console.error("Error deleting event:", err);
      alert("Failed to delete event");
    }
  };

  return (
    <div style={{ 
      width: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      padding: '0'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        margin: '10px 0',
        color: 'black'
      }}>Events</h1>
      
      {error && (
        <div style={{ 
          color: 'white', 
          backgroundColor: 'red', 
          padding: 10, 
          borderRadius: 4,
          margin: '0 20px 15px 20px',
          textAlign: 'center'
        }}>
          Error: {error}
        </div>
      )}
      
      {/* Layout with sections on far sides with 100px gap */}
      <div style={{
        display: 'flex',
        width: '150%',
        boxSizing: 'border-box',
        justifyContent: 'space-between', // Push sections to the edges
        gap: '250px', // 100px space between sections
        padding: '0 20px 20px 20px'
      }}>
        {/* Left section - Add Event Form */}
        <div style={{
          width: '45%',
          boxSizing: 'border-box'
        }}>
          <div style={{ 
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: 8,
            backgroundColor: 'white'
          }}>
            <h2 style={{ 
              margin: '0 0 20px 0',
              textAlign: 'center',
              color: 'black',
              fontSize: '1.5rem'
            }}>Add New Event</h2>
            
            <form onSubmit={addEvent} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label htmlFor="title" style={{ 
                  display: 'block',
                  marginBottom: 8, 
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: '1rem'
                }}>Event Title:</label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter event title"
                  style={{ 
                    padding: 12, 
                    border: '1px solid #ddd',
                    borderRadius: 6,
                    fontSize: 16,
                    width: '100%',
                    boxSizing: 'border-box',
                    color: 'black',
                    backgroundColor: 'white'
                  }}
                  disabled={isAdding}
                />
              </div>
              
              <div>
                <label htmlFor="eventDate" style={{ 
                  display: 'block',
                  marginBottom: 8, 
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: '1rem'
                }}>Event Date:</label>
                <input
                  id="eventDate"
                  type="datetime-local"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  style={{ 
                    padding: 12, 
                    border: '1px solid #ddd',
                    borderRadius: 6,
                    fontSize: 16,
                    width: '100%',
                    boxSizing: 'border-box',
                    color: 'black',
                    backgroundColor: 'white'
                  }}
                  disabled={isAdding}
                />
              </div>
              
              <div>
                <label htmlFor="eventDesc" style={{ 
                  display: 'block',
                  marginBottom: 8, 
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: '1rem'
                }}>Event Description:</label>
                <textarea
                  id="eventDesc"
                  value={eventDesc}
                  onChange={(e) => setEventDesc(e.target.value)}
                  placeholder="Enter event description"
                  rows={5}
                  style={{ 
                    padding: 12, 
                    border: '1px solid #ddd',
                    borderRadius: 6,
                    fontSize: 16,
                    width: '100%',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                    color: 'black',
                    backgroundColor: 'white',
                    minHeight: '120px'
                  }}
                  disabled={isAdding}
                />
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  id="repeat"
                  type="checkbox"
                  checked={repeat}
                  onChange={(e) => setRepeat(e.target.checked)}
                  style={{ marginRight: 10, width: 18, height: 18 }}
                  disabled={isAdding}
                />
                <label htmlFor="repeat" style={{ 
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: '1rem'
                }}>Repeat Event</label>
              </div>
              
              <button 
                type="submit" 
                style={{ 
                  padding: '12px 20px',
                  backgroundColor: '#333',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 16,
                  fontWeight: 'bold'
                }}
                disabled={isAdding}
              >
                {isAdding ? 'Adding Event...' : 'Add Event'}
              </button>
            </form>
          </div>
        </div>
        
        {/* Right section - Upcoming Events */}
        <div style={{
          width: '45%',
          boxSizing: 'border-box'
        }}>
          <h2 style={{ 
            margin: '0 0 20px 0',
            color: 'black',
            fontSize: '1.5rem'
          }}>Upcoming Events</h2>
          
          {/* Scrollable container for events */}
          <div style={{ 
            border: '1px solid #ddd',
            borderRadius: 8,
            backgroundColor: 'white',
            height: 'calc(100vh - 160px)',
            overflowY: 'auto',
            padding: '10px'
          }}>
            {loading ? (
              <p style={{ textAlign: 'center', color: 'black', padding: '20px' }}>Loading events...</p>
            ) : events.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'black', padding: '20px' }}>No events scheduled. Add some events to get started!</p>
            ) : (
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}>
                {events.map((event:any) => (
                  <div 
                    key={event.id}
                    style={{ 
                      padding: '20px',
                      border: '1px solid #eee',
                      borderRadius: 8,
                      backgroundColor: 'white',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                      color: 'black'
                    }}
                  >
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '15px'
                    }}>
                      <h3 style={{ 
                        margin: '0',
                        fontSize: '1.3rem',
                        color: 'black'
                      }}>
                        {event.title}
                      </h3>
                      <button 
                        onClick={() => deleteEvent(event.id)}
                        style={{
                          backgroundColor: '#e74c3c',
                          color: 'white',
                          border: 'none',
                          borderRadius: 4,
                          padding: '6px 12px',
                          cursor: 'pointer',
                          fontSize: 14,
                          fontWeight: 'bold'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                    
                    <p style={{ 
                      margin: '0 0 15px 0',
                      fontSize: '1rem',
                      color: '#444'
                    }}>
                      <strong>When:</strong> {new Date(event.EventDate).toLocaleString()}
                      {event.Repeat && (
                        <span style={{ 
                          marginLeft: 10, 
                          padding: '3px 8px',
                          backgroundColor: '#e6f7ff',
                          color: '#0077cc', 
                          borderRadius: 4,
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          display: 'inline-block'
                        }}>
                          Repeating
                        </span>
                      )}
                    </p>
                    
                    <p style={{ 
                      margin: '0',
                      fontSize: '1rem',
                      color: 'black',
                      lineHeight: '1.5'
                    }}>
                      {event.EventDesc || 'No description provided.'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;