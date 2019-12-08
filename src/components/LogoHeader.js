import React from 'react'
import { Spinner1 } from './WeatherSpinner'
import { connect } from 'react-redux'

class LogoHeader extends React.Component {
   render () {
      return(
         <div className={`LogoHeader ${this.props.expandedClass}`}>
            <img className="slowSpin" src="/icons/react-logo.svg" />
            <Spinner1 />
            <img className="slowSpin" src="/icons/redux-logo.svg" />
         </div>

      )
   }
}

const mapStateToProps = (state) => {
   return {
      expandedClass: state.class
   }
}

export default connect(mapStateToProps)(LogoHeader);
