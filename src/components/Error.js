import React from 'react';
import { useSelector } from 'react-redux'

import WeatherIcon from '../svgIcons'

const Error = props => {

   const callerError = useSelector(state => state.data.callerError)
   const loaderingScreenOpen = useSelector(state => state.show.weatherSpinner)
   
   if (!loaderingScreenOpen){
      return(
         <div className="Error">
            <WeatherIcon icon="warning" className="warning-icon" />
            <h3 className="error">{callerError}</h3>
         </div>
      )
   }

   return null

}

export default Error
