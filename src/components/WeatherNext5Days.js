import { Stack } from '@mui/material'
import React from 'react'

export default function WeatherNext5Days({daysTempratureList}) {
    return (daysTempratureList.map((temp, index) => (
        <div align="center" key={index}>
            <Stack>
                <div className="weather-next5days-day">{temp.day}</div>
                <div className="weather-next5days-icon">
                    <img src={temp.icon} alt="weather icon" />
                </div>
                <div className="weather-next5days-temp">
                    <span className="weather-next5days-max">{temp.max_temprature}<sup>o</sup></span>
                    <span className="weather-next5days-min">{temp.min_temprature}<sup>o</sup></span> 
                </div>
            </Stack>
        </div>
    )))
}
