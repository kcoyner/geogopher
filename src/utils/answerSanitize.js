export const sanitizeInput = (answerInputted) => {
    let answerSanitized;
    //determine number of words
    if (answerInputted.indexOf(' ') > -1) {
      answerSanitized = answerInputted.split(' ')
        .map(
          (el, idx) => el.toLowerCase()
        )
        .join(' ');
    } else {
      answerSanitized = answerInputted
        .split('')
        .map(
          (el, idx) => el.toLowerCase()
        )
        .join('');
    }

    //if text has .
    if (answerSanitized.indexOf('.') > -1) {
      answerSanitized = answerSanitized.split('')
        .map(
          (el) => { if (el !== '.') { return el } }
        )
        .join('');
    }
    return answerSanitized
}
