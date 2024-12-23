import { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);
    const [inputvalue, setinputvalue] = useState(0);

    return (
        <div>
            <p >Count: {count}</p>
            <button  
            onClick={() => { setCount(count + 1) }}>Increase</button>
            <button onClick={() => {
                if (count >0) {

                    setCount(count - 1);

                }
            }} 
            disabled={count<=0}
            >Decrease</button>
            <button onClick={() => { setCount(0) }}>Reset</button>

            <input placeholder="add value"
                
                onChange={(e) => { setinputvalue(e.target.value) }}
            >
            </input>
            <button onClick={() => { setCount(count + parseInt(inputvalue)) || 0 }}>Add</button>
        </div>
    )
}

export default Counter;