import { SEARCH_ZIP, SEARCH_PLACENAME } from './actions'
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

      case SEARCH_PLACENAME:
         return {
            ...state,
         }

      case SEARCH_ZIP:
         return {
            ...state,
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
