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



//----------------------------------------------------------------//
//    Openweathermaps Caller
//----------------------------------------------------------------//

var openWeatherMapsApiKey = 'ae9a514eab7934500eeb71f723b38277';
// var cityName = 'los%20angeles';
// var zipCode = 92109;
// Endpoint for a 7 day forecast.  can also use `?zip=${zip}` instead of `q=${cityName},us` to get as a function of zip code
// var urlCity = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},us&cnt=7&mode=json&APPID=${openWeatherMapsApiKey}`
// var urlZip = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&cnt=7&mode=json&APPID=${openWeatherMapsApiKey}`


function makeCityURL(cityName){
   return `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},us&cnt=7&mode=json&APPID=${openWeatherMapsApiKey}`
}
function makeZipURL(zipCode){
   return `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&cnt=7&mode=json&APPID=${openWeatherMapsApiKey}`
}


function getWeather(url){
   return new Promise( (resolve, reject) => {
      var weatherRequest = new XMLHttpRequest()
      weatherRequest.open('GET', url);
      weatherRequest.onload = function(){
         if (weatherRequest.status === 200) {
           resolve(weatherRequest.response)
         } else {
           reject(weatherRequest.statusText)
         }
      } // .onload
      weatherRequest.send()
   })
}

// getWeather(urlCity).then( (data) => {
//    console.log(JSON.parse(data));
// }).catch( (error) => {
//    console.log(error);
// })
//
// getWeather(urlZip).then( (data) => {
//    console.log(JSON.parse(data));
// }).catch( (error) => {
//    console.log(error);
// })






//----------------------------------------------------------------//
//  Building the App in React
//----------------------------------------------------------------//

class App extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         dataReady: false,
         data: ''
      }
   }


   render() {
      return (
         <div className="app">
            <div className="body">
               <Locator />
               <Week />
            </div>
         </div>
      )
   }
}


class Locator extends React.Component{
   render() {
      return(
         <form className="locator">
            <h2>Choose your Location</h2>
            <Input name="city" type="text" placeholder="Search by City Name" />
            <Input name="zip" type="number" placeholder="Search by Zip" />
         </form>
      )
   }
}


class Input extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         value: '',
         dataReady: false
      }
      this.changeHandler = this.changeHandler.bind(this);
      this.inputHandler = this.inputHandler.bind(this);
   }

   changeHandler(e){
      this.setState({value: e.target.value})
   }

   inputHandler(e){
      // -------- If you're in the zip search field: ------------------------
      if (this.props.name === "zip"){
         // Code to limit the length of the zip Code
         // TODO: Make it work properly
         // if (this.state.value.length > 4){
         //    console.log("Value is too long");
         //    e.target.value = this.state.value.slice(0,5);
         // }

         // Once user presses enter
         if (e.keyCode === 13){
            let zipCode = this.state.value;
            let zipUrl = makeZipURL(zipCode);
            getWeather(zipUrl)
               .then( (data) => {
                  console.log(JSON.parse(data));
               })
               .then( this.setState({dataReady: true}) )
               .then( console.log(this.state) )
               .catch( (error) => {
                  this.setState({dataReady: false})
                  console.log(error);
               })
         }
      // -------- If you're in the City Search field: ----------------------
      } else if (this.props.name === "city"){
         if (e.keyCode === 13){
            let cityName = encodeURIComponent(this.state.value);
            let cityUrl = makeCityURL(cityName);
            getWeather(cityUrl).
               then( (data) => {
                  console.log(JSON.parse(data));
               })
               .then( this.setState({dataReady: true}) )
               .then( console.log(this.state) )
               .catch( (error) => {
                  this.setState({dataReady: false})
                  console.log(error);
               })
         }
      }
   }

   render() {
      return <input type={this.props.type} placeholder={this.props.placeholder} value={this.state.value} onChange={this.changeHandler} onKeyUp={this.inputHandler}></input>
   }
}


class Week extends React.Component {
   renderDay(i) {
      return <Day number={i}/>
   }

   render (){
      return(
         <div className="week">
            { this.renderDay(0) }
            { this.renderDay(1) }
            { this.renderDay(2) }
            { this.renderDay(3) }
            { this.renderDay(4) }
            { this.renderDay(5) }
            { this.renderDay(6) }
         </div>
      )
   }
}

class Day extends React.Component {
   render(){
      return (
         <div className="day">
            <div className="cardIndex">{ this.props.number + 1 }</div>

            <h2>{ days[ modulus(date.getDay() + this.props.number, 7) ] }</h2>
            <h2>{ months[date.getMonth()] } { modulus( date.getDate() + this.props.number, daysInAMonth[date.getMonth()] ) }</h2>
         </div>
      )
   }
}


ReactDOM.render(
   <App />,
   document.getElementById('root')
)
