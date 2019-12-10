import React from 'react'
import store from '../store/store'
import { lightenTheme, darkenTheme } from '../store/actions'
import { connect } from 'react-redux'

const darkTheme = {
   "--foreground-color": "white",
   "--background-color": "black"
}

const lightTheme = {
   "--foreground-color": "black",
   "--background-color": "white"
}

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

const mapStateToProps = state => {
   return {
      state
   }
}

const mapDispatchToProps = () => {
   return {
      activateDarkTheme: () => store.dispatch( darkenTheme() ),
      activateLightTheme: () => store.dispatch( lightenTheme() )
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeChanger);
