/**
 * Word generation utilities for lunyxgen
 */

// Basic word lists for random generation
const WORD_LISTS = {
  nouns: [
    'time', 'year', 'people', 'way', 'day', 'man', 'thing', 'woman', 'life', 'child',
    'world', 'school', 'state', 'family', 'student', 'group', 'country', 'problem', 'hand', 'part',
    'place', 'case', 'week', 'company', 'system', 'program', 'question', 'work', 'government', 'number'
  ],
  adjectives: [
    'good', 'new', 'first', 'last', 'long', 'great', 'little', 'own', 'other', 'old',
    'right', 'big', 'high', 'different', 'small', 'large', 'next', 'early', 'young', 'important',
    'few', 'public', 'bad', 'same', 'able', 'social', 'political', 'national', 'real', 'simple'
  ],
  verbs: [
    'be', 'have', 'do', 'say', 'get', 'make', 'go', 'know', 'take', 'see',
    'come', 'think', 'look', 'want', 'give', 'use', 'find', 'tell', 'ask', 'work',
    'seem', 'feel', 'try', 'leave', 'call', 'help', 'turn', 'start', 'show', 'run'
  ],
  adverbs: [
    'up', 'so', 'out', 'just', 'now', 'how', 'then', 'more', 'also', 'here',
    'well', 'only', 'very', 'even', 'back', 'there', 'down', 'still', 'around', 'however',
    'yet', 'often', 'never', 'quickly', 'always', 'sometimes', 'usually', 'really', 'early', 'almost'
  ],
  prepositions: [
    'of', 'in', 'to', 'for', 'with', 'on', 'at', 'from', 'by', 'about',
    'as', 'into', 'like', 'through', 'after', 'over', 'between', 'out', 'against', 'during'
  ]
};

/**
 * Generate a random word
 * @param {Object} options - Configuration options
 * @param {string} [options.type='any'] - Word type (noun, adjective, verb, adverb, preposition, any)
 * @param {number} [options.minLength=3] - Minimum word length
 * @param {number} [options.maxLength=10] - Maximum word length
 * @param {boolean} [options.capitalize=false] - Whether to capitalize the first letter
 * @returns {string} Random word
 */
function generateWord(options = {}) {
  const {
    type = 'any',
    minLength = 3,
    maxLength = 10,
    capitalize = false
  } = options;
  
  let wordList;
  if (type === 'any') {
    // Combine all word lists
    wordList = [
      ...WORD_LISTS.nouns,
      ...WORD_LISTS.adjectives,
      ...WORD_LISTS.verbs,
      ...WORD_LISTS.adverbs,
      ...WORD_LISTS.prepositions
    ];
  } else if (WORD_LISTS[type + 's']) {
    wordList = WORD_LISTS[type + 's'];
  } else if (WORD_LISTS[type]) {
    wordList = WORD_LISTS[type];
  } else {
    throw new Error(`Invalid word type: ${type}`);
  }
  
  // Filter by length
  const filteredWords = wordList.filter(word => 
    word.length >= minLength && word.length <= maxLength
  );
  
  if (filteredWords.length === 0) {
    throw new Error(`No words match the length criteria between ${minLength} and ${maxLength}`);
  }
  
  // Select random word
  const randomIndex = Math.floor(Math.random() * filteredWords.length);
  let word = filteredWords[randomIndex];
  
  // Capitalize if needed
  if (capitalize) {
    word = word.charAt(0).toUpperCase() + word.slice(1);
  }
  
  return word;
}

/**
 * Generate multiple random words
 * @param {Object} options - Configuration options
 * @param {number} [options.count=3] - Number of words to generate
 * @param {string} [options.type='any'] - Word type (noun, adjective, verb, adverb, preposition, any)
 * @param {boolean} [options.unique=false] - Whether all words should be unique
 * @returns {string[]} Array of random words
 */
function generateWords(options = {}) {
  const {
    count = 3,
    type = 'any',
    unique = false,
    capitalize = false
  } = options;
  
  if (count < 1) {
    throw new Error('Count must be at least 1');
  }
  
  if (unique) {
    let wordList;
    if (type === 'any') {
      wordList = [
        ...WORD_LISTS.nouns,
        ...WORD_LISTS.adjectives,
        ...WORD_LISTS.verbs,
        ...WORD_LISTS.adverbs,
        ...WORD_LISTS.prepositions
      ];
    } else if (WORD_LISTS[type + 's']) {
      wordList = WORD_LISTS[type + 's'];
    } else if (WORD_LISTS[type]) {
      wordList = WORD_LISTS[type];
    } else {
      throw new Error(`Invalid word type: ${type}`);
    }
    
    if (count > wordList.length) {
      throw new Error(`Cannot generate ${count} unique words of type '${type}' (only ${wordList.length} available)`);
    }
    
    // Shuffle and take first count elements
    const shuffled = [...wordList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map(word => {
      return capitalize ? word.charAt(0).toUpperCase() + word.slice(1) : word;
    });
  } else {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(generateWord({ type, capitalize }));
    }
    return result;
  }
}

/**
 * Generate a compound word
 * @param {Object} options - Configuration options
 * @param {number} [options.parts=2] - Number of word parts to combine
 * @param {string} [options.separator=''] - Separator between word parts
 * @returns {string} Compound word
 */
function generateCompoundWord(options = {}) {
  const { parts = 2, separator = '' } = options;
  
  if (parts < 2) {
    throw new Error('Parts must be at least 2');
  }
  
  const wordParts = [];
  for (let i = 0; i < parts; i++) {
    wordParts.push(generateWord());
  }
  
  return wordParts.join(separator);
}

module.exports = {
  generateWord,
  generateWords,
  generateCompoundWord,
  WORD_LISTS
};