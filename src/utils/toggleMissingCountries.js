const imgFromAssets = require('-!file-loader?name=markerImg!../assets/geogopher-marker.png');

export const toggleMissingCountries = (toggle, gameData, map) => {
  //declare empty array of missing countries
  let missingCountries = [];

  var geogopherMarker = {
    url: imgFromAssets,
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };
  //loop through gameData
  gameData.forEach((el) => {
    //if polygonAnswered === false
    if (!el.polygonAnswered) {
      //create a marker (this will auto render on map)
        let marker = new google.maps.Marker({
          map: map,
          icon: imgFromAssets,
          draggable: false,
          animation: null,
          position: {lat: el.polygonCenterCoords[0], lng: el.polygonCenterCoords[1]}
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
