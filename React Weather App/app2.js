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
//    Openweathermaps Caller
//----------------------------------------------------------------//

var openWeatherMapsApiKey = 'ae9a514eab7934500eeb71f723b38277';

function makeCityURL(cityName){
   return `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},us&cnt=56&mode=json&APPID=${openWeatherMapsApiKey}`
}
function makeZipURL(zipCode){
   return `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&cnt=56&mode=json&APPID=${openWeatherMapsApiKey}`
}




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
         weatherData: '',
         class: ''
      }
      this.renderDay = this.renderDay.bind(this)
      this.getWeather = this.getWeather.bind(this)
   }

   // There's gotta be a better way to write this:
   getWeather(url){
      (function(){
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
      })()
      .then( (data) => {
         return JSON.parse(data)
      })
      .then( (parsedData) => {
         this.setState( {dataReady: true, weatherData: parsedData, readyClass: 'data-ready'} )
      })
      .then( () => {
         if (this.state.dataReady){
            console.log(this.state)
         }
      })
      .catch( (error) => {
         this.setState({dataReady: false})
         console.log(error)
         console.log(this.state)
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
               <Body dataReady={this.state.dataReady} data={this.state.weatherData} />
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
      if (this.props.dataReady){
         return <Week data={this.props.data} />
      } else {
         return  <Empty />
      }
   }

}

function Empty(){
   return <div className="empty"></div>
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

      let onceDailyIndex = 0 + this.props.number*8
      let icon = this.props.data.list[onceDailyIndex].weather[0].icon
      let description = this.props.data.list[onceDailyIndex].weather[0].description
      let time = this.props.data.list[onceDailyIndex].dt_txt
      let iconPath = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      let tempKelvin = this.props.data.list[onceDailyIndex].main.temp
      let temp = {
         'C': Math.floor( kelvinToCelcius(tempKelvin) ),
         'F': Math.floor( kelvinToFahrenheit(tempKelvin) )
      }

      return (
         <div className="day">
            <div className="cardIndex">{ this.props.number + 1 }</div>

            <h2>{ days[ modulus(date.getDay() + this.props.number, 7) ] }</h2>
            <h2 className="date">{ months[date.getMonth()] } { modulus( date.getDate() + this.props.number, daysInAMonth[date.getMonth()] ) }</h2>
            <img className="weatherIcon" src={iconPath} />
            <p>Time: {time}</p>
            <p>Temp: {temp[this.props.units]} °{this.props.units}</p>
            <p style={{'textTransform': 'capitalize'}}>{description}</p>
         </div>
      )
   }
}


ReactDOM.render(
   <App />,
   document.getElementById('root')
)
