import React from 'react';
import { connect } from 'react-redux'
import store from '../store/store'
import { changeLocation } from '../store/actions'

window.store = store

class LocationList extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         listItemStyle: ''
      }
   }


   render(){

      const locations = this.props.locationData.map( (locationResult, i) =>
         <div id={`locationResult${i}`} number={i}
         key={i} className={`location-result ${this.state.listItemStyle} ${this.props.locationIndex == i ? 'current-selection' : ''}`} onClick={ this.props.changeLocation }>
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
   };



}


const mapStateToProps = (state) => {
   return {
      listOfLocations: state.data.locations
   }
}

const mapDispatchToProps = (e) => {
   return {
      changeLocation: (e) => store.dispatch( changeLocation(e) )
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(LocationList);
