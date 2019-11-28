export const SEARCH_ZIP = "SEARCH_ZIP";
export const SEARCH_PLACENAME = "SEARCH_PLACENAME";


export function fetchLocationByZip(zip) {

   return function(dispatch) {
      return fetch(`https://nominatim.openstreetmap.org/search?postalcode=${zip}&country=US&limit=50&format=json`)
      .then( results => results.json() )
      .then( locationData => console.log(locationData) )
   }
}



export function searchZip(zipcode){
   return {
      type: SEARCH_ZIP,
      zipcode: zipcode
   }
}

export function searchPlacename(placename){
   return {
      type: SEARCH_PLACENAME,
      placename: placename
   }
}
