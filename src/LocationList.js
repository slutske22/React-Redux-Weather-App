import React from 'react';

class LocationList extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         listItemStyle: ''
      }
   }

   changeLocation = (e) => {
      let clickedLocationIndex = e.target.getAttribute('number')
      this.props.changeLocation(clickedLocationIndex)
   }

   render(){

      const locations = this.props.locationData.map( (locationResult, i) =>
         <div id={`locationResult${i}`} number={i}
         key={i} className={`location-result ${this.state.listItemStyle}`} onClick={this.changeLocation}>
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
