/**
 * Text formatting utilities for @lunyxjs/lunyxgen.ext
 */

/**
 * Format text in various styles
 * @param {string} text - Text to format
 * @param {Object} options - Configuration options
 * @param {string} [options.style='camelCase'] - Formatting style
 * @returns {string} Formatted text
 */
function formatText(text, options = {}) {
  const { style = 'camelCase' } = options;
  
  if (typeof text !== 'string') {
    throw new Error('Input must be a string');
  }
  
  // Split text into words
  const words = text.toLowerCase().split(/[^a-zA-Z0-9]+/);
  
  switch (style) {
    case 'camelCase':
      return words[0] + words.slice(1).map(capitalizeFirst).join('');
    case 'PascalCase':
      return words.map(capitalizeFirst).join('');
    case 'snake_case':
      return words.join('_');
    case 'kebab-case':
      return words.join('-');
    case 'CONSTANT_CASE':
      return words.join('_').toUpperCase();
    case 'dot.case':
      return words.join('.');
    case 'path/case':
      return words.join('/');
    default:
      throw new Error(`Invalid format style: ${style}`);
  }
}

/**
 * Format text as a code identifier
 * @param {string} text - Text to format
 * @param {Object} options - Configuration options
 * @param {string} [options.language='javascript'] - Target language
 * @returns {string} Formatted identifier
 */
function formatIdentifier(text, options = {}) {
  const { language = 'javascript' } = options;
  
  const languageStyles = {
    javascript: 'camelCase',
    python: 'snake_case',
    ruby: 'snake_case',
    php: 'camelCase',
    java: 'camelCase',
    csharp: 'PascalCase',
    go: 'PascalCase',
    rust: 'snake_case'
  };
  
  return formatText(text, { style: languageStyles[language] || 'camelCase' });
}

/**
 * Format text as a file name
 * @param {string} text - Text to format
 * @param {Object} options - Configuration options
 * @param {string} [options.extension=''] - File extension
 * @param {string} [options.style='kebab-case'] - Naming style
 * @returns {string} Formatted file name
 */
function formatFileName(text, options = {}) {
  const { extension = '', style = 'kebab-case' } = options;
  
  const name = formatText(text, { style });
  return extension ? `${name}.${extension.replace(/^\./, '')}` : name;
}

/**
 * Format text as a URL slug
 * @param {string} text - Text to format
 * @param {Object} options - Configuration options
 * @param {boolean} [options.lowercase=true] - Convert to lowercase
 * @param {string} [options.separator='-'] - Word separator
 * @returns {string} URL slug
 */
function formatSlug(text, options = {}) {
  const { lowercase = true, separator = '-' } = options;
  
  let slug = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, separator); // Replace spaces with separator
  
  return lowercase ? slug.toLowerCase() : slug;
}

/**
 * Format text for display
 * @param {string} text - Text to format
 * @param {Object} options - Configuration options
 * @param {string} [options.transform='title'] - Transform type
 * @param {boolean} [options.preserveCase=false] - Preserve existing case
 * @returns {string} Formatted text
 */
function formatDisplay(text, options = {}) {
  const { transform = 'title', preserveCase = false } = options;
  
  if (!preserveCase) {
    text = text.toLowerCase();
  }
  
  switch (transform) {
    case 'title':
      return text.split(/\s+/).map(capitalizeFirst).join(' ');
    case 'sentence':
      return capitalizeFirst(text);
    case 'lower':
      return text.toLowerCase();
    case 'upper':
      return text.toUpperCase();
    default:
      throw new Error(`Invalid transform type: ${transform}`);
  }
}

// Helper function to capitalize first letter
function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
  formatText,
  formatIdentifier,
  formatFileName,
  formatSlug,
  formatDisplay
};