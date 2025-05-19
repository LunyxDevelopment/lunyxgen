/**
 * Sentence generation utilities for lunyxgen
 */

const { generateWords } = require('./word');

/**
 * Generate a random sentence
 * @param {Object} options - Configuration options
 * @param {number} [options.wordCount=6] - Number of words in the sentence
 * @param {number} [options.minWordCount=3] - Minimum number of words (if random)
 * @param {number} [options.maxWordCount=10] - Maximum number of words (if random)
 * @param {boolean} [options.randomLength=false] - Whether to use random length
 * @param {boolean} [options.endWith='.'] - Sentence ending punctuation
 * @returns {string} Random sentence
 */
function generateSentence(options = {}) {
  const {
    wordCount = 6,
    minWordCount = 3,
    maxWordCount = 10,
    randomLength = false,
    endWith = '.'
  } = options;
  
  // Determine the actual word count
  let actualWordCount = wordCount;
  if (randomLength) {
    actualWordCount = Math.floor(Math.random() * (maxWordCount - minWordCount + 1)) + minWordCount;
  }
  
  // Generate words with appropriate capitalization for first word
  const words = generateWords({ count: actualWordCount });
  
  // Capitalize the first word
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  
  // Join words and add punctuation
  return words.join(' ') + endWith;
}

/**
 * Generate multiple random sentences
 * @param {Object} options - Configuration options
 * @param {number} [options.count=3] - Number of sentences to generate
 * @param {boolean} [options.randomLength=true] - Whether to use random length for each sentence
 * @param {string} [options.endWith='.'] - Sentence ending punctuation
 * @returns {string[]} Array of random sentences
 */
function generateSentences(options = {}) {
  const {
    count = 3,
    randomLength = true,
    endWith = '.'
  } = options;
  
  if (count < 1) {
    throw new Error('Count must be at least 1');
  }
  
  const sentences = [];
  for (let i = 0; i < count; i++) {
    sentences.push(generateSentence({ randomLength, endWith }));
  }
  
  return sentences;
}

/**
 * Generate a sentence with a specific structure
 * @param {Object} options - Configuration options
 * @param {string} [options.structure='subject verb object'] - Sentence structure
 * @returns {string} Structured sentence
 */
function generateStructuredSentence(options = {}) {
  const { structure = 'subject verb object' } = options;
  
  const parts = structure.split(' ');
  const result = [];
  
  for (const part of parts) {
    switch (part.toLowerCase()) {
      case 'subject':
        result.push(generateWords({ count: 1, type: 'noun', capitalize: true })[0]);
        break;
      case 'adjective':
        result.push(generateWords({ count: 1, type: 'adjective' })[0]);
        break;
      case 'verb':
        result.push(generateWords({ count: 1, type: 'verb' })[0]);
        break;
      case 'object':
        result.push(generateWords({ count: 1, type: 'noun' })[0]);
        break;
      case 'adverb':
        result.push(generateWords({ count: 1, type: 'adverb' })[0]);
        break;
      case 'preposition':
        result.push(generateWords({ count: 1, type: 'preposition' })[0]);
        break;
      default:
        result.push(part); // Keep as literal text
    }
  }
  
  return result.join(' ') + '.';
}

/**
 * Generate a random question
 * @param {Object} options - Configuration options
 * @param {string} [options.questionType='what'] - Type of question (what, who, when, where, why, how)
 * @returns {string} Random question
 */
function generateQuestion(options = {}) {
  const { questionType = 'what' } = options;
  
  const questionWords = {
    what: 'What',
    who: 'Who',
    when: 'When',
    where: 'Where',
    why: 'Why',
    how: 'How'
  };
  
  const questionWord = questionWords[questionType.toLowerCase()] || 'What';
  
  // Create a sentence and convert it to a question
  const sentence = generateSentence({ wordCount: 5, endWith: '' });
  const words = sentence.split(' ');
  
  // Remove first word and uncapitalize the second
  words.shift();
  if (words.length > 0) {
    words[0] = words[0].toLowerCase();
  }
  
  return `${questionWord} ${words.join(' ')}?`;
}

module.exports = {
  generateSentence,
  generateSentences,
  generateStructuredSentence,
  generateQuestion
};