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
      console.log('from cdm', this.props.data)
      let delay = () => { this.setState({class: 'visible'}) };
      setTimeout(delay, 1)
   }

   render() {

      const { sort, view, month, type } = this.state
      // choose static array [0].datum so that new divs aren't rendered each time
      // will have same divs, but style element will change
      const dataPointNamesArray = Object.keys(this.props.data[sort][0].datum)

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

