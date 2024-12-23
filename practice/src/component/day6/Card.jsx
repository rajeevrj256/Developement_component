import React, { useState } from 'react';
import './style.css'; // Import the CSS file

const Card = ({ note, index, handledeleteNotes, handleUpdateNotes }) => {
  const [editing, setEditing] = useState(false); // Tracks if the card is in edit mode
  const [editedTitle, setEditedTitle] = useState(note.title); // Tracks the edited title
  const [editedDescription, setEditedDescription] = useState(note.content); // Tracks the edited description

  const handleSaveClick = () => {
    handleUpdateNotes(index, editedTitle, editedDescription); // Call the update function
    setEditing(false); // Exit edit mode
    console.log(editing);
  };
  const handleEditClick = () => {
    setEditing(true); // Enter edit mode
  };

  return (
    <div className="card"> {/* Apply the card styles */}
      {editing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Edit Title"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Edit Description"
          />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <button onClick={() => handledeleteNotes(index)}>Delete</button>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Card;
