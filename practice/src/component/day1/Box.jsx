import React from 'react'

const Box = ({item,idx,handleCheckbox,complete,removeitem}) => {
    return (
        <div key={idx}>
            <input type='checkbox'
                onChange={() =>  handleCheckbox(item) }
                checked={complete.has(item)}

                id={`item-${idx}`}></input>
            <label
                style={{
                    textDecoration: complete.has(item) ? "line-through" : "none"
                }}
                htmlFor={`item-${idx}`}>{item}</label>

            <button onClick={() =>  removeitem(item) }>Delete</button>

        </div>
    )
}

export default Box
