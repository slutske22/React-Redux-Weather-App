// from https://codemyui.com/animated-weather-icons-in-css/

import React from 'react'
import './WeatherSpinner.css'

class WeatherSpinner extends React.Component {
   render () {
      return(
         <div className="WeatherSpinner">
            <h2>Loading Weather...</h2>
            <div class="icon sun-shower">
               <div class="cloud"></div>
               <div class="sun">
                  <div class="rays"></div>
               </div>
               <div class="rain"></div>
            </div>
         </div>
      )
   }
}

export default WeatherSpinner;
