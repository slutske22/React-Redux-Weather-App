import {
   TYPE_IN_CITYNAME_FIELD,
   TYPE_IN_ZIP_FIELD,
   SHOW_SPINNER,
   THROW_CALLER_ERROR,
   RECIEVE_LOCATION_DATA,
   RECIEVE_WEATHER_DATA,
   VIEW_LOCATIONLIST,
   CHANGE_LOCATION
 } from './actions'


export const initialState = {
   zipValue: '',
   cityValue: '',
   callerError: false,
   dataReady: '',
   locationData: '',
   weatherData: '',
   class: '',
   multipleLocationResults: false,
   showMoreLocations: false,
   locationIndex: 0,
   weatherSpinnerOpen: false
}

export function rootReducer(state = initialState, action) {
   switch(action.type){

      case TYPE_IN_CITYNAME_FIELD:
         return{
            ...state,
            cityValue: action.cityValue,
         }

      case TYPE_IN_ZIP_FIELD:
         return {
            ...state,
            zipValue: action.zipValue,
         }

      case SHOW_SPINNER:
      return {
         ...state,
         weatherSpinnerOpen: action.weatherSpinnerOpen,
         class: 'data-ready'
      }

      case RECIEVE_LOCATION_DATA:
         return {
            ...state,
            dataReady: false,
            locationData: action.data,
            locationIndex: 0,
            callerError: false,
            class: 'data-ready'
         }

      case RECIEVE_WEATHER_DATA:
         return {
            ...state,
            weatherData: action.data,
            dataReady: true,
            callerError: false,
            weatherSpinnerOpen: false
         }

      case THROW_CALLER_ERROR:
         return {
            ...initialState,
            callerError: action.error,
            zipValue: action.zipValue,
            cityValue: action.cityValue
         }

      case VIEW_LOCATIONLIST:
         return {
            ...state,
            showMoreLocations: action.showMoreLocations
         }

      case CHANGE_LOCATION:
         return {
            ...state,
            showMoreLocations: action.showMoreLocations,
            locationIndex: action.chosenIndex
         }

      default:
         return state

   }
}
