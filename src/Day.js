import React from 'react';


//----------------------------------------------------------------//
//    Generic Use functions and terms
//----------------------------------------------------------------//


// Some definitions for the calendar
function modulus(i, n){
   return (i % n + n) % n;
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const daysInAMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
const date = new Date();


// from https://darksky.net/dev/docs#response-format
// 2 good icon collections:
// https://www.iconfinder.com/iconsets/weather-color-2
// https://www.iconfinder.com/iconsets/the-weather-is-nice-today
const conditions = ['clear-day', 'clear-night', 'rain', 'snow', 'sleet', 'wind', 'fog', 'cloudy', 'partly-cloudy-day', 'partly-cloudy-night']




class Day extends React.Component {
   render(){

      const { weatherData } = this.props
      const hour = new Date(weatherData.daily.data[this.props.number].time * 1000).getHours()
      const tempHi = Math.round(weatherData.daily.data[this.props.number].temperatureHigh)
      const tempLow = Math.round(weatherData.daily.data[this.props.number].temperatureLow)
      const summary = weatherData.daily.data[this.props.number].summary
      const icon = weatherData.daily.data[this.props.number].icon

      return (
         <div className="day">
         <div className="cardIndex">{ this.props.number + 1 }</div>

         <h2>{ days[ modulus(date.getDay() + this.props.number, 7) ] }</h2>
         <h2 className="date">{ months[date.getMonth()] } { modulus( date.getDate() + this.props.number, daysInAMonth[date.getMonth()] ) }</h2>
         <img className="weatherIcon" style={{width: '100px'}}
            src={`/icons/${icon}.png`}/>
         {/*<p className="summary">{summary}</p>*/}
         <p className="maxTemp">{tempHi} °F</p>
         <p className="minTemp">{tempLow} °F</p>

         </div>
      )
   }
}

export default Day;
