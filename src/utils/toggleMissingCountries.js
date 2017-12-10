export const toggleMissingCountries = (toggle, gameData, map) => {
  //declare empty array of missing countries
  let missingCountries = [];
  //loop through gameData
  gameData.forEach((el) => {
    //if polygonAnswered === false
    if (!el.polygonAnswered) {
      //create a marker (this will auto render on map)
        let marker = new google.maps.Marker({
          map: map,
          draggable: false,
          animation: null,
          position: {lat: el.countryCenter[0], lng: el.countryCenter[1]}
        });
        //push marker into missingCountries array
        missingCountries.push(marker)
    }
    //end gameData.forEach
  });

setInterval( () => {
    missingCountries.forEach((marker) => marker.setMap(null))
}, 3000);
}
