import React from 'react';

//----------------------------------------------------------------//
//    Generic Use functions and terms
//----------------------------------------------------------------//


// Some definitions for the calendar
function modulus(i, n){
   return (i % n + n) % n;
}

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const daysFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthsFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysInAMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
const date = new Date();


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

      const { weatherData } = this.props
      const hour = new Date(weatherData.daily.data[this.props.number].time * 1000).getHours()
      const tempHi = Math.round(weatherData.daily.data[this.props.number].temperatureHigh)
      const tempLow = Math.round(weatherData.daily.data[this.props.number].temperatureLow)
      const summary = weatherData.daily.data[this.props.number].summary
      const icon = weatherData.daily.data[this.props.number].icon

      return (
         <div className={`day ${this.state.style}`} number={this.props.number} onClick={this.expandDay} >

            <div className={`summaryDay`}>
               <div className="cardIndex">{ this.props.number }</div>

               <h2>{ days[ modulus(date.getDay() + this.props.number, 7) ] }</h2>
               <h2 className="date">{ months[date.getMonth()] } { modulus( date.getDate() + this.props.number, daysInAMonth[date.getMonth()] ) }</h2>
               <img className="weatherIcon" style={{width: '100px'}}
                  src={`icons/${icon}.png`} alt={summary} title={summary} />
               {/*<p className="summary">{summary}</p>*/}
               <p className="maxTemp">{tempHi} °F</p>
               <p className="minTemp">{tempLow} °F</p>
            </div>


            <div className="expandedDay">
               <h2>{ daysFull[ modulus(date.getDay() + this.props.number, 7) ] }, { monthsFull[date.getMonth()] } { modulus( date.getDate() + this.props.number, daysInAMonth[date.getMonth()] ) }</h2>
               <p>{summary}</p>
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
