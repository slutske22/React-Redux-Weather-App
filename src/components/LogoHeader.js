import React from 'react'
import { Spinner1 } from './WeatherSpinner'

class LogoHeader extends React.Component {
   render () {
      return(
         <div className="LogoHeader">
            <img className="slowSpin" src="/icons/react-logo.svg" />
            <Spinner1 />
            <img className="slowSpin" src="/icons/redux-logo.svg" />
         </div>

      )
   }
}

export default LogoHeader;
