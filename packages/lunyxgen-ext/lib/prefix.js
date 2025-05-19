/**
 * Prefix utilities for @lunyxjs/lunyxgen.ext
 */

/**
 * Add a prefix to a string
 * @param {string} str - The string to prefix
 * @param {string} prefix - The prefix to add
 * @param {Object} options - Additional options
 * @param {string} [options.separator=''] - Separator between prefix and string
 * @returns {string} Prefixed string
 */
function addPrefix(str, prefix, options = {}) {
  const { separator = '' } = options;
  
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }
  
  if (!prefix) {
    return str;
  }
  
  return `${prefix}${separator}${str}`;
}

/**
 * Add a prefix to each string in an array
 * @param {string[]} strings - Array of strings to prefix
 * @param {string} prefix - The prefix to add
 * @param {Object} options - Additional options
 * @param {string} [options.separator=''] - Separator between prefix and string
 * @returns {string[]} Array of prefixed strings
 */
function addPrefixToEach(strings, prefix, options = {}) {
  if (!Array.isArray(strings)) {
    throw new Error('Input must be an array of strings');
  }
  
  return strings.map(str => addPrefix(str, prefix, options));
}

/**
 * Add a different prefix to each string in an array
 * @param {string[]} strings - Array of strings to prefix
 * @param {string[]} prefixes - Array of prefixes to add
 * @param {Object} options - Additional options
 * @param {string} [options.separator=''] - Separator between prefix and string
 * @param {boolean} [options.cyclic=true] - If true, prefixes will cycle if there are fewer prefixes than strings
 * @returns {string[]} Array of prefixed strings
 */
function addPrefixesMultiple(strings, prefixes, options = {}) {
  const { separator = '', cyclic = true } = options;
  
  if (!Array.isArray(strings)) {
    throw new Error('Strings must be an array');
  }
  
  if (!Array.isArray(prefixes)) {
    throw new Error('Prefixes must be an array');
  }
  
  return strings.map((str, index) => {
    let prefixIndex = index;
    if (cyclic) {
      prefixIndex = index % prefixes.length;
    } else if (index >= prefixes.length) {
      return str; // No prefix if out of range and not cycling
    }
    
    return addPrefix(str, prefixes[prefixIndex], { separator });
  });
}

/**
 * Add a conditional prefix based on a testing function
 * @param {string} str - The string to potentially prefix
 * @param {string} prefix - The prefix to add
 * @param {Function} testFn - Function that returns true if prefix should be added
 * @param {Object} options - Additional options
 * @param {string} [options.separator=''] - Separator between prefix and string
 * @returns {string} Potentially prefixed string
 */
function addPrefixConditional(str, prefix, testFn, options = {}) {
  if (typeof testFn !== 'function') {
    throw new Error('Test function must be a function');
  }
  
  return testFn(str) ? addPrefix(str, prefix, options) : str;
}

/**
 * Add a rotating prefix from a list based on position
 * @param {string[]} strings - Array of strings to prefix
 * @param {string[]} prefixes - Array of prefixes to rotate through
 * @param {Object} options - Additional options
 * @param {string} [options.separator=''] - Separator between prefix and string
 * @param {number} [options.startIndex=0] - Index to start rotating prefixes from
 * @returns {string[]} Array of prefixed strings
 */
function addPrefixRotating(strings, prefixes, options = {}) {
  const { separator = '', startIndex = 0 } = options;
  
  if (!Array.isArray(strings) || !Array.isArray(prefixes)) {
    throw new Error('Both inputs must be arrays');
  }
  
  if (prefixes.length === 0) {
    return [...strings];
  }
  
  return strings.map((str, index) => {
    const prefixIndex = (startIndex + index) % prefixes.length;
    return addPrefix(str, prefixes[prefixIndex], { separator });
  });
}

module.exports = {
  addPrefix,
  addPrefixToEach,
  addPrefixesMultiple,
  addPrefixConditional,
  addPrefixRotating
};