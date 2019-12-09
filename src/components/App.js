import React from 'react';

import SearchBar from './Search'
import ThemeChanger from './ThemeChanger'
import LogoHeader from './LogoHeader'
import Body from './Body';


class App extends React.Component {

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
