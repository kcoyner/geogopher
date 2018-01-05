/**
 * Capitalize first letter of a word with certain exceptions
 * @module capitalizeFirst
 * @param { string } words
 * @param { array } EXCLUDED_WORDS
 * @returns { string } first letter is capitalized
 */

export const capitalizeWords = (words) => {

  const EXCLUDED_WORDS = ['a', 'the', 'of', 'the'];

  const capFirstLetter = (word) => {
    let capitalizedWord = '';
    if (!EXCLUDED_WORDS.includes(word)) {
      for (let idx in word) {
        if (parseInt(idx) === 0) {
          capitalizedWord = word[idx].toUpperCase();
        } else {
          capitalizedWord += word[idx].toLowerCase();
        }
      }
      return capitalizedWord;
    } else {
      return word;
    }
  };

  let result = words;
  let wordsArr = words.split(' ');
  try {
    result = wordsArr.map(word => capFirstLetter(word)).join(' ');
  } catch (err) {
    console.error('ERROR in utils/capitalizeFirst: ', err);
  }
  return result;
};
