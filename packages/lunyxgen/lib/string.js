/**
 * String generation utilities for lunyxgen
 */

// Character sets for string generation
const CHARSETS = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  special: '!@#$%^&*()_+-=[]{}|;:,.<>?/',
  hex: '0123456789abcdef',
  binary: '01',
  octal: '01234567',
  alpha: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  alphanumeric: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
};

/**
 * Generate a random string based on given options
 * @param {Object} options - Configuration options
 * @param {number} [options.length=10] - Length of the string to generate
 * @param {string} [options.charset='alphanumeric'] - Character set to use
 * @param {string} [options.custom] - Custom character set
 * @param {boolean} [options.exclude] - Characters to exclude
 * @returns {string} Random string
 */
function generateString(options = {}) {
  const {
    length = 10,
    charset = 'alphanumeric',
    custom,
    exclude = ''
  } = options;

  if (length < 1) {
    throw new Error('Length must be greater than 0');
  }

  // Determine character set
  let chars;
  if (custom) {
    chars = custom;
  } else if (CHARSETS[charset]) {
    chars = CHARSETS[charset];
  } else {
    // Handle multiple charsets combined
    chars = charset
      .split(',')
      .map(set => CHARSETS[set.trim()] || '')
      .join('');
    
    if (!chars) {
      throw new Error(`Invalid charset: ${charset}`);
    }
  }

  // Exclude characters if specified
  if (exclude) {
    chars = chars.split('').filter(char => !exclude.includes(char)).join('');
  }

  // Generate random string
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars.charAt(randomIndex);
  }

  return result;
}

/**
 * Generate a random hexadecimal string
 * @param {number} length - Length of the hex string
 * @returns {string} Random hex string
 */
function generateHex(length = 10) {
  return generateString({ length, charset: 'hex' });
}

/**
 * Generate a random UUID v4
 * @returns {string} Random UUID
 */
function generateUUID() {
  const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  return template.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Generate a random token with specified format
 * @param {string} format - Format pattern for the token
 * @returns {string} Formatted token
 */
function generateToken(format = 'xxxx-xxxx-xxxx-xxxx') {
  return format.replace(/x/g, () => {
    const r = Math.floor(Math.random() * 16);
    return r.toString(16);
  });
}

/**
 * Generate a random pattern-based string
 * @param {string} pattern - Pattern with special placeholders
 * @returns {string} String generated based on pattern
 */
function generatePattern(pattern) {
  if (!pattern) {
    throw new Error('Pattern is required');
  }

  // Handle different pattern placeholders
  // A: uppercase letter, a: lowercase letter, #: digit, !: special char
  return pattern.replace(/[Aa#!]/g, (char) => {
    switch (char) {
      case 'A': return CHARSETS.uppercase.charAt(Math.floor(Math.random() * CHARSETS.uppercase.length));
      case 'a': return CHARSETS.lowercase.charAt(Math.floor(Math.random() * CHARSETS.lowercase.length));
      case '#': return CHARSETS.numbers.charAt(Math.floor(Math.random() * CHARSETS.numbers.length));
      case '!': return CHARSETS.special.charAt(Math.floor(Math.random() * CHARSETS.special.length));
      default: return char;
    }
  });
}

module.exports = {
  generateString,
  generateHex,
  generateUUID,
  generateToken,
  generatePattern,
  CHARSETS
};