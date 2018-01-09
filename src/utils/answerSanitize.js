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

    //if text has . or trailing space
    if (answerSanitized.indexOf('.') > -1 || answerSanitized[answerSanitized.length - 1] === ' ') {
      answerSanitized = answerSanitized.split('')
        .map(
          (el, idx) => {
            if (idx === answerSanitized.length - 1 && el === ' ') {
              return
            }
            if (el !== '.') {
              return el
            }
          }
        )
        .join('');
    }

    console.log(answerSanitized)
    return answerSanitized
}
