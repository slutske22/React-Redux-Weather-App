import React from 'react';
import Day from './Day'
import LocationList from './LocationList'

class Week extends React.Component {
  constructor(props){
     super(props)
     this.state = {
        class: '',
        showMoreLocations: this.props.showMoreLocations,
        locationIndex: 0
     }
     this.showMoreLocations = this.showMoreLocations.bind(this)
  }

  showMoreLocations() {
     console.log(this.props.locationData);
     this.setState({showMoreLocations: true})
     console.log(this.state);
  }

  componentDidMount(){
     let delay = () => { this.setState({class: 'visible'}) };
     setTimeout(delay, 1)
  }

  render (){

     let days = [];
     for (var i = 0; i < 7 ; i++) {
        days.push(
           <Day number={i} key={i} locationData={this.props.locationData}
           weatherData={this.props.weatherData} units="F" />
        )
     }

     if (!this.state.showMoreLocations){
        return(
           <div id="forecast" className={this.state.class}>
              <h3>Weather for {this.props.locationData[this.state.locationIndex].display_name}</h3>
              <h5>Were you looking for something else?  Your search returned {this.props.locationData.length-1} other result{this.props.locationData.length > 2 ? 's' : ''}. <a href="#" onClick={this.showMoreLocations}>Click here to see {this.props.locationData.length > 2 ? 'them' : 'it'}</a></h5>
              <div className="week">
                 {days}
              </div>
           </div>
        )
     } else {
        return(
           <div id="forecast" className={this.state.class}>
              <h3>Weather for {this.props.locationData[this.state.locationIndex].display_name}</h3>
              <h5>Were you looking for something else?  Your search returned {this.props.locationData.length-1} other result{this.props.locationData.length > 2 ? 's' : ''}. <a href="#" onClick={this.showMoreLocations}>Click here to see {this.props.locationData.length > 2 ? 'them' : 'it'}</a></h5>
              <LocationList locationData={this.props.locationData}/>
           </div>
        )
     }

  }
}

export default Week;