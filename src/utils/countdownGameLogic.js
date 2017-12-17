
import {
 //add some score recording actions and stuff
 submitCorrectEntry,
 submitIncorrectEntry,
 incrementTotalSubmissions,
} from '../actions/Score.actions';




export const countdownGameLogic = (map, gameData, answerSanitized, countPolygonsEntered, countTotalSubmissions, incorrectEntries, dispatchFcn) => {
  let answerExists = false;
  // //loop through gamedata array
  for (var i = 0; i < gameData.length; i++) {
  //   //loop through accepted answers within country obj
    for (var j = 0; j < gameData[i].acceptedAnswers.length; j++) {
  //     // if answer matches
      if (answerSanitized === gameData[i].acceptedAnswers[j]) {
  //       // if the answer has already been input
        if (gameData[i].polygonAnswered) {
          countdownCheckAnswer(
            'answered',
            gameData[i].id,
            gameData,
            map,
            answerSanitized,
            countPolygonsEntered,
            countTotalSubmissions,
            incorrectEntries,
            dispatchFcn
          );
          answerExists = true;
        } else if (!gameData[i].polygonAnswered){
          countdownCheckAnswer(
            'unanswered',
            gameData[i].id,
            gameData,
            map,
            answerSanitized,
            countPolygonsEntered,
            countTotalSubmissions,
            incorrectEntries,
            dispatchFcn
           );
           answerExists = true;
        }
      }
    }
  }
  if (!answerExists) {
    countdownCheckAnswer(
      'incorrect',
      null,
      gameData,
      map,
      answerSanitized,
      countPolygonsEntered,
      countTotalSubmissions,
      incorrectEntries,
      dispatchFcn
    );
  }

}

const countdownCheckAnswer = ( answerStatus, polygonID, gameData, map, answerSanitized, countPolygonsEntered, countTotalSubmissions, incorrectEntries, dispatchFcn ) => {
  let polygon = map.data.getFeatureById(polygonID)

  if (answerStatus === 'answered') {
    //modify map to pulse
      map.data.overrideStyle(
        polygon,
        {
          fillOpacity: '0.5',
          fillColor: '#7CFC00',
          strokeColor: '#00FFFF',
          strokeWeight: '5',
        }
      );
      setTimeout(() =>
      map.data.overrideStyle(
              polygon,
              {
                fillOpacity: '0.5',
                fillColor: '#7FF000',
                strokeColor: '#99FF00',
                strokeWeight: '1',
              }
            ),1000)
    //trigger for already-answered sound
      //*trigger goes here*
  } else if (answerStatus === 'unanswered') {
    //modify map to reflect answered  polygon
      map.data.overrideStyle(
        polygon,
        {
          fillOpacity: '0.5',
          fillColor: '#7FF000',
          strokeColor: '#99FF00',
          strokeWeight: '1',
        }
      );
    //dispatch gameData to reflect true on polygonAnswered
    //and increment countPolygonsEntered
      dispatchFcn(
        submitCorrectEntry(
          countPolygonsEntered,
          polygonID,
           gameData
         )
       )
    //trigger for correct sound
      //*trigger goes here*
  } else { //answer status is 'incorrect'

    //dispatch to store in incorrectEntries
    dispatchFcn(submitIncorrectEntry(answerSanitized, incorrectEntries))
    //trigger for incorrect sound
    //trigger for text field to shake
  }

  //increment countTotalSubmissions by one
  dispatchFcn(incrementTotalSubmissions(countTotalSubmissions))
  return;
}


// } else if (answerResponse[0] === 'unanswered') {
//   //modify polygon fillColor
//   let polygon = map.data.getFeatureById(answerResponse[1])
//   map.data.overrideStyle(polygon, {fillOpacity: '0.5', fillColor: '#7FF000', strokeColor: '#99FF00', strokeWeight: '1'})
//   //dispatch to modify game data to register correct answer
//   //and increment number of polygons identified by 1
//   this.props.dispatch(
//     submitCorrectEntry(
//       this.props.countPolygonsEntered,
//       answerResponse[1],
//       this.props.gameData
//     )
//   );
// }
