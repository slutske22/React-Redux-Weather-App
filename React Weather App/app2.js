//----------------------------------------------------------------//
//
//    CHEMISTRY DOG'S FIRST REACT APP  :P
//
//----------------------------------------------------------------//



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


function apiCaller(url){
   return new Promise( (resolve, reject) => {
      var request = new XMLHttpRequest()
      request.open('GET', url);
      request.onload = function(){
         if (request.status === 200) {
           resolve(request.response)
         } else {
           reject(request.statusText)
         }
      } // .onload
      request.send()
   })
}

// NOMATIM URL MAKERS

function makeOpenSearchUrl(cityName){
   return `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json`
}

function makeCityURL(cityName, stateName=''){
   return `https://nominatim.openstreetmap.org/search?city=${cityName}&state=${stateName}&country=USA&format=json`
}

function makeZipURL(zipCode){
   return `https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&country=USA&format=json`
}


var dsAPIKey = '8bc745aa5c2da5e2367d048fdb76ca8a'



//----------------------------------------------------------------//
//    Openweathermaps Caller
//----------------------------------------------------------------//

// var openWeatherMapsApiKey = 'ae9a514eab7934500eeb71f723b38277';
//
// function makeCityURL(cityName){
//    return `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},us&cnt=56&mode=json&APPID=${openWeatherMapsApiKey}`
// }
// function makeZipURL(zipCode){
//    return `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&cnt=56&mode=json&APPID=${openWeatherMapsApiKey}`
// }



//----------------------------------------------------------------//
//  Building the App in React
//----------------------------------------------------------------//

class App extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         zipValue: '',
         cityValue: '',
         dataReady: false,
         callerError: false,
         weatherData: '',
         class: ''
      }
      this.renderDay = this.renderDay.bind(this);
      this.getWeather = this.getWeather.bind(this);
      this.applyWeather = this.applyWeather.bind(this);
   }
   // Openweathermaps caller
   // There's gotta be a better way to write this:
   getWeather(url){
      apiCaller(url)
         .then( (locationResults) => {
            console.log(JSON.parse(locationResults));
            return locationResults = JSON.parse(locationResults)
         })
         .then( function(locationData){
            //  If no results returned, array length is 0.  Return error.
            if (locationData.length == 0) {
               console.log('Search did not return any results.  Try something else.');

               this.setState({callerError: 'Search term did not return any results.  Try something else.'})

            } else if (locationData.length == 1){
               applyWeather(locationData)

            } else  if (locationData.length > 1){
               applyWeather(locationData)
            }

         }) // then( (locationData) => (get weather))
   } // getWeather()

   applyWeather(locationData){

      let lat = locationData[0].lat
      let lon = locationData[0].lon
      let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${dsAPIKey}/${lat},${lon}`

      //  Feed the lat lng into the weather caller
      apiCaller(url)
         .then( (weatherData) => {
            console.log('Weather for:', locationData[0].display_name);
            console.log(JSON.parse(weatherData));
            // Put weather data into state object to be used in componnts
            this.setState({
               callerError: false,
               dataReady: true,
               weatherData: JSON.parse(weatherData)
            })

         })
   }


   zipHandler = (e) => {
      this.setState({zipValue: e.target.value})

      if (e.keyCode === 13){
         let zipCode = this.state.zipValue;
         let zipUrl = makeZipURL(zipCode);
         this.getWeather(zipUrl)
      }
   }

   cityHandler = (e) => {
      this.setState({cityValue: e.target.value})

      if (e.keyCode === 13){
         let cityName = encodeURIComponent(this.state.cityValue);
         let cityUrl = makeCityURL(cityName);
         this.getWeather(cityUrl)
      }
   }

   renderDay(i) {
      return <Day number={i} data={this.state.weatherData}/>
   }

   render() {



      return (
         <div id="app">
            <div className="body">
               <form className={`locator ${this.state.readyClass}`}>
                  <h2>Choose your Location</h2>
                  <input name="city" type="text"
                     placeholder="Search by City Name" value={this.state.cityValue} onChange={this.cityHandler} onKeyDown={this.cityHandler} />
                  <input name="zip" type="number"
                     placeholder="Search by Zip" value={this.state.zipValue} onChange={this.zipHandler}
                     onKeyDown={this.zipHandler} />
               </form>
               <Body dataReady={this.state.dataReady} data={this.state.weatherData}
               callerError={this.state.callerError} />
            </div>
         </div>
      )
   }
} // App


// Body will hold either an empty div for before anything is loaded, an error message for a bad request, or the weather cards themselves
class Body extends React.Component{
   constructor(props){
      super(props)
   }

   render(){
      if (this.props.dataReady && !this.props.callerError){
         return <Week data={this.props.data} />
      } else if (!this.props.dataReady && this.props.callerError) {
         return  <Error callerError={this.props.callerError}/>
      } else {
         return <Empty />
      }
   }

}

function Empty(){
   return <div className="empty"></div>
}

class Error extends React.Component{
   constructor(props){
      super(props)
   }

   render(){
      return(
         <h3 className="error">Something's not right. Location <span>{this.props.callerError}</span></h3>
      )
   }
}

class Week extends React.Component {
   constructor(props){
      super(props)
      this.state = {class: ''}
   }

   renderDay(i) {
      return <Day number={i} data={this.props.data} units="F" />
   }

   componentDidMount(){
      let delay = () => { this.setState({class: 'visible'}) };
      setTimeout(delay, 1)
   }

   render (){
      return(
         <div id="forecast" className={this.state.class}>
            <h3>Weather for {this.props.data.city.name}</h3>
            <div className="week">
               { this.renderDay(0) }
               { this.renderDay(1) }
               { this.renderDay(2) }
               { this.renderDay(3) }
               { this.renderDay(4) }
            </div>
         </div>
      )
   }
}


class Day extends React.Component {
   render(){

      {/*Define the index from the list of 3-hour forecasts: */}
      let onceDailyIndex = 0 + this.props.number*8

      {/*Some time correction terms: */}


      // let temp = {
      //    'C': Math.floor( kelvinToCelcius(tempKelvin) ),
      //    'F': Math.floor( kelvinToFahrenheit(tempKelvin) )
      // }
      // let maxTemp = {
      //    'C': Math.floor( kelvinToCelcius(maxTempKelvin) ),
      //    'F': Math.floor( kelvinToFahrenheit(maxTempKelvin) )
      // }
      // let minTemp = {
      //    'C': Math.floor( kelvinToCelcius(minTempKelvin) ),
      //    'F': Math.floor( kelvinToFahrenheit(minTempKelvin) )
      // }

      return (
         <div className="day">
            <div className="cardIndex">{ this.props.number + 1 }</div>

            <h2>{ days[ modulus(date.getDay() + this.props.number, 7) ] }</h2>
            <h2 className="date">{ months[date.getMonth()] } { modulus( date.getDate() + this.props.number, daysInAMonth[date.getMonth()] ) }</h2>
            <img className="weatherIcon" />
            <p style={{'textTransform': 'capitalize'}}>Description</p>
            <p>Time: </p>
            <p className="maxTemp">Max Temp</p>
            <p className="minTemp">Min Temp</p>

         </div>
      )
   }
}


ReactDOM.render(
   <App />,
   document.getElementById('root')
)
