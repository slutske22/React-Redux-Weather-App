import React from 'react'
import store from '../store/store'
import { connect } from 'react-redux'

import { typeZip, typePlacename, searchLocation } from '../store/actions'

class SearchBar extends React.Component{
   constructor(props){
      super(props)
   }

   render(){
      return (
         <form className={`locator ${this.props.readyClass}`}>
            <h2>{`Choose your Location (from <Search />)`}</h2>

            <input name="cityValue" type="text"
            placeholder="Search by City Name" value={this.props.cityValue} onChange={this.props.placenameHandler} onKeyDown={this.props.placenameHandler} />

            <input name="zipValue" type="number"
            placeholder="Search by Zip" value={this.props.zipValue} onChange={this.props.zipHandler}
            onKeyDown={this.props.zipHandler} />
         </form>
      )
   }
}

const mapStateToProps = state => {
   return {
      cityValue: state.cityValue,
      zipValue: state.zipValue
   }
}

const mapDispatchToProps = (e) => {
   return {
      placenameHandler: (e) => store.dispatch( typePlacename(e) ),
      zipHandler: (e) =>  store.dispatch( typeZip(e) )
   }
}



export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)