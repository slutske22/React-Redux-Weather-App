import React from 'react';
import store from '../store/store'
import { connect } from 'react-redux'

import SearchBar from './Search'
import Body from './Body';

window.store = store

//----------------------------------------------------------------//
//    Generic Use functions and terms
//----------------------------------------------------------------//

// Some conversions for weather data
function kelvinToFahrenheit(degreeKelvin){
   return (degreeKelvin - 273.15) * 9/5 + 32;
}

function kelvinToCelcius(degreeKelvin){
   return (degreeKelvin - 273.15);
}
// -------------------------------------------------------- //



class App extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         zipValue: '',
         cityValue: '',
         callerError: false,
         dataReady: '',
         locationData: '',
         weatherData: '',
         class: '',
         multipleLocationResults: false,
         showMoreLocations: false,
         locationIndex: 0, // default - always get first result
      }
   }


   changeLocation = (clickedLocationIndex) => {
      // clickedLocationIndex is passed up from LocationList
      this.setState({locationIndex: clickedLocationIndex})
      this.getWeather( this.state.locationData, clickedLocationIndex )
   }

   render(){
      return (
         <div className="App">

         <h1>Seth's React Redux Weather App</h1>

         <SearchBar />

         <Body dataReady={this.props.dataReady}
         locationIndex={this.props.locationIndex}
         weatherData={this.props.weatherData}
         callerError={this.props.callerError}
         showMoreLocations={this.props.showMoreLocations}
         openLocationList={this.openLocationList}
         locationData={this.props.locationData}
         changeLocation={this.changeLocation}
         />
         </div>
      );
   }

} // App

const mapStateToProps = (state) => {
   const {dataReady, locationIndex, weatherData, callerError, showMoreLocations, openLocationList, locationData, changeLocation} = state
   return {
      dataReady, 
      locationIndex, 
      weatherData, 
      callerError, 
      showMoreLocations, 
      openLocationList, 
      locationData, 
      changeLocation
   }
}

export default connect(mapStateToProps)(App);
