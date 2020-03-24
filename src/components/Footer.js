import React from 'react'
import { useSelector } from 'react-redux'

const Footer = () => {

   const theme = useSelector(state => state.theme.name)
   const locationsOpen = useSelector(state => state.show.moreLocations)

   if (!locationsOpen){
      return (
         <footer>
            <p>
               Powered by: 
                  <a className="footer-link" href="https://darksky.net/dev" target="_blank" rel="noopener noreferrer">
                     <img alt="darksky icon" src="/icons/darksky-favicon.png" />
                     DarkSky
                  </a>
                  <a className="footer-link" href="https://api.meteostat.net/" target="_blank" rel="noopener noreferrer">
                     <img alt="meteostat icon" src="/icons/meteostat-favicon.png" />
                     meteostat
                  </a>
                  <a className="footer-link" href="https://nominatim.org/" target="_blank" rel="noopener noreferrer">
                     <img style={theme === "nighttime" ? {filter: `invert(100%)`} : {} } alt="nominatim icon" src="/icons/nominatim-favicon.png" />
                     Nominatim
                  </a>
            </p>
         </footer>
      )
   }

   return null


}



export default (Footer)