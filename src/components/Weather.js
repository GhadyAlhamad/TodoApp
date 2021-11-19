import React, { useState, useEffect } from 'react'
import { Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
 
function Weather({showWeatherDetails, setShowWeatherDetails, setLocation}) {
  
  // define state for days
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
 
  // define state for latitude
  const [lat, setLat] = useState([]) 
  // define state for longitude
  const [long, setLong] = useState([]) 
   
  // define state for loading temprature
  const [loading, setLoading] = React.useState(false);
  
  // define state for temprature
  const [temprature, setTemprature] = useState("") 
  // define state for main temprature description
  const [maindescription, setMainDescription] = useState("") 
  // define state for temprature description
  const [description, setDescription] = useState("") 
  // define state for country name
  const [country, setCountry] = useState("") 
  // define state for city name
  const [city, setCity] = useState("") 
  // define state for weather image
  const [image, setImage] = useState("") 
  
  // use effect
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      // set latitude of current loication
      setLat(position.coords.latitude);
      // set longitude of current location
      setLong(position.coords.longitude); 
      // set current location
      setLocation({latitude: position.coords.latitude, longitude: position.coords.longitude});
    });
 
    if (lat > 0 && long > 0) {
      // create weather api url
      let weatherapi = "https://corsanywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?units=metric&lat=" + lat + "&lon=" + long + "&appid=ba26bfe9f31ada65b884a19045dd82ef"
       
      // read current temprature
      axios.get(weatherapi ).then((res) => {
       
            // read weather image url
            let imageName = "http://openweathermap.org/img/wn/" + res.data.weather[0].icon + ".png"
            // read regions names
            let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
            
            // set temprature  
            setTemprature(Math.round(res.data.main.temp));
            // set main temprature description  
            setMainDescription(res.data.weather[0].main);
            // set temprature description  
            setDescription(res.data.weather[0].description);
            // set country name  
            setCountry(regionNames.of(res.data.sys.country));
            // set city name  
            setCity(res.data.name);
            // set image name  
            setImage(imageName);
            
            // set loading
            setLoading(true);
      });
    }
  }, [temprature, maindescription, description, country, city, image, lat, long, loading]);
   
  // define read weather details
  const readWeatherDetails = () => { 
      // set show details to true
      setShowWeatherDetails(true) 
  } 
 
  return ( loading ?
    <div className={showWeatherDetails ? "weather-summary weather-details-shown" : "weather-summary"} onClick={readWeatherDetails}> 
      <table align="center">
        <tbody>
          <tr>
            <td>
              <img src={image} alt="weather icon" className="weather-icon" />
            </td>
            <td>
              <p className="weather-row temprature">
                 {temprature}
              </p>
            </td>
            <td>
              <span className="today"><sup>o</sup>C </span>
            </td>
            <td>
              <div className="weather-row desc">
                <Stack className className="weather-location">
                  <p className="weather-row city">
                    {city}, {country}
                  </p>
                  <p className="weather-row today">
                    {days[new Date().getDay()]}
                  </p> 
                  <p className="weather-row desc">
                    {description}
                  </p>
                </Stack>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div> :
    <div className="weather-summary"> 
       <CircularProgress
            size={28}
            sx={{
              color: 'lightyellow', 
            }}
          />
    </div>
  )
}

export default Weather
