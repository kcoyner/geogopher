export const manipulateTimer = (timeManip, time) => {

  // time equals basetime in seconds
  // timeManip { Object } has either multiplier or override keys

  if (timeManip.multiplier === '1.0') {
    return time;
  }

  if (timeManip.override) {
    return timeManip.override;
  } else {
    let timeManipulation = parseFloat(timeManip.multiplier);
    return parseInt(Math.floor(timeManipulation * time));
  }
};
