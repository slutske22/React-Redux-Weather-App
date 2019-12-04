import React from 'react'
import { Spinner1 } from './WeatherSpinner'

class LogoHeader extends React.Component {
   render () {
      return(
         <div className="LogoHeader">
            <img src="/icons/react-logo.svg" />
            <Spinner1 />
            <img src="/icons/redux-logo.svg" />
         </div>

      )
   }
}

export default LogoHeader;
