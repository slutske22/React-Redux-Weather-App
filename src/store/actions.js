export const SEARCH_ZIP = "SEARCH_ZIP";
export function searchZip(zipcode){
   return {
      type: SEARCH_ZIP,
      zipcode: zipcode
   }
}

export const SEARCH_PLACENAME = "SEARCH_PLACENAME";
export function searchPlacename(placename){
   return {
      type: SEARCH_PLACENAME,
      placename: placename
   }
}
