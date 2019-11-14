import React from 'react';
import Empty from './Empty'
import Error from './Error'
import Week from './Week'
import LocationList from './LocationList';

class Body extends React.Component{
   constructor(props){
      super(props)
   }

   openLocationList = () => {
      this.props.openLocationList()
   }

   changeLocation = (clickedLocationIndex) => {
      this.props.changeLocation(clickedLocationIndex)
   }

   render(){
      if (this.props.dataReady && !this.props.showMoreLocations){
         return <Week locationIndex={this.props.locationIndex}
         locationData={this.props.locationData} weatherData={this.props.weatherData} showMoreLocations={this.props.showMoreLocations} openLocationList={this.openLocationList}
         />
      } else if (this.props.dataReady === '' && !this.props.showMoreLocations) {
         return <Empty />
      } else if (!this.props.dataReady && !this.props.showMoreLocations){
         return  <Error callerError={this.props.callerError}/>
      } else if (this.props.showMoreLocations){
         return <LocationList locationData={this.props.locationData} changeLocation={this.props.changeLocation}/>
      }
   }

}

export default Body
