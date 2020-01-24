import store from './store'
import { lightTheme, darkTheme } from '../components/ThemeChanger'
import { monthsFull } from '../constants.js'


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
const meteoStatKey = 'ISjQKF2F'


export function geolocateUser(){

   const options = {
      enableHighAccuracy: true,
      maxTimeout: 5000,
   }

   const success = (userLocation) => {

      // Get user's location and time of day
      // console.log('userLocation', userLocation)
      const userCurrentTime = userLocation.timestamp

      const lat = userLocation.coords.latitude
      const lon = userLocation.coords.longitude
      const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${dsAPIKey}/${lat},${lon}`

      // Fetch weather data and get sunrise and sunset time
      // Compare with user's current time to choose night or day theme
      fetch(url)
         .then( results => results.json() )
         .then( userWeather => {
            // console.log('localWeather', userWeather)
            const userSunriseTime = userWeather.daily.data[0].sunriseTime*1000
            const userSunsetTime = userWeather.daily.data[0].sunsetTime*1000

            // console.log('userSunriseTime', userSunriseTime, 'userSunsetTime', userSunsetTime, 'userCurrentTime', userCurrentTime);

            if (userSunriseTime < userCurrentTime && userCurrentTime < userSunsetTime){
               console.log('it is daytime');
               store.dispatch( setTheme(lightTheme) )
            } else {
               console.log('it is nighttime')
               store.dispatch( setTheme(darkTheme) )
            }



            // const timeofDay = userSunriseTime < userCurrentTime && userCurrentTime < userSunsetTime
            //    ? store.dispatch( setTheme(lightTheme) )
            //    : store.dispatch( setTheme(darkTheme) )

            // console.log(timeofDay);

         })
   }

   const error = (error) => {
      console.log(error)
   }

   navigator.geolocation.getCurrentPosition(success, error, options)

}


export function setTheme(theme){
   document
      .documentElement.style.setProperty("--foreground-color", theme.foregroundColor);
   document
      .documentElement.style.setProperty("--background-color", theme.backgroundColor);
   return{
      type: CHANGE_THEME,
      payload: theme
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
   // console.log(url)
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


   let meteostatSearchUrl = `https://api.meteostat.net/v1/stations/nearby?lat=${lat}&lon=${lon}&limit=1&key=${meteoStatKey}`


   return function () {

      fetch(url)
         .then( results => results.json() )
         .then( weatherData => {
            store.dispatch( receiveWeatherData(weatherData) )
         })
         .catch( (error) => {
            store.dispatch(throwCallerError(error.message))
         })

      // fetch(meteostatSearchUrl)
      //    .then( response => response.json() )
      //    .then( historyData => {
      //       console.log('meteostat weatherstations near search term', historyData)
      //       getWeatherHistory(historyData.data[0].id)
      //    })
   }
}




export function getWeatherHistory(weatherStationNumber){

   let meteostatHistoryURL = `https://api.meteostat.net/v1/history/monthly?station=${weatherStationNumber}&start=2009-01&end=2019-12&key=${meteoStatKey}`

   fetch(meteostatHistoryURL)
      .then( response => response.json() )
      .then( data => console.log('meteostat history', data) )

}


export const testDataProcessing = () => {



   const dataByMonth = [];
   for (var i = 0; i <= 11; i++) {
      dataByMonth.push({})
   }

   function processData(data){
      dataByMonth.forEach( (month, index) => {

         const allData = filterByMonth(data, index+1)

         month.month = monthsFull[index]
         month.allData = allData
         month.averageTemp = averageTemps( allData.map( month => month.temperature_mean) ).toFixed(1)
         month.averageHigh = averageTemps( allData.map( month => month.temperature_mean_max) ).toFixed(1)
         month.averageLow = averageTemps( allData.map( month => month.temperature_mean_min) ).toFixed(1)
         month.recordHigh = [
            Math.max( ...nullFilteredMaxArray(allData.map( month => month.temperature_max) )).toFixed(1),
            allData[indexOfMaxValue( nullFilteredMaxArray(allData.map( month => month.temperature_max) ))].month 
         ]
         month.recordLow = [
            Math.min( ...nullFilteredMinArray(allData.map( month => month.temperature_min)) ).toFixed(1),
            allData[indexOfMinValue( nullFilteredMinArray(allData.map( month => month.temperature_min) ))].month 
         ]

      } ) //forEach
   } // processData

   const filterByMonth = (data, month) => {
      return data.filter( entry => Number(entry.month.slice(entry.month.length-2, entry.month.length)) === month )
   }

   const averageTemps = temps => temps.reduce( (a, b) => a + b, 0) / temps.length

   // Get index of max value(s) in an array
   // bitten from https://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array/11301464
   const indexOfMaxValue = a => a.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
   const indexOfMinValue = a => a.reduce((iMin, x, i, arr) => x < arr[iMin] ? i : iMin, 0);

   // Filter out null values of an array
   const filterArrayByNull = array => array.filter( item => item )

   // To find min and max, and indexes thereof, need to turn null into infinity (when looking for min) and turn null into -infinity (when looking for max)
   // bitten from https://stackoverflow.com/questions/11817861/math-min-apply-returns-0-for-null
   const nullFilteredMaxArray = array => array.map( item => item == null ? -Infinity : item )
   const nullFilteredMinArray = array =>  array.map( item => item == null ? Infinity : item )

   const maxTemp = temps => Math.max(...temps)

   console.log(dataByMonth)





   fetch('./sampleData.json')
      .then( response => response.json() )
      .then( data => processData(data.data) ) // average over all januaries
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
