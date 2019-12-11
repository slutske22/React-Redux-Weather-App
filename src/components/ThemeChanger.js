import React from 'react'
import store from '../store/store'
import { setTheme } from '../store/actions'
import { connect } from 'react-redux'

export const darkTheme = {
   name: 'nighttime',
   foregroundColor: "white",
   backgroundColor: "black"
}

export const lightTheme = {
   name: 'daytime',
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

const mapDispatchToProps = () => {
   return {
      activateDarkTheme: () => store.dispatch( setTheme(darkTheme) ),
      activateLightTheme: () => store.dispatch( setTheme(lightTheme) )
   }
}

export default connect(null, mapDispatchToProps)(ThemeChanger);
