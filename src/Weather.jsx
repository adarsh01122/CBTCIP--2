import React, { useState } from "react";
import "./Weather.css"
// import { useState } from 'react'
const api = {
  key: "f447eb4adb4d3d81cc21300c95bdf7ef",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [inputData, setinputData] = useState("");
  const [weather, setweather] = useState({});
 
  const search = (evt) => {
    // console.log(evt.key)

    if (evt.key === "Enter") {
      // it search the inputdata with the api and store in inputdata
      fetch(`${api.base}weather?q=${inputData}&units=metric&APPID=${api.key}`)
        .then((response) => response.json())
        .then(
          (result) => setweather(result),
          setinputData(""),
          console.log(weather)
        );
    }
  };

  const dateBuilder = (d) => {
    // d retuning the whole date,time day month
    let months = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "Octuber",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thrusday",
      "Friday",
      "Satuarday",
    ];

    let day = days[d.getDay()]; // getting day from the d = get Date()
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}  ${date} ${month} ${year}`;
  };

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp >16 )  ?'appwarm': 'appwinter') :'appnrml'} >

      <main>
        
        <div className="searchbox">
          <input
            type="text"
            className="searchbar"
            placeholder="Search Weather..."
            value={inputData}
            onChange={(e) => {
              setinputData(e.target.value);
            }}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main !="undefined")?(<div>
          <div className="locationbox">
            <div className="location"> {weather.name} {weather.sys.country}</div>

            <div className="date">{dateBuilder(new Date())}</div>
          </div>

          <div className="wetherbox">
            <div className="temp">
                {Math.round(weather.main.temp)}°C 
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>):('')}
        
      </main>
    </div>
  );
};

export default Weather;
