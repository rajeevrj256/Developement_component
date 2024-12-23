import React, { useState } from 'react'
import Box from './box';

const Todo = () => {
    const [items,setItem]=useState([]);
    const [inputvalue,setInputvalue]=useState("");
    const [complete,setComplete]=useState(new Set());
   const handlesubmit=(e)=>{
    e.preventDefault();
    if (inputvalue.trim() !== '') { 
        addItem(inputvalue);
        setInputvalue(''); 
    }
   }
    const addItem=(newitem)=>{
            setItem((previtem)=>[...previtem,newitem]);
            
    }
    const removeitem=(curitem)=>{
        setItem((previtems)=>previtems.filter((previtem)=> previtem!=curitem));
    }

    const handleCheckbox = (item) => {
        setComplete((prevComplete) => {
            const updatedComplete = new Set(prevComplete);
            if (updatedComplete.has(item)) {
                updatedComplete.delete(item); // Uncheck
            } else {
                updatedComplete.add(item); // Check
            }
            return updatedComplete;
        });
    };
    return (
        <div>
            <h1>
                TODO
            </h1>
            <form method='post' onSubmit={handlesubmit}>
                <input type="text" placeholder='Enter item to do ' 
                value={inputvalue}
                onChange={(e)=>setInputvalue(e.target.value)}/>
            <button type='submit' >add</button>
            </form>
           

                {items.map((item,idx)=>(
                    <Box item={item}
                    idx={idx} 
                    handleCheckbox={handleCheckbox}
                    complete={complete}
                    removeitem={removeitem}></Box>
                ))}
                
            
        </div>
    )
}

export default Todo
