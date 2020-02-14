import React from 'react'
import { connect } from 'react-redux'
import '../css/Hourly.scss'

import { normalizeArray } from '../constants'

class Hourly extends React.Component{

   render(){

      const { data, number } = this.props
      const todaysData = data.slice(1 + number*24, 1 + (number + 1)*24)

      const test = normalizeArray( todaysData.map( hour => hour.temperature), 0 ,10).map( value => Number(value.toFixed(1)) )
      console.log(test)

      const temperaturePoints = todaysData.map( (hour, index) => [index*100, hour.temperature] )
      const formattedTempPoints = JSON.stringify(temperaturePoints).split('],[').join(' ').replace('[[','').replace(']]','')

      return(

         <section className="Hourly">

            {number < 2  && <svg className="graph" viewBox="0 0 2300 100" width="100%" preserveAspectRatio="none">
               <g className="grid x-grid">
                  <line x1="0" x2="2300" y1="100" y2="100"></line>
               </g>
               <g className="grid y-grid">
                  <line x1="2" x2="2" y1="0" y2="100"></line>
               </g>
               <polyline
                  fill="none"
                  stroke="#0074d9"
                  strokeWidth="3"
                  points={formattedTempPoints} />
            </svg>}

            {number >= 2 && <div>Hourly Data Not Available</div>}

         </section>

      )
   }

}

const mapStateToProps = state => ({
   data: state.data.forecast.data.hourly.data
})

export default connect(mapStateToProps)(Hourly)