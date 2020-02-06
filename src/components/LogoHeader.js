import React from 'react'
import { withRouter } from 'react-router-dom'
import { Spinner1 } from './WeatherSpinner'
import { connect } from 'react-redux'

class LogoHeader extends React.Component {
   render () {
      return(
         <div className={`LogoHeader ${
            (this.props.history.location.pathname !== '/'
               && (this.props.forecastReady || this.props.weatherHistoryReady)) 
               || this.props.weatherSpinnerOpen 
                  ? 'step-aside' 
                  : ''
         }`}>
            <img className="slowSpin" src="/icons/react-logo.svg" />
            <Spinner1 />
            <img className="slowSpin" src="/icons/redux-logo.svg" />
         </div>

      )
   }
}

const mapStateToProps = (state) => {
   return {
      weatherSpinnerOpen: state.show.weatherSpinner,
      forecastReady: state.data.forecast.ready,
      weatherHistoryReady: state.data.history.ready
   }
}

export default connect(mapStateToProps)(withRouter(LogoHeader));
