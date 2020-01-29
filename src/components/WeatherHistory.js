import React from 'react';
import { connect } from 'react-redux'
import store from '../store/store'

import '../css/WeatherHistory.scss'

class WeatherHistory extends React.Component {

   state = {
      sort: "byMonth",
      view: "byType"
   }

   componentDidMount(){
      console.log('from cdm', this.props.data)
   }

   render() {
      return (
         <main className="WeatherHistory">
            <h3>Weather Trends for {this.props.locationData[this.props.locationIndex].display_name}</h3>
            <h3>Sort by: <span>Month</span> <span>Weather Detail</span></h3>

            <article className="content">

               <section className="menu">
                  {
                     this.props.data[this.state.sort].map( (dataPoint, index) =>
                        <h4>{dataPoint.name}</h4> )
                  }
               </section>

               <figure>
                  Figures here
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

