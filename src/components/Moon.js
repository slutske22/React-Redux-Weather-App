import React from 'react'
import '../css/Moon.scss'

const Moon = props => {

   const shadowStyle = {
      left: `${2 * ( 0.5 - props.moonPhase ) * 100}%`,
   }

   return (
      <div className="Moon">
         <div className="outline"></div>
         <div className="shadow" style={shadowStyle}></div>
      </div>
   )

}

export default Moon