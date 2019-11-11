import React from 'react';
import Empty from './Empty'
import Error from './Error'
import Week from './Week'

class Body extends React.Component{
  constructor(props){
     super(props)
  }

  render(){
     if (this.props.dataReady){
        return <Week locationData={this.props.locationData} weatherData={this.props.weatherData} showMoreLocations={this.props.showMoreLocations}/>
     } else if (this.props.dataReady === '') {
        return <Empty />
     } else if (!this.props.dataReady){
        return  <Error callerError={this.props.callerError}/>
     }
  }

}

export default Body