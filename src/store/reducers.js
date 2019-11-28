import { SEARCH_ZIP, SEARCH_PLACENAME } from './actions'

const initialState = {
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

function rootReducer(state = initialState, action) {
   switch(action.type){

      case SEARCH_PLACENAME:
         return {
            ...state,
         }

   }
}
