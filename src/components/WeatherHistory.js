import React from 'react';
import { connect } from 'react-redux'
import store from '../store/store'

import '../css/WeatherHistory.scss'

class WeatherHistory extends React.Component {

   state = {
      sort: "byMonth"
   }

   render() {
      return (
         <main className="WeatherHistory">
            <h3>Weather Trends for {this.props.locationData[this.props.locationIndex].display_name}</h3>

            <article className="content">

               <section className="menu">
                  Menu stuff here
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

