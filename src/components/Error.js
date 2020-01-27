import React from 'react';
import { connect } from 'react-redux'

const Error = props => (
      <h3 className="error">{props.callerError}</h3>
   )


const mapStateToProps = (state) => {
   return {
      callerError: state.data.callerError
   }
}

export default connect(mapStateToProps)(Error);
