import React from 'react'
import store from '../store/store'
import { changeTheme } from '../store/actions'
import { connect } from 'react-redux'

export const darkTheme = {
   foregroundColor: "white",
   backgroundColor: "black"
}

export const lightTheme = {
   foregroundColor: "black",
   backgroundColor: "white"
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
      activateDarkTheme: () => store.dispatch( changeTheme(darkTheme) ),
      activateLightTheme: () => store.dispatch( changeTheme(lightTheme) )
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeChanger);
