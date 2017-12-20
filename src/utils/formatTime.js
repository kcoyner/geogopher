/**
 * Format seconds into MM:SS
 * @module formatTime
 * @param { integer } seconds
 * @returns { string } formatted minutes and seconds
 */

export const formatSecondsToMMSS = (seconds) => {

  if (seconds > 3600) {
    console.error('ERROR: display this using HH for hours');
  }

  if (seconds > 0 ) {
      let min = Math.floor(seconds / 60);
      let sec = seconds % 60;

      min < 10 ? min = '0' + min : min
      sec < 10 ? sec = '0' + sec : sec

      return `${min}:${sec}`

    } else {
      return '00:00'
    }
};
