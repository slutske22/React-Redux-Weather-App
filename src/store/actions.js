import store from './store'

export const GEOLOCATE_USER = "GEOLOCATE_USER";

export const TYPE_IN_CITYNAME_FIELD = "TYPE_IN_CITYNAME_FIELD"
export const TYPE_IN_ZIP_FIELD = "TYPE_IN_ZIP_FIELD"
export const SEARCH_LOCATION = "SEARCH_LOCATION";
export const SHOW_SPINNER = "SHOW_SPINNER";
export const RECIEVE_LOCATION_DATA = "RECIEVE_LOCATION_DATA";
export const RECIEVE_WEATHER_DATA = "RECIEVE_WEATHER_DATA";
export const THROW_CALLER_ERROR = "THROW_CALLER_ERROR";
export const VIEW_LOCATIONLIST = "OPEN_LOCATIONLIST";
export const CHANGE_LOCATION = "CHANGE_LOCATION";
export const CHANGE_THEME = "CHANGE_THEME";

const dsAPIKey = '8bc745aa5c2da5e2367d048fdb76ca8a'



export function geolocateUser(){

   const options = {
      enableHighAccuracy: true,
      maxTimeout: 5000,
   }

   const success = (userLocation) => {

      // Get user's location and time of day
      console.log('userLocation', userLocation)
      const userCurrentTime = userLocation.timestamp

      const lat = userLocation.coords.latitude
      const lon = userLocation.coords.longitude
      const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${dsAPIKey}/${lat},${lon}`

      // Fetch weather data and get sunrise and sunset time
      // Compare with user's current time to choose night or day theme
      fetch(url)
         .then( results => results.json() )
         .then( userWeather => {
            console.log('localWeather', userWeather)
            const userSunriseTime = userWeather.daily.data[0].sunriseTime*1000
            const userSunsetTime = userWeather.daily.data[0].sunsetTime*1000

            console.log('userSunriseTime', userSunriseTime, 'userSunsetTime', userSunsetTime, 'userCurrentTime', userCurrentTime);

            const timeofDay = userSunriseTime < userCurrentTime < userSunsetTime
               ? 'It is daytime'
               : 'It is nighttime'

            console.log(timeofDay);

         })
   }

   const error = (error) => {
      console.log(error)
   }

   navigator.geolocation.getCurrentPosition(success, error, options)

}


export function typeZip(e){
   if (e.keyCode === 13 && e.target.value.trim().length > 0){
      let searchTerm = encodeURIComponent(e.target.value)
      searchLocation('zipValue', searchTerm)()
   }
   return {
      type: TYPE_IN_ZIP_FIELD,
      zipValue: e.target.value
   }
}

export function typePlacename(e){
   if (e.keyCode === 13 && e.target.value.trim().length > 0){
      let searchTerm = encodeURIComponent(e.target.value)
      searchLocation('cityValue', searchTerm)()
   }
   return {
      type: TYPE_IN_CITYNAME_FIELD,
      cityValue: e.target.value
   }
}

export function showSpinner(message){
   return {
      type: SHOW_SPINNER,
      weatherSpinnerOpen: message
   }
}

export function searchLocation(name, searchTerm) {

   const makeSearchTerm = {
      domestic: {
         cityValue: function(cityValue){
            return `https://nominatim.openstreetmap.org/search?q=${cityValue}&limit=50&format=json`
         },
         zipValue: function(zipValue){
            return `https://nominatim.openstreetmap.org/search?postalcode=${zipValue}&country=US&limit=50&format=json`
         }
      },
      international: {
         cityValue: function(cityValue){
            return `https://nominatim.openstreetmap.org/search?city=${cityValue}&limit=50&format=json`
         },
         zipValue: function(zipValue){
            return `https://nominatim.openstreetmap.org/search?postalcode=${zipValue}&limit=50&format=json`
         }
      }
   }

   store.dispatch( showSpinner('Loading Weather...') )

   const url = makeSearchTerm.domestic[name](searchTerm)
   console.log(url)
   return function() {
      return fetch(url)
         .then( response => response.json() )
         .then ( locationData => {
            // console.log( locationData )
            if (locationData.length >= 1){
               store.dispatch( receiveLocationData( locationData ) )
               getWeather(locationData, store.getState().locationIndex)()
            } else if (locationData.length > 2){
               store.dispatch( receiveLocationData( locationData ) )
               getWeather(locationData, store.getState().locationIndex)()

            } else {
               store.dispatch(throwCallerError("No results returned.  Try another search term.") )
            }
         })
         .catch( error => {
            store.dispatch(throwCallerError(error))
            throw(error)
         } )
   }
}

export function receiveLocationData(locationData){
   return {
      type: RECIEVE_LOCATION_DATA,
      data: locationData
   }
}

export function getWeather(locationData, locationIndex) {

   // If weatherspinner is already open from location search, don't open it again
   if (!store.getState().weatherSpinnerOpen){
      store.dispatch( showSpinner('Loading Weather...') )
   }

   //  Feed the lat lng into the weather caller
   let lat = locationData[locationIndex].lat
   let lon = locationData[locationIndex].lon
   let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${dsAPIKey}/${lat},${lon}`

   console.log(url)

   return function () {
      return fetch(url)
         .then( results => results.json() )
         .then( weatherData => {
            store.dispatch( receiveWeatherData(weatherData) )
         })
         .catch( (error) => {
            store.dispatch(throwCallerError(error.message))
         })
   }
}

export function receiveWeatherData(data){
   return {
      type: RECIEVE_WEATHER_DATA,
      data: data,
      weatherSpinnerOpen: false
   }
}

export function throwCallerError(error){
   return {
      type: THROW_CALLER_ERROR,
      error: error
   }
}



export function viewLocationlist(){
   return {
      type: VIEW_LOCATIONLIST,
      showMoreLocations: true
   }
}

export function changeLocation(e){
   getWeather(store.getState().locationData, e.target.getAttribute('number'))()
   return {
      type: CHANGE_LOCATION,
      showMoreLocations: false,
      chosenIndex: e.target.getAttribute('number')
   }
}

export function changeTheme(theme){
   document
      .documentElement.style.setProperty("--foreground-color", theme.foregroundColor);
   document
      .documentElement.style.setProperty("--background-color", theme.backgroundColor);
   return{
      type: CHANGE_THEME,
      payload: theme
   }
}
