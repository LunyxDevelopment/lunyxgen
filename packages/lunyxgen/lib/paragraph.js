/**
 * Paragraph generation utilities for lunyxgen
 */

const { generateSentences } = require('./sentence');

/**
 * Generate a random paragraph
 * @param {Object} options - Configuration options
 * @param {number} [options.sentenceCount=5] - Number of sentences in the paragraph
 * @param {number} [options.minSentences=3] - Minimum number of sentences (if random)
 * @param {number} [options.maxSentences=7] - Maximum number of sentences (if random)
 * @param {boolean} [options.randomLength=false] - Whether to use random length
 * @returns {string} Random paragraph
 */
function generateParagraph(options = {}) {
  const {
    sentenceCount = 5,
    minSentences = 3,
    maxSentences = 7,
    randomLength = false
  } = options;
  
  // Determine the actual sentence count
  let actualSentenceCount = sentenceCount;
  if (randomLength) {
    actualSentenceCount = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
  }
  
  // Generate sentences
  const sentences = generateSentences({ count: actualSentenceCount });
  
  // Join sentences
  return sentences.join(' ');
}

/**
 * Generate multiple random paragraphs
 * @param {Object} options - Configuration options
 * @param {number} [options.count=3] - Number of paragraphs to generate
 * @param {boolean} [options.randomLength=true] - Whether to use random length for each paragraph
 * @returns {string[]} Array of random paragraphs
 */
function generateParagraphs(options = {}) {
  const {
    count = 3,
    randomLength = true
  } = options;
  
  if (count < 1) {
    throw new Error('Count must be at least 1');
  }
  
  const paragraphs = [];
  for (let i = 0; i < count; i++) {
    paragraphs.push(generateParagraph({ randomLength }));
  }
  
  return paragraphs;
}

/**
 * Generate a random article with multiple paragraphs
 * @param {Object} options - Configuration options
 * @param {number} [options.paragraphCount=3] - Number of paragraphs in the article
 * @param {string} [options.title=''] - Optional title for the article
 * @param {boolean} [options.withConclusion=false] - Whether to add a conclusion paragraph
 * @returns {string} Random article
 */
function generateArticle(options = {}) {
  const {
    paragraphCount = 3,
    title = '',
    withConclusion = false
  } = options;
  
  if (paragraphCount < 1) {
    throw new Error('Paragraph count must be at least 1');
  }
  
  let result = '';
  
  // Add title if provided
  if (title) {
    result += `${title}\n\n`;
  }
  
  // Generate main paragraphs
  const mainParagraphCount = withConclusion ? paragraphCount - 1 : paragraphCount;
  const paragraphs = generateParagraphs({ count: mainParagraphCount });
  
  result += paragraphs.join('\n\n');
  
  // Add conclusion if requested
  if (withConclusion) {
    const conclusionStarters = [
      'In conclusion, ',
      'To summarize, ',
      'Finally, ',
      'In summary, ',
      'Therefore, '
    ];
    const starter = conclusionStarters[Math.floor(Math.random() * conclusionStarters.length)];
    const conclusion = generateParagraph({ sentenceCount: 3 });
    
    result += `\n\n${starter}${conclusion.charAt(0).toLowerCase()}${conclusion.slice(1)}`;
  }
  
  return result;
}

/**
 * Generate lorem ipsum text
 * @param {Object} options - Configuration options
 * @param {number} [options.paragraphs=3] - Number of paragraphs to generate
 * @param {boolean} [options.startWithLorem=true] - Whether to start with 'Lorem ipsum dolor sit amet'
 * @returns {string} Lorem ipsum text
 */
function generateLorem(options = {}) {
  const {
    paragraphs = 3,
    startWithLorem = true
  } = options;
  
  // Standard lorem ipsum beginning
  const loremStart = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';
  
  // Generate paragraphs
  const generatedParagraphs = generateParagraphs({ count: paragraphs });
  
  // Replace the beginning of the first paragraph if requested
  if (startWithLorem) {
    generatedParagraphs[0] = loremStart + generatedParagraphs[0].split('. ').slice(1).join('. ');
  }
  
  return generatedParagraphs.join('\n\n');
}

module.exports = {
  generateParagraph,
  generateParagraphs,
  generateArticle,
  generateLorem
};