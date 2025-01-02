import React, { useEffect, useState } from 'react'
import Card from './Card';
import DialogBox from './DialogBox';

const Note_Taking = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category,setCategory]=useState("Work");
  const [keys,setkeys]=useState();
  const [categoryKey,setSerachCategoryKey]=useState("ALL");
  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : []
  });

  const [filterdata,setFilterData]=useState(notes);
 //pagination
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
  const itemsPerPage = 2; // Number of notes per page
  const totalPages = Math.ceil(filterdata.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleNotes = filterdata.slice(startIndex, endIndex);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const categoryoption={
   
    option1:"Work",
    option2:"Personal",
    option3:"Study",
  }
  const categoryfilteroption={
    option1:"ALL",
    option2:"Work",
    option3:"Personal",
    option4:"Study",
  }
  const handleform = (e) => {
    e.preventDefault();

    const newNote = { title, content: description ,category};

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setFilterData(updatedNotes)





  }
  const handledeleteAll = () => {
    setNotes([]);
    setFilterData([]);

  }
  const handledeleteNotes = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    setFilterData(updatedNotes);

  }

  const handleUpdateNotes = (index, editedTitle, editedDescription) => {
    const updatedNote=[...notes];
    updatedNote[index]={title:editedTitle,content:editedDescription};
    setNotes(updatedNote);
    setFilterData(updatedNote);

  }
//serach handle;
  const handleserach = (key) => {
    setkeys(key);
    if (key === '') {
      setFilterData(notes);
    } else {
      const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(key.toLowerCase())
      );
      setFilterData(filteredNotes);
    }
  };

  const handlecategoryfilter=(key)=>{
         setSerachCategoryKey(key);
         if(key==="ALL"){
          setFilterData(notes);
         }else{
          const filterdata=notes.filter((note)=>note.category.includes(key));
          setFilterData(filterdata);
         }
  }

  const handlecategorychange=(e)=>{
    setCategory(e.target.value);
  }
  

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes])

  



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
        <label >Category</label>
        <br />
        <select
        value={category}

        onChange={handlecategorychange}
        >
          {Object.keys(categoryoption).map((key)=>{
          return(
            <option key={key} value={categoryoption[key]}>
              {categoryoption[key]}

            </option>
            );
          })}
        </select>

        <button type='submit'>Add Note</button>
        
        


      </form>

      <input
      onChange={(e)=>{handleserach(e.target.value)}}
      value={keys}
      placeholder='search By title'></input>
      <button type='search'>Search</button>
      <p>------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
      <select
        value={categoryKey}
        onChange={(e)=>{handlecategoryfilter(e.target.value)}}
        >
          {Object.keys(categoryfilteroption).map((key)=>{
          return(
            <option key={key} value={categoryfilteroption[key]}>
              {categoryfilteroption[key]}

            </option>
            );
          })}
        </select>
      {notes.length > 1 &&
      <div>
        <DialogBox 
        handledeleteAll={handledeleteAll}
        
       
        ></DialogBox>

        <p>Total notes created: {notes.length}</p>
      </div>
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
      {filterdata.length > 2 &&
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
