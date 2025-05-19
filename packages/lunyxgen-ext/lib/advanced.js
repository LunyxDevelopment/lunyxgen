/**
 * Advanced generation utilities for @lunyxjs/lunyxgen.ext
 */

const { insertText, wrapText } = require('./insertion');
const { addPrefix } = require('./prefix');
const { addSuffix } = require('./suffix');
const { processTemplate } = require('./template');

/**
 * Generate a string with specific transformation patterns
 * @param {string} baseString - Base string to transform
 * @param {Object} transformations - Transformations to apply
 * @param {string} [transformations.prefix] - Prefix to add
 * @param {string} [transformations.suffix] - Suffix to add
 * @param {Object} [transformations.insertion] - Insertion configuration
 * @param {string} [transformations.wrapper] - Wrapper template with {{content}} placeholder
 * @param {Function} [transformations.custom] - Custom transformation function
 * @returns {string} Transformed string
 */
function transformString(baseString, transformations = {}) {
  if (typeof baseString !== 'string') {
    throw new Error('Base string must be a string');
  }
  
  let result = baseString;
  
  // Apply prefix
  if (transformations.prefix) {
    result = addPrefix(result, transformations.prefix);
  }
  
  // Apply suffix
  if (transformations.suffix) {
    result = addSuffix(result, transformations.suffix);
  }
  
  // Apply insertion
  if (transformations.insertion) {
    const { text, position } = transformations.insertion;
    if (text && (position !== undefined)) {
      result = insertText(result, text, position);
    }
  }
  
  // Apply wrapper template
  if (transformations.wrapper) {
    result = processTemplate(transformations.wrapper, { content: result });
  }
  
  // Apply custom transformation
  if (typeof transformations.custom === 'function') {
    result = transformations.custom(result);
  }
  
  return result;
}

/**
 * Generate multiple strings with the same transformation pattern
 * @param {string[]} baseStrings - Base strings to transform
 * @param {Object} transformations - Transformations to apply
 * @returns {string[]} Transformed strings
 */
function transformStrings(baseStrings, transformations = {}) {
  if (!Array.isArray(baseStrings)) {
    throw new Error('Base strings must be an array');
  }
  
  return baseStrings.map(str => transformString(str, transformations));
}

/**
 * Transform a string with multiple patterns sequentially
 * @param {string} baseString - Base string to transform
 * @param {Object[]} transformationPatterns - Array of transformation patterns to apply in sequence
 * @returns {string} Transformed string
 */
function transformWithPatterns(baseString, transformationPatterns = []) {
  if (typeof baseString !== 'string') {
    throw new Error('Base string must be a string');
  }
  
  if (!Array.isArray(transformationPatterns)) {
    throw new Error('Transformation patterns must be an array');
  }
  
  // Apply each transformation pattern in sequence
  return transformationPatterns.reduce(
    (result, pattern) => transformString(result, pattern),
    baseString
  );
}

/**
 * Create a pattern generator for consistent transformations
 * @param {Object} pattern - Transformation pattern
 * @returns {Function} Function that applies the pattern to any string
 */
function createPatternGenerator(pattern = {}) {
  return function(input) {
    if (typeof input === 'string') {
      return transformString(input, pattern);
    } else if (Array.isArray(input)) {
      return transformStrings(input, pattern);
    } else {
      throw new Error('Input must be a string or array of strings');
    }
  };
}

/**
 * Generate strings with randomized transformations
 * @param {string|string[]} input - Input string(s)
 * @param {Object} options - Configuration options
 * @param {string[]} [options.prefixes=[]] - Possible prefixes
 * @param {string[]} [options.suffixes=[]] - Possible suffixes
 * @param {string[]} [options.insertions=[]] - Possible insertions
 * @param {number} [options.transformCount=1] - Number of transformations to apply
 * @returns {string|string[]} Transformed string(s)
 */
function generateRandomTransformations(input, options = {}) {
  const {
    prefixes = [],
    suffixes = [],
    insertions = [],
    transformCount = 1
  } = options;
  
  // Helper to get random element from array
  const getRandom = arr => arr[Math.floor(Math.random() * arr.length)];
  
  // Create random transformation pattern
  const createRandomPattern = () => {
    const pattern = {};
    
    // List of possible transformation types
    const transformationTypes = [];
    if (prefixes.length > 0) transformationTypes.push('prefix');
    if (suffixes.length > 0) transformationTypes.push('suffix');
    if (insertions.length > 0) transformationTypes.push('insertion');
    
    if (transformationTypes.length === 0) {
      return pattern; // Empty pattern if no options
    }
    
    // Pick random transformation type
    const type = getRandom(transformationTypes);
    
    if (type === 'prefix' && prefixes.length > 0) {
      pattern.prefix = getRandom(prefixes);
    } else if (type === 'suffix' && suffixes.length > 0) {
      pattern.suffix = getRandom(suffixes);
    } else if (type === 'insertion' && insertions.length > 0) {
      pattern.insertion = {
        text: getRandom(insertions),
        position: Math.random() < 0.5 ? 0 : { atEnd: true }
      };
    }
    
    return pattern;
  };
  
  // Apply random transformations
  const applyRandomTransformations = str => {
    let result = str;
    for (let i = 0; i < transformCount; i++) {
      result = transformString(result, createRandomPattern());
    }
    return result;
  };
  
  // Handle input types
  if (typeof input === 'string') {
    return applyRandomTransformations(input);
  } else if (Array.isArray(input)) {
    return input.map(applyRandomTransformations);
  } else {
    throw new Error('Input must be a string or array of strings');
  }
}

module.exports = {
  transformString,
  transformStrings,
  transformWithPatterns,
  createPatternGenerator,
  generateRandomTransformations
};