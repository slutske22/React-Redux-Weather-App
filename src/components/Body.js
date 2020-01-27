import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { connect } from 'react-redux'

import Empty from './Empty'
import Error from './Error'
import WeatherSpinner from './WeatherSpinner'
import Week from './Week'
import LocationList from './LocationList';
import WeatherHistory from './WeatherHistory'

class Body extends React.Component{

   render(){

      const { dataReady, weatherData, locationData, showMoreLocations, showWeatherHistory, locationIndex, callerError, weatherSpinnerOpen } = this.props   


      return (
         <Router>
            {weatherSpinnerOpen && <WeatherSpinner />}
            {dataReady && !callerError && !weatherSpinnerOpen && !showMoreLocations && !showWeatherHistory && 
               <Week locationIndex={locationIndex}
               locationData={locationData} weatherData={weatherData} showMoreLocations={showMoreLocations} openLocationList={this.openLocationList}
               />}
            {showWeatherHistory && <WeatherHistory />}
            {callerError && <Error />}
            {showMoreLocations &&  
               <LocationList locationData={locationData} locationIndex={locationIndex} />}

            <Switch>
               <Route exact path="/" component={Empty} />
               <Route path="/forecast" component={Week} />
               <Route path="/locationlist" component={LocationList} />
               <Route path="/weatherhistory" component={WeatherHistory} />
            </Switch>
         </Router>
      )

   }

}

const mapStateToProps = (state) => {
   return {
      dataReady: state.data.forecast.ready,
      weatherData: state.data.forecast.data,
      locationData: state.data.locations.data,
      showMoreLocations: state.show.moreLocations,
      showWeatherHistory: state.show.weatherHistory,
      locationIndex: state.data.locations.index,
      callerError: state.data.callerError,
      weatherSpinnerOpen: state.show.weatherSpinner
   }
}


export default connect(mapStateToProps)(Body)
