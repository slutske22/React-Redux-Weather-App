import React from 'react';

import Empty from './Empty'
import SearchBar from './Search';
import ThemeChanger from './ThemeChanger';
import LogoHeader from './LogoHeader';
import Body from './Body';

import { geolocateUser, processWeatherHistoryData } from '../store/actions';


class App extends React.Component {

   componentDidMount(){
      geolocateUser()
      processWeatherHistoryData()
   }

   render(){
      return (
         <div className="App">

            <h1>Seth's React Redux Weather App</h1>
            <ThemeChanger />
            <LogoHeader />
            <SearchBar />
            <Body />


         </div>


         

      );
   }

} // App


export default App;
