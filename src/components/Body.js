import React from 'react';
import { connect } from 'react-redux'

import Empty from './Empty'
import Error from './Error'
import WeatherSpinner from './WeatherSpinner'
import Week from './Week'
import LocationList from './LocationList';

class Body extends React.Component{

   render(){
      if (this.props.weatherSpinnerOpen && !this.props.callerError){

         return <WeatherSpinner />

      } else if (this.props.dataReady && !this.props.showMoreLocations){

         return <Week locationIndex={this.props.locationIndex}
         locationData={this.props.locationData} weatherData={this.props.weatherData} showMoreLocations={this.props.showMoreLocations} openLocationList={this.openLocationList}
         />

   } else if (this.props.dataReady === '' && !this.props.showMoreLocations && !this.props.callerError) {

         return <Empty />

      } else if (this.props.callerError){

         return  <Error />

      } else if (this.props.showMoreLocations){

         return <LocationList locationData={this.props.locationData} locationIndex={this.props.locationIndex} changeLocation={this.props.changeLocation}/>

      }
   }

}

const mapStateToProps = (state) => {
   return {
      dataReady: state.dataReady,
      weatherData: state.weatherData,
      locationData: state.locationData,
      showMoreLocations: state.showMoreLocations,
      locationIndex: state.locationIndex,
      callerError: state.callerError,
      weatherSpinnerOpen: state.weatherSpinnerOpen
   }
}


export default connect(mapStateToProps)(Body)
