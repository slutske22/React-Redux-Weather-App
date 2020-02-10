import React from 'react';
import { connect } from 'react-redux'
import { colorTemperature2rgb } from 'color-temperature'

import '../css/WeatherHistory.scss'

class WeatherHistory extends React.Component {

   state = {
      sort: "byType",
      slot: 0,
      type: "Average Temperature",
      unit: 'f',
      subzero: {
         active: false,
         ratio: undefined
      },
      tooFarWarning: false
   }

   componentDidMount(){
      let delay = () => { this.setState({class: 'visible'}) };
      setTimeout(delay, 1)
   }

   componentDidUpdate(){

      if (!this.props.data || this.props.weatherSpinnerOpen) {
         return null
      }
      
      const { sort, slot, unit } = this.state
      const data = this.props.data[sort]
      // choose static array [0].datum so that new divs aren't rendered each time
      // will have same divs, but style element will change
      const dataPointBySortNamesArray = Object.keys(data[0].datum[unit].raw)

      // Create an array of values (need to pull numerical value out of record-hi or lo values, which are arrays with a value and date)
      const unfilteredValues = dataPointBySortNamesArray.map( name => {
         const value  = data[slot].datum[unit].raw[name]
         if (typeof value === 'number') {
            return value
         } else {
            return value[0]
         }
      }) // unfilteredValues

      // Filter out inifinity values so that the ratio can be calculated properly with each time the user changes the type or slot
      const values = unfilteredValues.filter( value => {
         if (value === Infinity || value === -Infinity){
            return false
         }
         return true
      })

      let ratio

      if ( values.some( value => value < 0) ) {
         ratio = Number((Math.abs( Math.min(...values) / (Math.abs( Math.min(...values)) + Math.abs( Math.max(...values))) ) * 100).toFixed(0))
         this.setState( prevState => {
            if (prevState.subzero.ratio !== ratio) {
               return {
                  subzero: {
                     ...this.state.subzero,
                     active: true,
                     ratio
                  }
               }
            }
         })
      } else {
         this.setState( prevState => {
            if (prevState.subzero.ratio !== 0) {
               return {
                  subzero: {
                     ...this.state.subzero,
                     active: false,
                     ratio: 0
                  }
               }
            }
         })
      }
   }

   setSort = e => {
      e.persist()
      this.setState({
         sort: e.target.getAttribute('name'),
         type: e.target.getAttribute('type'),
         slot: 0
      })
   }

   setDataType = e => {
      e.persist()
      this.setState({
         slot: e.target.getAttribute('index'),
         type: e.target.getAttribute('type'),
      })
   }

   TooFarIcon = () => 
      <>
         near <sup><span role="img" aria-label="Too Far Warning" className="too-far-icon"
            onMouseMove={ (e) => {this.setState({tooFarWarning: [e.clientX, e.clientY]})}}
            onMouseLeave={() => this.setState({tooFarWarning: false})}
            >
            ⚠️
            </span></sup>
      </>

   TooFarWarning = () => 
      <div className="too-far-warning" 
         style={{position: 'fixed', left: this.state.tooFarWarning[0], top: this.state.tooFarWarning[1]}} 
         // onMouseLeave={() => this.setState({tooFarWarning: false})}
         >
         No weather stations closer than 20km offer weather history data.  This data comes from the {this.props.station.name} station, {this.props.station.distance} km from your searched location.
      </div>

   render() {

      if (!this.props.data || this.props.weatherSpinnerOpen) {
         return null
      }

      const { sort, slot, unit, type, subzero: { ratio } } = this.state
      const { data, locationData, locationIndex, station: { distance } } = this.props
      // choose static array [0].datum so that new divs aren't rendered each time
      // will have same divs, but style element will change
      const dataPointBySortNamesArray = Object.keys(data[sort][0].datum[unit].raw)

      return (
         <main className={`WeatherHistory ${this.state.class}`}>
            <h3>Weather Trends { distance > 20 ? <this.TooFarIcon /> : 'for'} {locationData[locationIndex].display_name}</h3>
            <h4 className="sort-by">
               Sort by: 
               <span className={sort === 'byMonth' ? 'active' : ''} name="byMonth" type="January" onClick={this.setSort}>Month</span> 
               <span className={sort === 'byType' ? 'active' : ''} name="byType" type="Average Temperature" onClick={this.setSort}>Weather Detail</span>
               {this.state.tooFarWarning && <this.TooFarWarning />}
            </h4>

            <article className="content">

               <section className="menu">
                  {
                     data[sort].map( (dataPoint, index) =>
                        <h4 key={dataPoint.name}
                           type={dataPoint.name}
                           index={index} 
                           className={dataPoint.name === type ? 'active' : ''}
                           onClick={this.setDataType}
                        >
                           {dataPoint.name}
                        </h4> )
                  }
               </section>

               <figure>
                  
                  <div className="positive" style={{height: `${100-ratio}%`}}>
                     {
                        dataPointBySortNamesArray.map( name => {

                        // Numbers will have to be normalized to their range to get the bar graphs looking nice
                        // Here is a nice little discussion of thatL
                        // https://stats.stackexchange.com/questions/351696/normalize-an-array-of-numbers-to-specific-range

                           const rawValue = data[sort][slot].datum[unit].raw[name]
                           const numericalValue = typeof rawValue === 'number' ? rawValue : rawValue[0]
                           const dateReference = typeof rawValue === 'object' ? rawValue[1] : null

                           let dateReferenceSorted = null
                           let dataPointAvailable = true


                           if (dateReference) {
                              dateReferenceSorted = sort === 'byType' ? dateReference.slice(0,4) : dateReference.slice(0,4)
                           }

                           console.log(numericalValue)

                           const rawCelciusValue = data[sort][slot].datum.c.raw[name]
                           const celciusValue = typeof rawCelciusValue === 'number' ? rawCelciusValue : rawCelciusValue[0]
                           const adaptedColor = colorTemperature2rgb((31-celciusValue)*400)

                        // Dynamic styles --------------------------------------------
                           const columnStyle = {
                              width: `calc(${1/dataPointBySortNamesArray.length} * 100%)` 
                           }

                           const barStyle = {
                              height: `calc(${numericalValue}% - 25px)`,
                              backgroundColor: `rgb(
                                 ${adaptedColor.red},
                                 ${adaptedColor.green ? adaptedColor.green : 0},
                                 ${adaptedColor.blue}
                              )`
                           }

                        // Conditionals on dynamic styles for values below 0, or infinity values
                           if (numericalValue < 0) {
                              barStyle.height = `${Math.abs(numericalValue)}%`
                              barStyle.bottom = `${numericalValue}%`
                              barStyle.borderBottom = `1px solid var(--foreground-color)`
                           }

                           if (numericalValue === Infinity || numericalValue === -Infinity){
                              dataPointAvailable = false
                              barStyle.height = '100%'
                              barStyle.backgroundColor = 'rgb(82,82,82)';
                              barStyle.background = 'linear-gradient(0deg, rgba(82,82,82,1) 0%, rgba(82,82,82,0) 100%)';
                              barStyle.border = 'none'
                              barStyle.borderBottom = 'none'
                           }
                           
                           return (
                              <div key={name} style={columnStyle} className="column">

                                 <div className="bar" style={barStyle}>
                                 

                                    {dataPointAvailable && <div className="value">
                                       {numericalValue.toFixed(0)}°
                                    </div>}

                                    {sort === 'byMonth' && <div className="data-name">{name}</div>}

                                    {!dataPointAvailable && <div className="not-available">Data not available</div>}

                                    {dateReferenceSorted && dataPointAvailable &&
                                       <div className="date-reference">
                                          {dateReferenceSorted}
                                       </div>
                                    }

                                 </div>  {/* bar */}

                                 {sort === 'byType' && <div className="short-name">
                                    {name.slice(0,3).toUpperCase()}
                                 </div>}

                              </div> // column
                           )
                        })
                     }
                  </div> {/* end positive */}

                  <div className={`negative`} style={{height: `${ratio}%`}}>
                  </div>
                  
               </figure>

            </article>

         </main>
      )
   }


}

const mapStateToProps = state => ({
   weatherSpinnerOpen: state.show.weatherSpinner,
   data: state.data.history.data,
   station: state.data.history.station,
   locationData: state.data.locations.data,
   locationIndex: state.data.locations.index,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(WeatherHistory)

