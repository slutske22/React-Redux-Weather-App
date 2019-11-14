import React from 'react';

class LocationList extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         listItemStyle: ''
      }
  }

   render(){

      const locations = this.props.locationData.map( (locationResult, i) => 
         <div id={`locationResult${i}`}
         key={i} className={`location-result ${this.state.listItemStyle}`}>
         {locationResult.display_name}
         </div> 
      )

      return(
         <div className="location-list">
            {locations}
         </div>
      )
   }

}

export default LocationList;