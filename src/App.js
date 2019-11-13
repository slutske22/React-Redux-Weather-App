import React from 'react';
import Body from './Body';


//----------------------------------------------------------------//
//    Generic Use functions and terms
//----------------------------------------------------------------//

// Modulus term for flying off the end of an array
function modulus(i, n){
  return (i % n + n) % n;
}

// Some definitions for the calendar
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
var daysInAMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
var date = new Date();

// Some conversions for weather data
function kelvinToFahrenheit(degreeKelvin){
  return (degreeKelvin - 273.15) * 9/5 + 32;
}

function kelvinToCelcius(degreeKelvin){
  return (degreeKelvin - 273.15);
}



//----------------------------------------------------------------//
//    API callers
//----------------------------------------------------------------//
// Outdated but leaving for reference.
//  This whole function can be replaced with:
// fetch(url)
//    .then( response => response.json() )

// function apiCaller(url){
//   return new Promise( (resolve, reject) => {
//      var request = new XMLHttpRequest()
//      request.open('GET', url);
//      request.onload = function(){
//         if (request.status === 200) {
//           resolve(request.response)
//         } else {
//           reject(request.statusText)
//         }
//      } // .onload
//      request.send()
//   })
// }

// NOMATIM URL MAKERS

function makeOpenSearchUrl(searchTerm){
  return `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json`
}

function makeCityURL(cityName, stateName=''){
  return `https://nominatim.openstreetmap.org/search?city=${cityName}&state=${stateName}&format=json`
}

function makeZipURL(zipCode){
  return `https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&format=json`
}


var dsAPIKey = '8bc745aa5c2da5e2367d048fdb76ca8a'





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
       showMoreLocations: false
    }
    this.getLocations = this.getLocations.bind(this);
    this.getWeather = this.getWeather.bind(this);
 }

  getLocations(url){

    fetch(url)
      .then( results => results.json() )
      .then( (locationData) => {
          //  If no results returned, array length is 0.  Return error.
          if (locationData.length === 0) {
            console.log('Search did not return any results.  Try something else.');

            this.setState({
                locationData: locationData,
                dataReady: false,
                callerError: 'Search term did not return any results.  Try something else.',
                readyClass: '',
            })
          } else if (locationData.length === 1){
            this.getWeather(locationData)
            this.setState({
                locationData,
                readyClass: 'data-ready',
                callerError: ''
            })
          } else  if (locationData.length > 1){
            this.getWeather(locationData)
            this.setState({
                locationData,
                readyClass: 'data-ready',
                callerError: '',
            })
          }

      }) // then( (locationData) => (get weather))
      .catch( (error) => {console.log(error)} )
  } // getWeather()

  getWeather(locationData){

    let lat = locationData[0].lat
    let lon = locationData[0].lon
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
            showMoreLocations: false
          })
          console.log("<App /> State:", this.state);
      })
      .catch( (error) => {
          console.log(error)
      })
  }

  zipHandler = (e) => {
    const name = e.target.name;
    this.setState({[name]: e.target.value})

    if (e.keyCode === 13 && e.target.value.length > 0){
      let zipCode = this.state.zipValue;
      this.getLocations(`https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&format=json`)
    }
  }

  cityHandler = (e) => {
    const name = e.target.name;
    this.setState({[name]: e.target.value})

    if (e.keyCode === 13 && e.target.value.length > 0){
      let cityName = encodeURIComponent(this.state.cityValue);
      this.getLocations(`https://nominatim.openstreetmap.org/search?city=${cityName}&country=US&format=json`)
    }
  }

  render(){
    return (
      <div className="App">

        <h1>Seth's React Weather App</h1>

        <form className={`locator ${this.state.readyClass}`}>
          <h2>Choose your Location</h2>
          <input name="cityValue" type="text"
          placeholder="Search by City Name" value={this.state.cityValue} onChange={this.cityHandler} onKeyDown={this.cityHandler} />
          <input name="zipValue" type="number"
          placeholder="Search by Zip" value={this.state.zipValue} onChange={this.zipHandler}
          onKeyDown={this.zipHandler} />
        </form>

        <Body dataReady={this.state.dataReady} locationData={this.state.locationData}
          weatherData={this.state.weatherData}
          callerError={this.state.callerError}
          showMoreLocations={this.state.showMoreLocations} />
      </div>
    );
  }

} // App

export default App;
