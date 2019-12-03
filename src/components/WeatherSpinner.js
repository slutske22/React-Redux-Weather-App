// from https://codemyui.com/animated-weather-icons-in-css/

import React from 'react'
import './WeatherSpinner.css'

class WeatherSpinner extends React.Component {
   render () {
      return(
         <div className="WeatherSpinner">
            <h2>Loading Weather...</h2>
            <div className="icon sun-shower">
               <div className="cloud"></div>
               <div className="sun">
                  <div className="rays"></div>
               </div>
               <div className="rain"></div>
            </div>
         </div>
      )
   }
}

export default WeatherSpinner;
