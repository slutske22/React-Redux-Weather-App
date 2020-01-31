import React from 'react';
import { Link } from 'react-router-dom'
import store from '../store/store'
import { connect } from 'react-redux'
import { viewLocationlist, viewWeatherHistory, getWeatherHistory } from '../store/actions'

import Day from './Day'
import WeatherIcon from '../svgIcons'

class Week extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         class: '',
         expandedDay: null
      }
   }


   expandDay = (clickedDay) => {
      if (this.state.expandedDay){
         this.setState({expandedDay: null})
      } else {
         this.setState({expandedDay: clickedDay})
      }
      // console.log(this.state)
   }
   
   componentDidMount(){
      let delay = () => { this.setState({class: 'visible'}) };
      setTimeout(delay, 1)
      // console.log('<Week> mounted')
   }

   render (){

      let days = [];
      for (var i = 0; i < 7 ; i++) {
         days.push(
            <Day number={i} key={i}
               locationData={this.props.locationData}
               weatherData={this.props.weatherData}
               expandDay={this.expandDay}
               expandedDay={this.state.expandedDay} units="F" />
         )
      }

      return(
         <div id="forecast" className={this.state.class}>
            <h3>Weather for {this.props.locationData[this.props.locationIndex].display_name}</h3>
            {this.props.locationData.length > 1 &&
            <h5>Were you looking for something else?  Your search returned {this.props.locationData.length-1} other result{this.props.locationData.length > 2 ? 's' : ''}. <a href="#" onClick={ this.props.viewLocationlist }>Click here to see {this.props.locationData.length > 2 ? 'them' : 'it'}</a></h5>
            }
            <h5 className="history-title">
               <WeatherIcon icon="graph" className="weather-history-icon" />
               <a href="#" onClick={this.props.getWeatherHistory}>View Weather History and Trends</a>
            </h5>
            {/* <Link onClick={this.props.viewWeatherHistory} to={'/weatherhistory'}><h5>View Weather History and Trends</h5></Link> */}

            <div className="Week">
               {days}
            </div>

         </div>
      )

   }
}

const mapDispatchToProps = dispatch => {
   return {
      viewLocationlist: () => { store.dispatch( viewLocationlist() ) },
      viewWeatherHistory: () => { store.dispatch( viewWeatherHistory() ) },
      getWeatherHistory: () => { store.dispatch( getWeatherHistory() ) }
   }
}

export default connect(mapDispatchToProps)(Week);
