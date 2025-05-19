/**
 * Insertion utilities for @lunyxjs/lunyxgen.ext
 */

/**
 * Insert text at a specific position in a string
 * @param {string} str - The string to modify
 * @param {string} insertion - The text to insert
 * @param {number|Object} position - Position to insert at or options object
 * @param {number} [position.index] - Index at which to insert text
 * @param {boolean} [position.atStart=false] - Whether to insert at the start
 * @param {boolean} [position.atEnd=false] - Whether to insert at the end
 * @param {number} [position.fromEnd] - Position from the end of the string
 * @returns {string} Modified string
 */
function insertText(str, insertion, position) {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }
  
  if (!insertion) {
    return str;
  }
  
  // Handle simple number position
  if (typeof position === 'number') {
    const index = Math.min(Math.max(0, position), str.length);
    return str.slice(0, index) + insertion + str.slice(index);
  }
  
  // Handle position as object with options
  const options = position || {};
  
  if (options.atStart) {
    return insertion + str;
  }
  
  if (options.atEnd) {
    return str + insertion;
  }
  
  if (typeof options.fromEnd === 'number') {
    const index = Math.max(0, str.length - options.fromEnd);
    return str.slice(0, index) + insertion + str.slice(index);
  }
  
  // Default to using index or middle of string
  const index = typeof options.index === 'number' 
    ? Math.min(Math.max(0, options.index), str.length)
    : Math.floor(str.length / 2);
  
  return str.slice(0, index) + insertion + str.slice(index);
}

/**
 * Insert text at multiple positions in a string
 * @param {string} str - The string to modify
 * @param {string|string[]} insertions - Text(s) to insert
 * @param {number[]} positions - Positions at which to insert
 * @param {Object} options - Additional options
 * @param {boolean} [options.sorted=true] - Whether to sort positions before inserting
 * @returns {string} Modified string
 */
function insertTextMultiple(str, insertions, positions, options = {}) {
  const { sorted = true } = options;
  
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }
  
  if (!Array.isArray(positions) || positions.length === 0) {
    return str;
  }
  
  // Ensure insertions is an array of the correct length
  const insertionArr = Array.isArray(insertions) 
    ? insertions 
    : new Array(positions.length).fill(insertions);
  
  if (insertionArr.length < positions.length) {
    // Extend insertions array if needed by repeating values
    const originalLength = insertionArr.length;
    for (let i = originalLength; i < positions.length; i++) {
      insertionArr[i] = insertionArr[i % originalLength];
    }
  }
  
  // Sort positions in ascending order if requested
  const indices = sorted 
    ? [...positions].sort((a, b) => a - b)
    : [...positions];
  
  // Map original positions to sorted positions
  const posMap = sorted
    ? positions.map((pos, i) => ({ pos, i }))
        .sort((a, b) => a.pos - b.pos)
        .map(item => item.i)
    : positions.map((_, i) => i);
  
  // Insert texts one by one, adjusting positions
  let result = str;
  let offset = 0;
  
  for (let i = 0; i < indices.length; i++) {
    const position = Math.min(Math.max(0, indices[i] + offset), result.length);
    const insertion = insertionArr[posMap[i]];
    
    result = result.slice(0, position) + insertion + result.slice(position);
    offset += insertion.length;
  }
  
  return result;
}

/**
 * Wrap a string with prefix and suffix
 * @param {string} str - The string to wrap
 * @param {string} prefix - Text to add at the beginning
 * @param {string} suffix - Text to add at the end
 * @returns {string} Wrapped string
 */
function wrapText(str, prefix, suffix) {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }
  
  const prefixText = prefix || '';
  const suffixText = suffix || '';
  
  return prefixText + str + suffixText;
}

/**
 * Insert text at specific character sequences
 * @param {string} str - The string to modify
 * @param {string|RegExp} pattern - Pattern to match for insertion
 * @param {string} insertion - Text to insert
 * @param {Object} options - Additional options
 * @param {boolean} [options.before=false] - Insert before the match
 * @param {boolean} [options.after=true] - Insert after the match
 * @param {boolean} [options.replaceMatch=false] - Replace the match with the insertion
 * @returns {string} Modified string
 */
function insertAtPattern(str, pattern, insertion, options = {}) {
  const { before = false, after = true, replaceMatch = false } = options;
  
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }
  
  if (!pattern) {
    return str;
  }
  
  // Create regex if pattern is a string
  const regex = typeof pattern === 'string'
    ? new RegExp(pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g')
    : pattern;
  
  // Handle replacement based on options
  if (replaceMatch) {
    return str.replace(regex, insertion);
  }
  
  if (before && after) {
    return str.replace(regex, `${insertion}$&${insertion}`);
  }
  
  if (before) {
    return str.replace(regex, `${insertion}$&`);
  }
  
  if (after) {
    return str.replace(regex, `$&${insertion}`);
  }
  
  return str;
}

/**
 * Insert text at specific word boundaries
 * @param {string} str - The string to modify
 * @param {number[]} wordIndices - Indices of words to insert at (0-based)
 * @param {string} insertion - Text to insert
 * @param {Object} options - Additional options
 * @param {boolean} [options.before=false] - Insert before the word
 * @param {boolean} [options.after=true] - Insert after the word
 * @returns {string} Modified string
 */
function insertAtWords(str, wordIndices, insertion, options = {}) {
  const { before = false, after = true } = options;
  
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }
  
  if (!Array.isArray(wordIndices) || wordIndices.length === 0) {
    return str;
  }
  
  // Split into words and non-words (preserving spacing and punctuation)
  const tokenRegex = /(\S+)(\s*)/g;
  const tokens = [];
  let match;
  
  while ((match = tokenRegex.exec(str)) !== null) {
    tokens.push({
      word: match[1],
      space: match[2]
    });
  }
  
  // Insert at specified word indices
  for (const index of wordIndices) {
    if (index >= 0 && index < tokens.length) {
      if (before) {
        tokens[index].word = insertion + tokens[index].word;
      }
      if (after) {
        tokens[index].space = insertion + tokens[index].space;
      }
    }
  }
  
  // Reconstruct the string
  return tokens.map(token => token.word + token.space).join('');
}

module.exports = {
  insertText,
  insertTextMultiple,
  wrapText,
  insertAtPattern,
  insertAtWords
};