import {
   TYPE_IN_CITYNAME_FIELD,
   TYPE_IN_ZIP_FIELD,
   SHOW_SPINNER,
   THROW_CALLER_ERROR,
   RECIEVE_LOCATION_DATA,
   RECIEVE_WEATHER_DATA,
   VIEW_LOCATIONLIST,
   CHANGE_LOCATION,
   CHANGE_THEME,
   VIEW_WEATHER_HISTORY
 } from './actions'

import { darkTheme, lightTheme } from '../components/ThemeChanger'


export const initialState = {

   // Revised state tree - makes more sense
   currentRoute: '/',
   show: { // for now, until I implement router
      moreLocations: false,
      weatherHistory: false,
      weatherSpinner: false,
   },
   class: '',
   theme: lightTheme,
   userInput: {
      zipValue: '',
      cityValue: ''
   },
   data: {
      callerError: false,
      userPosition: undefined,
      locations: {
         data: '',
         index: 0
      },
      forecast: {
         ready: false,
         data: ''
      },
      history: {
         ready: false,
         data: ''
      }
   },

}


export function rootReducer(state = initialState, action) {
   switch(action.type){

      case TYPE_IN_CITYNAME_FIELD:
         return{
            ...state,
            userInput: {
               ...state.userInputs,
               cityValue: action.cityValue
            }
         }

      case TYPE_IN_ZIP_FIELD:
         return {
            ...state,
            userInput: {
               ...state.userInputs,
               zipValue: action.zipValue
            }
         }

      case SHOW_SPINNER:
      return {
         ...state,
         class: 'data-ready',
         data: {
            ...state.data,
            callerError: null
         },
         show: {
            moreLocations: action.showMoreLocations,
            weatherHistory: action.showWeatherHistory,
            weatherSpinner: action.weatherSpinnerOpen,
         },
      }

      case RECIEVE_LOCATION_DATA:
         return {
            ...state,
            class: 'data-ready',
            data: {
               ...state.data,
               callerError: false,
               locations: {
                  data: action.data,
                  index: 0
               }
            },
         }

      case RECIEVE_WEATHER_DATA:
         return {
            ...state,
            currentRoute: '/forecast',
            data: {
               ...state.data,
               callerError: false,
               forecast: {
                  ready: true,
                  data: action.data
               }
            },
            show: {
               ...state.data.show,
               weatherSpinner: false,
               moreLocations: false
            },
         }

      case THROW_CALLER_ERROR:
         return {
            ...initialState,
            currentRoute: '/err',
            class: 'data-ready',
            data: {
               ...state.data,
               callerError: action.error,
            },
         }

      case VIEW_LOCATIONLIST:
         return {
            ...state,
            currentRoute: '/locationlist',
            show: {
               ...state.show,
               moreLocations: action.showMoreLocations
            },



            showMoreLocations: action.showMoreLocations
         }

      case VIEW_WEATHER_HISTORY:
         return {
            ...state,
            currentRoute: '/history',
            show: {
               ...state.show,
               weatherHistory: action.showWeatherHistory
            },


            showWeatherHistory: action.showWeatherHistory
         }

      case CHANGE_LOCATION:
         return {
            ...state,
            data: {
               ...state.data,
               locations: {
                  ...state.data.locations,
                  index: action.chosenIndex
               },
               forecast: {
                  ...state.data.forecast,
                  ready: false
               }
            },
            show: {
               ...state.show,
               moreLocations: false
            },


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
