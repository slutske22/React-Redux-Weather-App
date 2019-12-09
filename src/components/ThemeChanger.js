import React from 'react'
import store from '../store/store'
import { connect } from 'react-redux'

class ThemeChanger extends React.Component {
   render () {
      return (
         <div className="ThemeChanger">
            <h5 onClick={this.props.activateLightTheme}>Light Theme</h5>
            <h5>&nbsp;|&nbsp;</h5>
            <h5 onClick={this.props.activateDarkTheme}> Dark Theme</h5>
         </div>
      )
   }
}

const mapDispatchToProps = () => {
   return {
      activateDarkTheme: 'function',
      activateLightTheme: 'function'
   }
}

export default connect(null, mapDispatchToProps)(ThemeChanger);
