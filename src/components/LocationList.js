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

   // componentDidUpdate(){
   //    console.log(this.props.locationIndex)
   // }

   render(){

      const locations = this.props.locationData.map( (locationResult, i) =>
         <div id={`locationResult${i}`} number={i}
         key={i} className={`location-result ${this.state.listItemStyle}`} onClick={this.changeLocation}>
         {locationResult.display_name}
         { this.props.locationIndex == i && <h5 className="current-selection">Currently selected</h5> }
         </div>
      )

      return(
         <div className="location-list">
            {this.props.locationData.length > 15 &&
               <h4>Your search returned quite a few results.  Consider making your search term more specific</h4>}
            {locations}
         </div>
      )
   }

}

export default LocationList;
