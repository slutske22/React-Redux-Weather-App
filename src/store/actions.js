export const TYPE_IN_CITYNAME_FIELD = "TYPE_IN_CITYNAME_FIELD"
export const TYPE_IN_ZIP_FIELD = "TYPE_IN_ZIP_FIELD"
export const SEARCH_LOCATION = "SEARCH_LOCATION";
export const RECIEVE_LOCATION_DATA = "RECIEVE_LOCATION_DATA";
export const VIEW_LOCATIONLIST = "OPEN_LOCATIONLIST";
export const CHANGE_LOCATION = "CHANGE_LOCATION";




const makeSearchTerm = {
   domestic: {
      cityValue: function(cityName){
         return `https://nominatim.openstreetmap.org/search?q=${cityName}&limit=50&format=json`
      },
      zipValue: function(zipCode){
         return `https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&country=US&limit=50&format=json`
      }
   },
   international: {
      cityValue: function(cityName){
         return `https://nominatim.openstreetmap.org/search?city=${cityName}&limit=50&format=json`
      },
      zipValue: function(zipCode){
         return `https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&limit=50&format=json`
      }
   }
}

export function typeZip(e){
   return {
      type: TYPE_IN_ZIP_FIELD,
      zipValue: e.target.value
   }
}

export function typePlacename(e){
   console.log(e.target.value)
   return {
      type: TYPE_IN_CITYNAME_FIELD,
      cityValue: e.target.value
   }
}

export function searchLocation(name) {
   return (dispatch, getState) => {
      const url = makeSearchTerm.domestic[name](this.state[name])
      fetch(url)
         .then( response => {dispatch(receiveLocationData(response.data))})
         .catch( error => { throw(error) } )
   }
}


export function receiveLocationData(data){
   return {
      type: RECIEVE_LOCATION_DATA,
      data: data
   }
}



export function viewLocationlist(){
   return {
      type: VIEW_LOCATIONLIST,
      showMoreLocations: true
   }
}

export function changeLocation(e){
   return {
      type: CHANGE_LOCATION,
      showMoreLocations: false,
      chosenIndex: e.target.getAttribute('number')
   }
}
