import React from 'react';

class LocationList extends React.Component {
  constructor(props){
     super(props)
     this.state = {
        listItemStyle: ''
     }
  }

  render(){

     let locations = []
     for (let i = 0; i < this.props.locationData.length; i++){
        locations.push(
           <div id={`locationResult${i}`}
           key={i}
           className={`location-result ${this.state.listItemStyle}`}>
              {this.props.locationData[i].display_name}
           </div>
        )
     }

     return(
        <div className="location-list">
           {locations}
        </div>
     )
  }

}

export default LocationList;