import React from 'react';
import { connect } from 'react-redux'
import store from '../store/store'

import '../css/WeatherHistory.scss'

import { celciusToFerinheight } from '../constants'

class WeatherHistory extends React.Component {

   state = {
      // sort: "byMonth",
      sort: "byType",
      view: "byMonth",
      slot: 0,
      type: "Average Temperature"
   }

   componentDidMount(){
      // console.log('from cdm', this.props.data)
      console.log('from cdm', this.props.data)
      let delay = () => { this.setState({class: 'visible'}) };
      setTimeout(delay, 1)
   }

   setDataType = e => {
      e.persist()
      console.log(e)
      this.setState({
         type: e.target.getAttribute('type'),
         slot: e.target.getAttribute('index')
      })
   }

   render() {

      const { sort, view, slot, type } = this.state
      // choose static array [0].datum so that new divs aren't rendered each time
      // will have same divs, but style element will change
      const dataPointBySortNamesArray = Object.keys(this.props.data[sort][0].datum)
      const dataPointByViewNamesArray = Object.keys(this.props.data[view][0].datum)

      console.log(this.props.data[sort][slot])
      // console.log(this.props.data[view])

      return (
         <main className={`WeatherHistory ${this.state.class}`}>
            <h3>Weather Trends for {this.props.locationData[this.props.locationIndex].display_name}</h3>
            <h4 className="sort-by">
               Sort by: 
               <span className={this.state.sort === 'byMonth' ? 'active' : ''}>Month</span> 
               <span className={this.state.sort === 'byType' ? 'active' : ''}>Weather Detail</span>
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
                     dataPointBySortNamesArray.map( (name, index) => {

                        const barStyle = {
                           height: `${celciusToFerinheight(this.props.data[sort][slot].datum[name])}%`,
                           // transition: 'height 250ms'
                        }
                        
                        return (
                           <div key={name} className="column">

                              <div className="bar" style={barStyle}>
                                 {name}
                              </div>
                              <div className="value">
                                 {celciusToFerinheight(this.props.data[sort][slot].datum[name]).toFixed(0)}°
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

