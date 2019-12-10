import {
   TYPE_IN_CITYNAME_FIELD,
   TYPE_IN_ZIP_FIELD,
   SHOW_SPINNER,
   THROW_CALLER_ERROR,
   RECIEVE_LOCATION_DATA,
   RECIEVE_WEATHER_DATA,
   VIEW_LOCATIONLIST,
   CHANGE_LOCATION,
   CHANGE_THEME
 } from './actions'

import { darkTheme, lightTheme } from '../components/ThemeChanger'


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
   weatherSpinnerOpen: false,
   theme: lightTheme
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
         class: 'data-ready',
         showMoreLocations: false
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
            cityValue: action.cityValue,
            class: 'data-ready'
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

      case CHANGE_THEME:
         return {
            ...state,
            theme: action.payload
         }

      default:
         return state

   }
}
