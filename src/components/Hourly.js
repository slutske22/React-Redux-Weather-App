import React from 'react'
import { connect } from 'react-redux'

class Hourly extends React.Component{

   render(){

      const { data, number } = this.props
      const todaysData = data.slice(1 + number*24, 1 + (number + 1)*24)

      const temperaturePoints = todaysData.map( (hour, index) => [index*100, hour.temperature] )
      const formattedTempPoints = JSON.stringify(temperaturePoints).split('],[').join(' ').replace('[[','').replace(']]','')

      return(

         <section>

            {number < 2  && <svg style={{height: '100%',}} className="graph" viewBox="0 0 2400 100" width="100%" preserveAspectRatio="none">
               <g className="grid x-grid">
                  <line x1="90" x2="90" y1="5" y2="371"></line>
               </g>
               <g className="grid y-grid">
                  <line x1="90" x2="705" y1="370" y2="370"></line>
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