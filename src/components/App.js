import React from 'react';
import SearchBar from './Search'
import Body from './Body';


class App extends React.Component {

   render(){
      return (
         <div className="App">

            <h1>Seth's React Redux Weather App</h1>

            <SearchBar />

            <Body />

         </div>
      );
   }

} // App


export default App;
