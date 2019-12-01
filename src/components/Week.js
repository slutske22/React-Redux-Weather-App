import React from 'react';
import Day from './Day'

class Week extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         class: '',
         expandedDay: null
      }
      this.openLocationList = this.openLocationList.bind(this)
   }

   openLocationList() {
      this.props.openLocationList()
   }

   expandDay = (clickedDay) => {
      if (this.state.expandedDay){
         this.setState({expandedDay: null})
      } else {
         this.setState({expandedDay: clickedDay})
      }
      // console.log(this.state)
   }
   
   componentDidMount(){
      let delay = () => { this.setState({class: 'visible'}) };
      setTimeout(delay, 1)
      // console.log('<Week> mounted')
   }

   // componentDidUpdate(prevProps) {
   //    console.log('<Week> state', this.state)
   // }

   render (){

      let days = [];
      for (var i = 0; i < 7 ; i++) {
         days.push(
            <Day number={i} key={i}
               locationData={this.props.locationData}
               weatherData={this.props.weatherData}
               expandDay={this.expandDay}
               expandedDay={this.state.expandedDay} units="F" />
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
