import React from 'react';
import { connect } from 'react-redux'

class Error extends React.Component{

   render(){
      return(
         <h3 className="error">{this.props.callerError}</h3>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      callerError: state.callerError
   }
}

export default connect(mapStateToProps)(Error);
