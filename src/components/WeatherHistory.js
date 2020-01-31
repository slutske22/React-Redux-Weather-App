import React from 'react';
import { connect } from 'react-redux'
import store from '../store/store'

import '../css/WeatherHistory.scss'

import { celciusToFerinheight } from '../constants'

class WeatherHistory extends React.Component {

   state = {
      sort: "byType",
      slot: 0,
      type: "Average Temperature"
   }

   componentDidMount(){
      let delay = () => { this.setState({class: 'visible'}) };
      setTimeout(delay, 1)
   }

   setSort = e => {
      e.persist()
      this.setState({
         sort: e.target.getAttribute('name')
      })
   }

   setDataType = e => {
      e.persist()
      this.setState({
         type: e.target.getAttribute('type'),
         slot: e.target.getAttribute('index')
      })
   }

   render() {

      const { sort, slot, type } = this.state
      // choose static array [0].datum so that new divs aren't rendered each time
      // will have same divs, but style element will change
      const dataPointBySortNamesArray = Object.keys(this.props.data[sort][0].datum)


      return (
         <main className={`WeatherHistory ${this.state.class}`}>
            <h3>Weather Trends for {this.props.locationData[this.props.locationIndex].display_name}</h3>
            <h4 className="sort-by">
               Sort by: 
               <span className={this.state.sort === 'byMonth' ? 'active' : ''} name="byMonth" onClick={this.setSort}>Month</span> 
               <span className={this.state.sort === 'byType' ? 'active' : ''} name="byType" onClick={this.setSort}>Weather Detail</span>
            </h4>

            <article className="content">

               <section className="menu">
                  {
                     this.props.data[sort].map( (dataPoint, index) =>
                        <h4 key={dataPoint.name}
                           type={dataPoint.name}
                           index={index} 
                           className={dataPoint.name === type ? 'active' : ''}
                           onClick={this.setDataType}>
                           {dataPoint.name}
                        </h4> )
                  }
               </section>

               <figure>
                  {
                     dataPointBySortNamesArray.map( name => {

                     // Numbers will have to be normalized to their range to get the bar graphs looking nice
                     // Here is a nice little discussion of thatL
                     // https://stats.stackexchange.com/questions/351696/normalize-an-array-of-numbers-to-specific-range

                        const rawValue = this.props.data[sort][slot].datum[name]
                        const numericalValue = typeof rawValue === 'number' ? rawValue : rawValue[0]
                        const dateReference = typeof rawValue === 'object' ? rawValue[1] : null
                        let dateReferenceSorted = null
                        if (dateReference) {
                           dateReferenceSorted = sort === 'byType' ? dateReference.slice(0,4) : dateReference.slice(0,4)
                        }

                        const barStyle = {
                           height: `${celciusToFerinheight(numericalValue)}%`,
                        }
                        
                        return (
                           <div key={name} className="column">

                              <div className="value">
                                 {celciusToFerinheight(numericalValue).toFixed(0)}°
                              </div>
                              <div className="bar" style={barStyle}>
                                 <div className="data-name">{name}</div>
                                 {dateReferenceSorted && 
                                 <div className="date-reference">
                                    {dateReferenceSorted}
                                 </div>
                                 }
                              </div>
                              <div className="short-name">
                                 {name.slice(0,3).toUpperCase()}
                              </div>


                           </div> 
                        )
                     })
                  }
               </figure>

            </article>

         </main>
      )
   }


}

const mapStateToProps = state => ({
   locationData: state.data.locations.data,
   locationIndex: state.data.locations.index,
   data: state.data.history.data
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(WeatherHistory)

