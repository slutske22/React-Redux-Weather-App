import React from 'react';
import { connect } from 'react-redux'
import store from '../store/store'

class WeatherHistory extends React.Component {

   render() {
      return (
         <div className="WeatherHistory">

         </div>
      )
   }


}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(WeatherHistory)
