import React from 'react';
import { Switch, Route } from 'react-router-dom'

import SearchBar from './Search';
import ThemeChanger from './ThemeChanger';
import LogoHeader from './LogoHeader';
import Body from './Body';
import Week from './Week';
import LocationList from './LocationList';
import WeatherHistory from './WeatherHistory';

import { geolocateUser } from '../store/actions';


class App extends React.Component {

   componentDidMount(){
      geolocateUser()
   }

   render(){
      return (
         <div className="App">

            <h1>React Redux Weather Forecast App</h1>
            <ThemeChanger />
            <LogoHeader />
            <SearchBar />
            <Body />

         </div>


         

      );
   }

} // App


export default App;
