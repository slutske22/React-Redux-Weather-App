import React from 'react'
import { connect } from 'react-redux'
import '../css/Hourly.scss'

import { normalizeArray, svgPath, bezierCommand } from '../constants'

class Hourly extends React.Component{

   render(){

      const { data, number } = this.props
      const todaysData = data.slice(1 + number*24, 1 + (number + 1)*24)

      const test = normalizeArray( todaysData.map( hour => hour.temperature), 20 ,80).map( value => Number(value.toFixed(1)) )
      // console.log('test', test)

      const temperaturePoints = todaysData.map( (hour, index) => [index*100, 100 - test[index]] )
      // console.log('temperaturePoints', temperaturePoints)
      // const formattedTempPoints = JSON.stringify(temperaturePoints).split('],[').join(' ').replace('[[','').replace(']]','')
      const formattedTempPoints = svgPath(temperaturePoints, bezierCommand, 0.2)

      return(

         <section className="Hourly">

            <svg className="graph" viewBox="0 0 2300 100" width="100%" preserveAspectRatio="none">
               <g className="grid x-grid">
                  <line x1="0" x2="2300" y1="100" y2="100"></line>
               </g>
               <g className="grid y-grid">
                  <line x1="2" x2="2" y1="0" y2="100"></line>
               </g>
               <path
                  fill="none"
                  stroke="#0074d9"
                  strokeWidth="3"
                  d={formattedTempPoints} />

               {todaysData.map( (datapoint, index) => {
                  return (
                     <rect onMouseEnter={ () => console.log(datapoint)} x={index*100} y="0" width="100" height="100" style={{fill: `rgba(200,200,200, ${0.2 * (index % 2 === 0 ? 0 : 1)})`, stroke: 'grey', strokeWidth: 1}} />
                  )
               })}
               

            </svg>

            {todaysData.length < 23 && <div>Hourly Data Not Available</div>}

         </section>

      )
   }

}

const mapStateToProps = state => ({
   data: state.data.forecast.data.hourly.data
})

export default connect(mapStateToProps)(Hourly)