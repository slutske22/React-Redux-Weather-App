import React from 'react';
import { connect } from 'react-redux'


import Empty from './Empty'
import Error from './Error'
import Week from './Week'
import LocationList from './LocationList';

class Body extends React.Component{

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
         return <LocationList locationData={this.props.locationData} locationIndex={this.props.locationIndex} changeLocation={this.props.changeLocation}/>
      }
   }

}

const mapStateToProps = (state) => {
   return {
      dataReady: state.dataReady,
      weatherData: state.weatherData,
      locationData: state.locationData,
      showMoreLocations: state.showMoreLocations,
      locationIndex: state.locationIndex
   }
}


export default connect(mapStateToProps)(Body)
