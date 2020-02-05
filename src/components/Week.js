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
   }
   
   componentDidMount(){
      console.log('youre in the forecast')
      let delay = () => { this.setState({class: 'visible'}) };
      setTimeout(delay, 1)
   }

   render (){

      if (!this.props.dataReady || this.props.weatherSpinnerOpen){
         return <div>this is some bullshit</div>
      }

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
            <h5>Were you looking for something else?  Your search returned {this.props.locationData.length-1} other result{this.props.locationData.length > 2 ? 's' : ''}. <Link to="/locationlist" onClick={ this.props.viewLocationlist }>Click here to see {this.props.locationData.length > 2 ? 'them' : 'it'}</Link></h5>
            }
            <h5 className="history-title">
               <WeatherIcon icon="graph" className="weather-history-icon" />
               <Link to='/weatherhistory' onClick={this.props.getWeatherHistory}>View Weather History and Trends</Link>
            </h5>


            <div className="Week">
               {days}
            </div>

         </div>
      )

   }
}

const mapStateToProps = state => ({
   weatherSpinnerOpen: state.show.weatherSpinner,
   dataReady: state.data.forecast.ready,
   locationData: state.data.locations.data,
   locationIndex: state.data.locations.index,
   weatherData: state.data.forecast.data
})

const mapDispatchToProps = dispatch => {
   return {
      viewLocationlist: () => { store.dispatch( viewLocationlist() ) },
      viewWeatherHistory: () => { store.dispatch( viewWeatherHistory() ) },
      getWeatherHistory: () => { store.dispatch( getWeatherHistory() ) }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Week);
