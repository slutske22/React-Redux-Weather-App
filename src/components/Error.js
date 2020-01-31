import React from 'react';
import { connect } from 'react-redux'

import WeatherIcon from '../svgIcons'

const Error = props => (
      <div className="Error">
         <WeatherIcon icon="warning" className="warning-icon" />
         <h3 className="error">{props.callerError}</h3>
      </div>
   )


const mapStateToProps = (state) => {
   return {
      callerError: state.data.callerError
   }
}

export default connect(mapStateToProps)(Error);
