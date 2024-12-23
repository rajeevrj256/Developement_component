import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [fetching,setfetch]=useState(true);
  const [details, setdetails] = useState({
    overall:"",
    weather_descriptions:"",
    city: "",
    region: "",
    temp: "",
    humidity: "",
    pressure: "",
    visibility: ""

  })
  const fetchwheather = async () => {
    setfetch(true);
    
    const options = {
      method: 'GET',
      url: `https://api.weatherstack.com/current?access_key=ae02963f598a251e4881322e8ff5410c&query=${city}`,



    };
    try {
      const response = await axios.request(options);
    
      
      setdetails({
        overall:response.data.current.weather_icons,
        weather_descriptions:response.data.current.weather_descriptions,
        city: response.data.location.name,
        region: response.data.location.region,
        temp: response.data.current.temperature,
        humidity: response.data.current.humidity,
        pressure:response.data.current.pressure ,
        visibility:response.data.current.visibility
      })

    
      setfetch(false);

      console.log(response.data);
    } catch (error) {
      console.error(error);
      setdetails({...details,city:"No matching city"});
      
    }finally{
      setfetch(false);
    }

  }
  useEffect(()=>{
    console.log(details);
  },[details]);

  return (
    <div>
      <h1>Your WeatherApp</h1>
      <input
        onChange={(e) => { setCity(e.target.value) }}
        placeholder='Enter city' />
      <button onClick={fetchwheather}
      disabled={city.length===0}
      >Fetch</button>
      {fetching?
      <p>Loading...</p>
      :(
        details.city && (
          (details.city==="No matching city")?<p>"No matching  city</p>
          :<div>
            <h3>Details about {city}:</h3>
            <p >Weather: {details.weather_descriptions}</p>
            <img src={details.overall} alt="overall" 
            />
            
            <p>Region: {details.region}</p>
            <p>Temperature: {details.temp} celsius</p>
            <p>Humidity: {details.humidity}</p>
            <p>Pressure: {details.pressure}</p>
            <p>Visibility: {details.visibility}</p>
          </div>
        )
      )
    }

    </div>
  );
}

export default WeatherApp;
