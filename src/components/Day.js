import React from 'react';
import { days, daysFull, months, monthsFull } from '../constants.js'

import { cloudyIcon } from './svgIcons/Icons.js'
//----------------------------------------------------------------//
//    Generic Use functions and terms
//----------------------------------------------------------------//


// Some definitions for the calendar
function modulus(i, n){
   return (i % n + n) % n;
}

const currentTimeStamp = new Date().getTime()

function convertTimeStamp(timestamp){
   let date = new Date(timestamp * 1000)
   var hours = date.getHours() > 12 ? date.getHours() % 12 : date.getHours();
   var ampm = date.getHours() > 12 ? ' PM' : ' AM';
   var minutes = "0" + date.getMinutes();
   return hours + ':' + minutes.substr(-2) + ampm;
}


// from https://darksky.net/dev/docs#response-format
// 2 good icon collections:
// https://www.iconfinder.com/iconsets/weather-color-2
// https://www.iconfinder.com/iconsets/the-weather-is-nice-today
const conditions = ['clear-day', 'clear-night', 'rain', 'snow', 'sleet', 'wind', 'fog', 'cloudy', 'partly-cloudy-day', 'partly-cloudy-night']




class Day extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         style: 'normal'
      }
   }


   expandDay = (e) => {
      e.stopPropagation()
      // console.log(`You clicked Day # ${e.currentTarget.getAttribute('number')}`)
      let clickedDay = e.currentTarget.getAttribute('number')
      this.props.expandDay(clickedDay)
   }

   componentDidUpdate(prevProps) {

      const clickedDay = this.props.expandedDay


      if (prevProps.expandedDay !== this.props.expandedDay && clickedDay == this.props.number){
         this.setState({
            style: 'expanded'
         })
      } else if (prevProps.expandedDay !== this.props.expandedDay && clickedDay && clickedDay !== this.props.number){
         this.setState({
            style: 'faded'
         })
      } else if (prevProps.expandedDay !== this.props.expandedDay && !clickedDay){
         this.setState({
            style: 'normal'
         })
      }

   }

   render(){

      const thisDay = new Date( currentTimeStamp + 86400000 * this.props.number )

      const { weatherData } = this.props
      const { temperatureHigh, 
         temperatureLow, 
         temperatureMaxTime,
         temperatureMinTime,
         humidity, 
         sunriseTime,
         sunsetTime,
         moonPhase,
         summary, 
         icon } = weatherData.daily.data[this.props.number]

      return (
         <div className={`day ${this.state.style}`} number={this.props.number} onClick={this.expandDay} >

            {cloudyIcon}

            <div className={`summaryDay`}>
               <div className="cardIndex">{ this.props.number }</div>

               <h2>
                  { days[ thisDay.getDay() ] }
               </h2>
               <h2 className="date">
                  { months[thisDay.getMonth()] } { thisDay.getDate() }
               </h2>
               <img className="weatherIcon" style={{width: '100px'}} src={`icons/${icon}.png`} alt={summary} title={summary} />
               <p className="maxTemp">{temperatureHigh.toFixed(0)} °F</p>
               <p className="minTemp">{temperatureLow.toFixed(0)} °F</p>
            </div>


            <div className="expandedDay">
               <img className="weatherIcon"
                  src={`icons/${icon}.png`} alt={summary} title={summary} />
               <h2>{ daysFull[ thisDay.getDay() ] }, { monthsFull[ thisDay.getMonth() ] } { thisDay.getDate() }</h2>
               <p>{summary}</p>
               <p><span className="temp">{Math.round(temperatureHigh)}°F</span> High at {convertTimeStamp(temperatureMaxTime)}</p>
               <p><span className="temp">{Math.round(temperatureLow)}°F</span> Low at {convertTimeStamp(temperatureMinTime)}</p>
               <p>Humidity: {humidity * 100}%</p>
               <div className="sunrise-sunset">
                  <img className="sunriseIcon" style={{width: '64px'}} src={`icons/sunrise.png`} alt="sunrise" title="sunrise icon" />
                  <p>Sunrise: {convertTimeStamp(sunriseTime)}</p>
                  <img className="sunriseIcon" style={{width: '64px'}} src={`icons/sunrise.png`} alt="sunrise" title="sunrise icon" />
                  <p>Sunset: {convertTimeStamp(sunsetTime)}</p>

               </div>
            </div>

         </div>
      )
   }
}

export default Day;






// weatherData.data[number]:
// {
//   "time": 1574496000,
//   "summary": "Clear throughout the day.",
//   "icon": "clear-day",
//   "sunriseTime": 1574519280,
//   "sunsetTime": 1574556360,
//   "moonPhase": 0.91,
//   "precipIntensity": 0,
//   "precipIntensityMax": 0.0005,
//   "precipIntensityMaxTime": 1574579160,
//   "precipProbability": 0.04,
//   "temperatureHigh": 71.14,
//   "temperatureHighTime": 1574546160,
//   "temperatureLow": 51.79,
//   "temperatureLowTime": 1574605200,
//   "apparentTemperatureHigh": 70.64,
//   "apparentTemperatureHighTime": 1574546160,
//   "apparentTemperatureLow": 52.28,
//   "apparentTemperatureLowTime": 1574605200,
//   "dewPoint": 45.7,
//   "humidity": 0.57,
//   "pressure": 1018.4,
//   "windSpeed": 2.47,
//   "windGust": 9.47,
//   "windGustTime": 1574550120,
//   "windBearing": 314,
//   "cloudCover": 0.09,
//   "uvIndex": 4,
//   "uvIndexTime": 1574538300,
//   "visibility": 8.409,
//   "ozone": 282.2,
//   "temperatureMin": 53.82,
//   "temperatureMinTime": 1574520060,
//   "temperatureMax": 71.14,
//   "temperatureMaxTime": 1574546160,
//   "apparentTemperatureMin": 54.31,
//   "apparentTemperatureMinTime": 1574520060,
//   "apparentTemperatureMax": 70.64,
//   "apparentTemperatureMaxTime": 1574546160
// }
