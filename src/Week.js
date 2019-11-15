import React from 'react';
import Day from './Day'
import LocationList from './LocationList'

class Week extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         class: '',
         locationIndex: 0
      }
      this.openLocationList = this.openLocationList.bind(this)
   }

   openLocationList() {
      this.props.openLocationList()
   }
   
   componentDidMount(){
      let delay = () => { this.setState({class: 'visible'}) };
      setTimeout(delay, 1)
   }

   componentDidUpdate(prevState) {
      // Typical usage (don't forget to compare props):
      if (this.state.weatherData !== prevState.weatherData) {
        console.log('Weather Data Changed');
      }
    }

   render (){

      let days = [];
      for (var i = 0; i < 7 ; i++) {
         days.push(
            <Day number={i} key={i} locationData={this.props.locationData}
            weatherData={this.props.weatherData} units="F" />
         )
      }

      return(
         <div id="forecast" className={this.state.class}>
         <h3>Weather for {this.props.locationData[this.props.locationIndex].display_name}</h3>
         {this.props.locationData.length > 1 &&
            <h5>Were you looking for something else?  Your search returned {this.props.locationData.length-1} other result{this.props.locationData.length > 2 ? 's' : ''}. <a href="#" onClick={this.openLocationList}>Click here to see {this.props.locationData.length > 2 ? 'them' : 'it'}</a></h5>
         }
         <div className="week">
         {days}
         </div>
         </div>
      )

   }
}

export default Week;
