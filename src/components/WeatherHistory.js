import React from 'react';
import { connect } from 'react-redux'
import store from '../store/store'

import '../css/WeatherHistory.scss'

class WeatherHistory extends React.Component {

   state = {
      // sort: "byMonth",
      sort: "byType",
      view: "byType",
      month: 1,
      type: "Average Temperature"
   }

   componentDidMount(){
      // console.log('from cdm', this.props.data)
   }

   render() {

      const { sort, view, month, type } = this.state
      const dataPointNamesArray = Object.keys(this.props.data[sort][month].datum)

      return (
         <main className="WeatherHistory">
            <h3>Weather Trends for {this.props.locationData[this.props.locationIndex].display_name}</h3>
            <h3>Sort by: <span>Month</span> <span>Weather Detail</span></h3>

            <article className="content">

               <section className="menu">
                  {
                     this.props.data[sort].map( (dataPoint, index) =>
                        <h4 key={dataPoint.name} index={index}>{dataPoint.name}</h4> )
                  }
               </section>

               <figure>
                  {
                     dataPointNamesArray.map( (name, index) => 
                        
                        <div key={name} className="column">
                           <div className="bar">
                              {name}
                           </div>
                        </div> 
                        
                     )
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

