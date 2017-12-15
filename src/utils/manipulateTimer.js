export const manipulateTimer = (timeManip, time) => {
  if (timeManip === '1.0'){
    return time
  }

  let timeManipulation = parseFloat(timeManip);


  let timer = time.split(':');


  let mins = parseInt(timer[1]);
  let seconds = parseInt(timer[2]);

  let totalSeconds = mins * 60 + seconds;

  let secondsManipulated = totalSeconds * timeManipulation;

  let newMins = Math.floor(secondsManipulated / 60);

  if (newMins.toString().length === 1) {
    newMins = '0'+newMins
  }

  let newSeconds = secondsManipulated % 60;

  console.log('00:'+newMins+':'+newSeconds)

  return ('00:'+newMins+':'+newSeconds)



}
