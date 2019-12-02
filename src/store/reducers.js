import { TYPE_IN_CITYNAME_FIELD, TYPE_IN_ZIP_FIELD } from './actions'
import { RECIEVE_LOCATION_DATA } from './actions'
import { VIEW_LOCATIONLIST, CHANGE_LOCATION } from './actions'


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
   locationIndex: 0
}

export function rootReducer(state = initialState, action) {
   switch(action.type){

      case TYPE_IN_CITYNAME_FIELD:
         return{
            ...state,
            cityValue: action.cityValue
         }

      case TYPE_IN_ZIP_FIELD:
         return {
            ...state,
            zipValue: action.zipValue
         }

      case RECIEVE_LOCATION_DATA:
         return {
            ...state,
            locationData: action.data
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
