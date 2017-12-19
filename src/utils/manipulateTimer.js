export const manipulateTimer = (timeManip, time) => {


  if (timeManip.multiplier === '1.0') {
    return time;
  }

  if (timeManip.override) {
    return timeManip.override;
  } else {

    let timeManipulation = parseFloat(timeManip.multiplier);


    let timer = time.split(':');


    let mins = parseInt(timer[1]);
    let seconds = parseInt(timer[2]);

    let totalSeconds = mins * 60 + seconds;

    let secondsManipulated = totalSeconds * timeManipulation;

    let newMins = Math.floor(secondsManipulated / 60);

    if (newMins.toString().length === 1) {
      newMins = '0' + newMins
    }

    let newSeconds = secondsManipulated % 60;

    return mins * 60 + seconds;
  }
  // console.log('00:'+newMins+':'+newSeconds)
  //
  // return ('00:'+newMins+':'+newSeconds)



}
