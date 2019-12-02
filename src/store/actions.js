export const TYPE_IN_CITYNAME_FIELD = "TYPE_IN_CITYNAME_FIELD"
export const TYPE_IN_ZIP_FIELD = "TYPE_IN_ZIP_FIELD"
export const SEARCH_LOCATION = "SEARCH_LOCATION";
export const RECIEVE_LOCATION_DATA = "RECIEVE_LOCATION_DATA";
export const VIEW_LOCATIONLIST = "OPEN_LOCATIONLIST";
export const CHANGE_LOCATION = "CHANGE_LOCATION";




const makeSearchTerm = {
   domestic: {
      cityValue: function(cityValue){
         return `https://nominatim.openstreetmap.org/search?q=${cityValue}&limit=50&format=json`
      },
      zipValue: function(zipValue){
         return `https://nominatim.openstreetmap.org/search?postalcode=${zipValue}&country=US&limit=50&format=json`
      }
   },
   international: {
      cityValue: function(cityValue){
         return `https://nominatim.openstreetmap.org/search?city=${cityValue}&limit=50&format=json`
      },
      zipValue: function(zipValue){
         return `https://nominatim.openstreetmap.org/search?postalcode=${zipValue}&limit=50&format=json`
      }
   }
}

export function typeZip(e){
   if (e.keyCode === 13 && e.target.value.trim().length > 0){
      let searchTerm = encodeURIComponent(e.target.value)
      searchLocation('zipValue', searchTerm)
   }
   return {
      type: TYPE_IN_ZIP_FIELD,
      zipValue: e.target.value
   }
}

export function typePlacename(e){
   if (e.keyCode === 13 && e.target.value.trim().length > 0){
      let searchTerm = encodeURIComponent(e.target.value)
      searchLocation('cityValue', searchTerm)
   }
   return {
      type: TYPE_IN_CITYNAME_FIELD,
      cityValue: e.target.value
   }
}

export function searchLocation(name, searchTerm) {
   const url = makeSearchTerm.domestic[name](searchTerm)
   console.log(url)
   return function(dispatch) {
      return fetch(url)
         .then( (response) => {
            console.log('inside the then')
            dispatch(receiveLocationData(response.data))
         })
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
