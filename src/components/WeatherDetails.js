import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { LabelList, AreaChart, Area, XAxis, ResponsiveContainer } from 'recharts';
import axios from "axios";
import * as moment from 'moment';
import WeatherNext5Days from './WeatherNext5Days';

function WeatherDetails({ latitude, longitude, lightMode }) {

  // define state for days
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  // define state for loading temprature
  const [loading, setLoading] = React.useState(false);

  // define state for temprature list hourly
  const [hourlyTempratureList, setHourlyTempratureList] = useState([])
  // define state for temprature list days
  const [daysTempratureList, setDaysTempratureList] = useState([])

  // filters the data by date and returns an object containing a list of 5-day forecast.
  const _groupByDays = data => {
    return (data.reduce((list, item) => {
      // read date
      const forecastDate = item.dt_txt.substr(0, 10);
      // create item by new date or keep old date 
      list[forecastDate] = list[forecastDate] || [];
      // add new item : new hour in this day 
      list[forecastDate].push(item);
      // return list
      return list;
    }, {}));
  };


  // read the minimum and maximum temperatures of the day 
  const _getInfo = (data, min = [], max = []) => {
    data.map(item => {
      // push new maximum temperature of the day 
      max.push(item.main.temp_max);
      // push new minimum temperature of the day 
      min.push(item.main.temp_min);
    });

    // calculate minimum and maximum of the day 
    const minMax = {
      min: Math.round(Math.min(...min)),
      max: Math.round(Math.max(...max)),
    };

    // return min, max 
    return minMax;
  }

  // use effect
  useEffect(() => {
    if (latitude > 0 && longitude > 0) {
      // create weather api url for today
      let weatherapi = "https://corsanywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=" + latitude + "&lon=" + longitude + "&appid=ba26bfe9f31ada65b884a19045dd82ef"

      // read current temprature
      axios.get(weatherapi).then((res) => {
        // reset list
        setHourlyTempratureList([])
        // create temprory list
        var temps = []

        for (let i = 0; i < 8; i++) {
          // read current date
          var current_date = new Date(res.data.list[i].dt_txt)
          // create new hour temprature
          var newHourTemp = {
            time: moment(current_date).format('HH:mm'),
            temprature: Math.round(res.data.list[i].main.temp)
          }
          // push new hour temprature
          temps.push(newHourTemp)
        }

        // add to list
        setHourlyTempratureList(temps)

        // read tempratures group by date
        var next5dayslist = Object.values(_groupByDays(res.data.list))
        // reset list
        setDaysTempratureList([])
        // reset temprory list
        temps = []

        // read temprature of next 5 days
        for (let i = 0; i < 5; i++) {

          // read date
          var date = new Date(next5dayslist[i][0].dt_txt)
          // read temprature info
          var info = _getInfo(next5dayslist[i])
          console.log(date.getDay())

          // create new day temprature
          var newDayTemp = {
            day: days[date.getDay()],
            max_temprature: info.max,
            min_temprature: info.min,
            icon: "http://openweathermap.org/img/w/" + (next5dayslist[i].length > 4 ? next5dayslist[i][4].weather[0].icon : next5dayslist[i][0].weather[0].icon) + ".png"
          }
          // push new day temprature
          temps.push(newDayTemp)
        }
        // add to list
        setDaysTempratureList(temps)

        // set loading
        setLoading(true);

      });
    }
  }, []);


  return (
    <div>
      <div className="weather-details-separator"></div>
      <span className="weather-details-label">Temperature</span>
      <div className="weather-details">
        <div className="weather-details-container">
        { loading && <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={hourlyTempratureList}
              margin={{
                top: 5,
                right: 15,
                left: 15,
                bottom: 5,
              }}>
              <XAxis dataKey="time" stroke="#fff" />
              <Area type="monotone" dataKey="temprature" stroke="#fff" fill={lightMode ? "#ffcc00" : "#80bfff"}>
                <LabelList dataKey="temprature" position="top" fill="#fff" />
              </Area>
            </AreaChart>
          </ResponsiveContainer> }
          { !loading && 
          <div>
           <CircularProgress
              size={28}
              sx={{
                color: 'lightyellow',
              }}
            />
          </div>}
        </div>
      </div>
      <br /> <br />
      <div className={lightMode ? "weather-next5days light" : "weather-next5days"} align="left">
        <WeatherNext5Days daysTempratureList={daysTempratureList} />
      </div>
      <br /> <br />
    </div>
  )
}

export default WeatherDetails
