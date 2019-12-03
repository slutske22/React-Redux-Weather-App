import React from 'react';
import WeatherSpinner from './WeatherSpinner'

function Empty() {
   return (
      <div className = "empty" >
         <WeatherSpinner />
      </div>
   )
}

export default Empty;
