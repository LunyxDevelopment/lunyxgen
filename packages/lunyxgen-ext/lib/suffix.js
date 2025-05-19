/**
 * Suffix utilities for @lunyxjs/lunyxgen.ext
 */

/**
 * Add a suffix to a string
 * @param {string} str - The string to suffix
 * @param {string} suffix - The suffix to add
 * @param {Object} options - Additional options
 * @param {string} [options.separator=''] - Separator between string and suffix
 * @returns {string} Suffixed string
 */
function addSuffix(str, suffix, options = {}) {
  const { separator = '' } = options;
  
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }
  
  if (!suffix) {
    return str;
  }
  
  return `${str}${separator}${suffix}`;
}

/**
 * Add a suffix to each string in an array
 * @param {string[]} strings - Array of strings to suffix
 * @param {string} suffix - The suffix to add
 * @param {Object} options - Additional options
 * @param {string} [options.separator=''] - Separator between string and suffix
 * @returns {string[]} Array of suffixed strings
 */
function addSuffixToEach(strings, suffix, options = {}) {
  if (!Array.isArray(strings)) {
    throw new Error('Input must be an array of strings');
  }
  
  return strings.map(str => addSuffix(str, suffix, options));
}

/**
 * Add a different suffix to each string in an array
 * @param {string[]} strings - Array of strings to suffix
 * @param {string[]} suffixes - Array of suffixes to add
 * @param {Object} options - Additional options
 * @param {string} [options.separator=''] - Separator between string and suffix
 * @param {boolean} [options.cyclic=true] - If true, suffixes will cycle if there are fewer suffixes than strings
 * @returns {string[]} Array of suffixed strings
 */
function addSuffixesMultiple(strings, suffixes, options = {}) {
  const { separator = '', cyclic = true } = options;
  
  if (!Array.isArray(strings)) {
    throw new Error('Strings must be an array');
  }
  
  if (!Array.isArray(suffixes)) {
    throw new Error('Suffixes must be an array');
  }
  
  return strings.map((str, index) => {
    let suffixIndex = index;
    if (cyclic) {
      suffixIndex = index % suffixes.length;
    } else if (index >= suffixes.length) {
      return str; // No suffix if out of range and not cycling
    }
    
    return addSuffix(str, suffixes[suffixIndex], { separator });
  });
}

/**
 * Add a conditional suffix based on a testing function
 * @param {string} str - The string to potentially suffix
 * @param {string} suffix - The suffix to add
 * @param {Function} testFn - Function that returns true if suffix should be added
 * @param {Object} options - Additional options
 * @param {string} [options.separator=''] - Separator between string and suffix
 * @returns {string} Potentially suffixed string
 */
function addSuffixConditional(str, suffix, testFn, options = {}) {
  if (typeof testFn !== 'function') {
    throw new Error('Test function must be a function');
  }
  
  return testFn(str) ? addSuffix(str, suffix, options) : str;
}

/**
 * Add a rotating suffix from a list based on position
 * @param {string[]} strings - Array of strings to suffix
 * @param {string[]} suffixes - Array of suffixes to rotate through
 * @param {Object} options - Additional options
 * @param {string} [options.separator=''] - Separator between string and suffix
 * @param {number} [options.startIndex=0] - Index to start rotating suffixes from
 * @returns {string[]} Array of suffixed strings
 */
function addSuffixRotating(strings, suffixes, options = {}) {
  const { separator = '', startIndex = 0 } = options;
  
  if (!Array.isArray(strings) || !Array.isArray(suffixes)) {
    throw new Error('Both inputs must be arrays');
  }
  
  if (suffixes.length === 0) {
    return [...strings];
  }
  
  return strings.map((str, index) => {
    const suffixIndex = (startIndex + index) % suffixes.length;
    return addSuffix(str, suffixes[suffixIndex], { separator });
  });
}

module.exports = {
  addSuffix,
  addSuffixToEach,
  addSuffixesMultiple,
  addSuffixConditional,
  addSuffixRotating
};