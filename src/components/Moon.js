import React from 'react'
import '../css/Moon.scss'
import { drawPlanetPhase } from '../moonphase'

class Moon extends React.Component{

   shadowStyle = {
      left: `${2 * ( 0.5 - this.props.moonPhase ) * 100}%`,
   }

   moonPhaseStyle = {
      lightColour: 'white',
      diameter: 3,
      earthshine: 0
   }

   componentDidMount(){

      const id = document.getElementById(`Moon-${this.props.number}`)

      // Adapting the darksky lunation number to fit with the drawPlanetPhase function lunation number and shadow side
      const moonPhase = this.props.moonPhase <= 0.5 ? this.props.moonPhase * 2 : (1-this.props.moonPhase) * 2
      const shadowRight = this.props.moonPhase <= 0.5 ? true : false

      drawPlanetPhase(id, moonPhase, shadowRight);
      
   }

   render(){

      return (
         // <div className="Moon">
         //    <div className="outline"></div>
         //    <div className="shadow" style={this.shadowStyle}></div>
         // </div>
         <>
            <div id={`Moon-${this.props.number}`}></div>
            <div>DS Lunation #: {this.props.moonPhase}</div>
         </>
      )
   }


}

export default Moon