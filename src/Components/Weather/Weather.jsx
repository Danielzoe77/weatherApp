import React, { useState, useEffect, useRef } from "react";
import "./Weather.css";
import "../../../index.css";
import cloud_icon from "./Assets/cloud.png";
import partlyCloudy from "./Assets/partlyclo.png";
import fog_icon from "./Assets/cloudy.png";
import rain_icon from "./Assets/rain.png";
import snowy_icon from "./Assets/snowy.png";
import storm_icon from "./Assets/storm.jpg";
import sun_icon from "./Assets/sun.png";
import humidity_icon from "./Assets/humidity-icon.png";
import wind_icon from "./Assets/wind.png";
import showrain_icon from "./Assets/show_rain.png";
import scatcloud_icon from "./Assets/ScatteredClouds.png";
import scatheredStorm_icon from "./Assets/scathunderst.png";

import searcch from "./Assets/searcch.png";
import "../../../index.css";

const Weather = () => {
  const inputRef = useRef();

  const [weather, setWeather] = useState(false);

  const allIcons = {
    "01d": sun_icon,
    "01n": fog_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": scatcloud_icon,
    "03n": cloud_icon,
    "04d": partlyCloudy,
    "04n": partlyCloudy,
    "09d": showrain_icon,
    "09n": showrain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": storm_icon,
    "11n": storm_icon,
    "13d": snowy_icon,
    "13n": snowy_icon,
    "50d": scatheredStorm_icon,
  };
  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || cloud_icon;
      setWeather({
        humidity: data.main.humidity,
        temperature: Math.floor(data.main.temp),
        name: data.name,
        windSpeed: data.wind.speed,
        icon: icon,
        time: new Date().toLocaleTimeString(),
      });
    } catch (error) {
      setWeather(false);
      console.error("Error in fetching data");
    }
  };

  useEffect(() => {
    search("new delhi");
  }, []);
  return (
    <div className="weathe">
      <div className="search-bar">
        <input
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              //submit form
              search(inputRef.current.value);
            }
          }}
          type="text"
          ref={inputRef}
          placeholder="search"
        />
        <img
          src={searcch}
          alt="weather_app"
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      {weather ? (
        <>
          <img src={weather.icon} alt="" className="weather-icon" />
          <p className="temperature">{weather.temperature}&deg;C</p>
          <p className="location">{weather.name}</p>
          <p className="time">{weather.time}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="weather_app" />
              <div className="data">
                <p className="title">{weather.humidity} %</p>
                <span>Humidity</span>
                {/* <span>{weather.time}</span> */}
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="weather_app" />
              <div className="data">
                <p className="title">{weather.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
