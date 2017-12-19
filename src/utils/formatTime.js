/**
 * Format seconds into MM:SS
 * @module formatTime
 * @param { integer } seconds
 * @returns { string } formatted minutes and seconds
 */

export const formatSecondsToMMSS = (seconds) => {
  let min = 0;
  let sec = 0;

  if (seconds > 3600) {
    console.error('ERROR: display this using HH for hours');
  } else if (seconds <= 0) {
    min = 0;
    sec = 0;
  } else if (seconds < 60) {
    min = 0;
    sec = seconds;
  } else {
    min = Math.round(seconds / 60);
    sec = Math.round(seconds % 60);
  }

  min = min.toString();
  sec = sec.toString();
  return `${min} min ${sec} sec`;
};
