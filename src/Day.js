import React from 'react';

class Day extends React.Component {
  render(){

     const { weatherData } = this.props
     let hour = new Date(weatherData.daily.data[this.props.number].time * 1000).getHours()
     let tempHi = Math.round(weatherData.daily.data[this.props.number].temperatureHigh)
     let tempLow = Math.round(weatherData.daily.data[this.props.number].temperatureLow)
     let summary = weatherData.daily.data[this.props.number].summary

     return (
        <div className="day">
           <div className="cardIndex">{ this.props.number + 1 }</div>

           <h2>{ days[ modulus(date.getDay() + this.props.number, 7) ] }</h2>
           <h2 className="date">{ months[date.getMonth()] } { modulus( date.getDate() + this.props.number, daysInAMonth[date.getMonth()] ) }</h2>
           <img className="weatherIcon" />
           <p className="summary">{summary}</p>
           <p className="maxTemp">{tempHi} °F</p>
           <p className="minTemp">{tempLow} °F</p>

        </div>
     )
  }
}

export default Day;