import store from './store'

export const TYPE_IN_CITYNAME_FIELD = "TYPE_IN_CITYNAME_FIELD"
export const TYPE_IN_ZIP_FIELD = "TYPE_IN_ZIP_FIELD"
export const SEARCH_LOCATION = "SEARCH_LOCATION";
export const SHOW_SPINNER = "SHOW_SPINNER";
export const RECIEVE_LOCATION_DATA = "RECIEVE_LOCATION_DATA";
export const RECIEVE_WEATHER_DATA = "RECIEVE_WEATHER_DATA";
export const THROW_CALLER_ERROR = "THROW_CALLER_ERROR";
export const VIEW_LOCATIONLIST = "OPEN_LOCATIONLIST";
export const CHANGE_LOCATION = "CHANGE_LOCATION";




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
      store.dispatch( showSpinner() )
   }
   return {
      type: TYPE_IN_CITYNAME_FIELD,
      cityValue: e.target.value
   }
}

export function showSpinner(){
   return {
      type: SHOW_SPINNER,
      weatherSpinnerOpen: true
   }
}

export function searchLocation(name, searchTerm) {
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
               store.dispatch(throwCallerError("No results returned.") )
            }
         })
         .catch( error => { throw(error) } )
   }
}

export function receiveLocationData(locationData){
   return {
      type: RECIEVE_LOCATION_DATA,
      data: locationData
   }
}

export function getWeather(locationData, locationIndex) {

   store.dispatch( showSpinner() )

   const dsAPIKey = '8bc745aa5c2da5e2367d048fdb76ca8a'

   let lat = locationData[locationIndex].lat
   let lon = locationData[locationIndex].lon
   let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${dsAPIKey}/${lat},${lon}`

   console.log(url)

   //  Feed the lat lng into the weather caller
   return function () {
      return fetch(url)
         .then( results => results.json() )
         .then( weatherData => {
            // Put weather data into state object to be used in componnts
            store.dispatch( receiveWeatherData(weatherData) )
         })
         .catch( (error) => {
            console.log(error)
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
