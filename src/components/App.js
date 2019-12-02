import React from 'react';
import Body from './Body';


import store from '../store/store'
import { viewLocationlist } from '../store/actions'

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

const dsAPIKey = '8bc745aa5c2da5e2367d048fdb76ca8a'

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

   getLocations = (url) => {

      fetch(url)
      .then( results => results.json() )
      .then( (locationData) => {
         const { locationIndex } = this.state;

         // When enter is pressed and locations are fetched, reset data as not ready (to dismount the week component for animation pruposes) and absorb location data into the state to be used down the chain
         this.setState({
            dataReady: false,
            locationData
         })

         //  If no results returned, array length is 0.  Return error.
         if (locationData.length === 0) {
            console.log('Search did not return any results.  Try something else.');

            this.setState({
               callerError: 'Search term did not return any results.  Try something else.',
               readyClass: '',
            })
         } else  if (locationData.length >= 1){
            this.getWeather(locationData, locationIndex)
            this.setState({
               readyClass: 'data-ready',
               callerError: '',
            })
         }
      }) // then( (locationData) => (get weather))
      .catch( (error) => {console.log(error)} )

   } // getWeather()

   getWeather = (locationData, locationIndex) => {

      let lat = locationData[locationIndex].lat
      let lon = locationData[locationIndex].lon
      let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${dsAPIKey}/${lat},${lon}`

      //  Feed the lat lng into the weather caller
      fetch(url)
      .then( results => results.json() )
      .then( weatherData => {
         // Put weather data into state object to be used in componnts
         this.setState({
            callerError: false,
            dataReady: true,
            weatherData: weatherData,
            showMoreLocations: false,
         })
         // console.log("<App /> State:", this.state);
      })
      .catch( (error) => {
         console.log(error)
      })
   }

   makeSearchTerm = {
      domestic: {
         cityValue: function(cityName){
            return `https://nominatim.openstreetmap.org/search?q=${cityName}&limit=50&format=json`
         },
         zipValue: function(zipCode){
            return `https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&country=US&limit=50&format=json`
         }
      },
      international: {
         cityValue: function(cityName){
            return `https://nominatim.openstreetmap.org/search?city=${cityName}&limit=50&format=json`
         },
         zipValue: function(zipCode){
            return `https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&limit=50&format=json`
         }
      }
   }

   searchHandler = (e) => {
      const name = e.target.name;
      this.setState({[name]: e.target.value})

      if (e.keyCode === 13 && e.target.value.length > 0){
         this.getLocations( this.makeSearchTerm.domestic[name](this.state[name]) )
         // reset to first index with search search
         this.setState({locationIndex: 0})
      }
   }


   openLocationList = () => {
      this.setState({showMoreLocations: true})
   }

   changeLocation = (clickedLocationIndex) => {
      // clickedLocationIndex is passed up from LocationList
      this.setState({locationIndex: clickedLocationIndex})
      this.getWeather( this.state.locationData, clickedLocationIndex )
   }

   render(){
      return (
         <div className="App">

         <h1>Seth's React Weather App</h1>

         <form className={`locator ${this.state.readyClass}`}>
         <h2>Choose your Location</h2>
         <input name="cityValue" type="text"
         placeholder="Search by City Name" value={this.state.cityValue} onChange={this.searchHandler} onKeyDown={this.searchHandler} />
         <input name="zipValue" type="number"
         placeholder="Search by Zip" value={this.state.zipValue} onChange={this.searchHandler}
         onKeyDown={this.searchHandler} />
         </form>

         <Body dataReady={this.state.dataReady}
         locationIndex={this.state.locationIndex} locationData={this.state.locationData}
         weatherData={this.state.weatherData}
         callerError={this.state.callerError}
         showMoreLocations={this.state.showMoreLocations}
         openLocationList={this.openLocationList}
         locationData={this.state.locationData}
         changeLocation={this.changeLocation}
         />
         </div>
      );
   }

} // App

export default App;
