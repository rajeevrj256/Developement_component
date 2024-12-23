import React, { useEffect, useState } from 'react'
import Card from './Card';

const Note_Taking = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : []
  });

   const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
  const itemsPerPage = 2; // Number of notes per page

  const totalPages = Math.ceil(notes.length / itemsPerPage);
  const handleform = (e) => {
    e.preventDefault();

    const newNote = { title, content: description };

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);





  }
  const handledeleteAll = () => {
    setNotes([]);

  }
  const handledeleteNotes = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);

  }

  const handleUpdateNotes = (index, editedTitle, editedDescription) => {
    const updatedNote=[...notes];
    updatedNote[index]={title:editedTitle,content:editedDescription};
    setNotes(updatedNote);

  }

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes])

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleNotes = notes.slice(startIndex, endIndex);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));



  return (
    <div>
      <form method='post' onSubmit={handleform}>
        <label htmlFor="">Title:</label>
        <br />
        <input
          onChange={(e) => { setTitle(e.target.value) }}
          type="text"
          placeholder='Enter Title ' />
        <br />
        <label htmlFor="">Description:</label>
        <br />
        <textarea
          onChange={(e) => { setDescription(e.target.value) }}
          placeholder='Enter Description ' />
        <br />

        <button type='submit'>Add Note</button>


      </form>
      <p>------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
      {notes.length > 1 &&
        <button onClick={handledeleteAll}>Delete ALL</button>
      }
      <div>
        {
          visibleNotes.map((note, index) => (

            <Card note={note} key={index}
              index={index}
              handledeleteNotes={handledeleteNotes}
              handleUpdateNotes={handleUpdateNotes}></Card>
          )
      )}
      </div>
      {notes.length > 2 &&
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
}
    </div>
   
  )
}

export default Note_Taking
