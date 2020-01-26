import React from 'react';
import { connect } from 'react-redux';
import store from '../store/store';

import SearchBar from './Search';
import ThemeChanger from './ThemeChanger';
import LogoHeader from './LogoHeader';
import Body from './Body';

import { CloudyIcon } from './svgIcons/CloudyIcon'
import { ClearDayIcon } from './svgIcons/ClearDayIcon'
import { ClearNightIcon } from './svgIcons/ClearNightIcon'
import { RainHeavyIcon } from  './svgIcons/RainHeavyIcon'
import { SnowIcon } from './svgIcons/SnowIcon'
import { WindyDayIcon } from './svgIcons/WindyDayIcon'
import { FogIcon } from './svgIcons/FogIcon'
import { PartlyCloudyDayIcon } from './svgIcons/PartlyCloudyDayIcon'
import { HailIcon } from './svgIcons/HailIcon'
import { LightningIcon } from './svgIcons/LightningIcon'
import { TornadoIcon } from './svgIcons/TornadoIcon'

import WeatherIcon from './svgIcons'


import { geolocateUser, testDataProcessing } from '../store/actions';


class App extends React.Component {

   componentDidMount(){
      geolocateUser()
      testDataProcessing()
   }

   render(){
      return (
         <div className="App">

            <h1>Seth's React Redux Weather App</h1>

            <ThemeChanger />

            <LogoHeader />

            <SearchBar />

            <WeatherIcon icon="snow" className="cloudy" />

            <Body />

         </div>
      );
   }

} // App


export default App;
