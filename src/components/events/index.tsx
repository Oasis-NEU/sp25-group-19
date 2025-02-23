import "./index.css";

const Events = () => {
    return (
        <div>
            <h1 className = 'heading-style'>This is our events page</h1>
            <label for="Events">Events</label>
            <textarea id="Events" name="Events" rows="10" cols="100"></textarea>
            
        </div>
    )
}

export default Events;

// Types of data it will hold
// String = Description of what the event is
// String = When the event happens
// Add some sort option to allow the event to repeat