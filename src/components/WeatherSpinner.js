// from https://codemyui.com/animated-weather-icons-in-css/

import React from 'react'
import './WeatherSpinner.css'

const Spinner1 = () => {
   return(
      <div className="icon sun-shower">
         <div className="cloud"></div>
         <div className="sun">
            <div className="rays"></div>
         </div>
         <div className="rain"></div>
      </div>
   )
}

const Spinner2 = () => {
   return (
      <div className="icon thunder-storm">
         <div className="cloud"></div>
         <div className="lightning">
            <div className="bolt"></div>
            <div className="bolt"></div>
         </div>
      </div>
   )
}

const Spinner3 = () => {
   return (
      <div className="icon cloudy">
         <div className="cloud"></div>
         <div className="cloud"></div>
      </div>
   )
}

const Spinner4 = () => {
   return (
      <div className="icon flurries">
         <div className="cloud"></div>
         <div className="snow">
            <div className="flake"></div>
            <div className="flake"></div>
         </div>
      </div>
   )
}

const Spinner5 = () => {
   return (
      <div className="icon sunny">
         <div className="sun">
            <div className="rays"></div>
         </div>
      </div>
   )
}

const Spinner6 = () => {
   return (
      <div className="icon rainy">
         <div className="cloud"></div>
         <div className="rain"></div>
      </div>
   )
}

const allSpinners = [
   <Spinner1 />,
   <Spinner2 />,
   <Spinner3 />,
   <Spinner4 />,
   <Spinner5 />,
   <Spinner6 />
]



class WeatherSpinner extends React.Component {

   render () {

      const index = Math.floor( Math.random() * allSpinners.length )

      return(
         <div className="WeatherSpinner">
            <h2 className="loading">Loading Weather...</h2>
            {allSpinners[index]}
         </div>
      )
   }
}

export default WeatherSpinner;
