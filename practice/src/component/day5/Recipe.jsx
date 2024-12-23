import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Recipe = () => {

    const [ingredients, setIngredients] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [newingredients, setNewIngredients] = useState([]);
    const handlefind = async() => {
        setLoading(true);
        await fetchrecipe()
    }

    const fetchrecipe = async () => {
        try {
            const response = await axios.get(`https://api.api-ninjas.com/v1/recipe?query=${ingredients}`, {
                headers: {
                    'X-Api-Key': '9qCh8KJF9BjeG7Le0prEww==vORNM1BUPOgQHURc',
                },
            }

            );
            if (response.status === 200) {
                setData(response.data);
                setLoading(false);
                console.log("Recipe fetcher", response.data);

            } else {
                console.log("Failed to load");
            }
        } catch (error) {
            console.error("error fetching recipes", error);
        }
    };

   

    

    

    const handleIngredients = (ingredients) => {
        return ingredients.split('|').map((ing, idx) => <li key={idx}>{ing.trim()}</li>);
    };

    const handleinstruction=(instructions)=>{
        return instructions.split(/\d+\.\s/).map((ing, idx) => <li key={idx}>{ing.trim()}</li>);
    
    }

    return (
        <div>
            <h1>Recipe Finder</h1>
            <input
                onChange={(e) => { setIngredients(e.target.value) }}
                type="text" placeholder='Enter you desire ingredients' />

            <button
                onClick={handlefind}
            >Find</button>
            <p>Recipes on ingredients : {ingredients}</p>
            {loading ?
                <p>Loading...</p> :
                (data.length > 0 ? (


                    data.map((content, index) => (
                        <div key={index}>

                            <h3>{content.title}</h3>
                            <h4>Ingredients</h4>
                            <ul>
                                {handleIngredients(content.ingredients)}
                            </ul>

                            <h4>Steps to follow</h4>
                            <ul>
                                {handleinstruction(content.instructions)}
                            </ul>
                        </div>

                    ))
                ) : (<p>No Recipe found</p>)

                )

            }
        </div>
    )
}

export default Recipe
