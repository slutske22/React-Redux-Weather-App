import React from 'react';
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

      if (weatherSpinnerOpen && !callerError){

         return <WeatherSpinner />

      } else if (dataReady && !showMoreLocations && !showWeatherHistory){

         return <Week locationIndex={locationIndex}
         locationData={locationData} weatherData={weatherData} showMoreLocations={showMoreLocations} openLocationList={this.openLocationList}
         />

      } else if (showWeatherHistory) {

         return <WeatherHistory />

      } else if (dataReady === '' && !showMoreLocations && !callerError) {

         return <Empty />

      } else if (callerError){

         return  <Error />

      } else if (showMoreLocations){

         return <LocationList locationData={locationData} locationIndex={locationIndex} changeLocation={this.props.changeLocation}/>

      }
   }

}

const mapStateToProps = (state) => {
   return {
      dataReady: state.dataReady,
      weatherData: state.weatherData,
      locationData: state.locationData,
      showMoreLocations: state.showMoreLocations,
      showWeatherHistory: state.showWeatherHistory,
      locationIndex: state.locationIndex,
      callerError: state.callerError,
      weatherSpinnerOpen: state.weatherSpinnerOpen
   }
}


export default connect(mapStateToProps)(Body)
