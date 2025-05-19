/**
 * Advanced generation utilities for lunyxgen
 */

const { generateWord } = require('./word');
const { generateString } = require('./string');
const { generateInteger } = require('./number');

/**
 * Generate a random color in various formats
 * @param {Object} options - Configuration options
 * @param {string} [options.format='hex'] - Color format (hex, rgb, hsl)
 * @param {boolean} [options.alpha=false] - Include alpha channel
 * @returns {string} Random color
 */
function generateColor(options = {}) {
  const { format = 'hex', alpha = false } = options;
  
  switch (format) {
    case 'hex': {
      const color = generateString({ length: 6, charset: 'hex' });
      return alpha 
        ? `#${color}${generateString({ length: 2, charset: 'hex' })}`
        : `#${color}`;
    }
    case 'rgb': {
      const r = generateInteger({ max: 255 });
      const g = generateInteger({ max: 255 });
      const b = generateInteger({ max: 255 });
      return alpha
        ? `rgba(${r}, ${g}, ${b}, ${Math.random().toFixed(2)})`
        : `rgb(${r}, ${g}, ${b})`;
    }
    case 'hsl': {
      const h = generateInteger({ max: 360 });
      const s = generateInteger({ max: 100 });
      const l = generateInteger({ max: 100 });
      return alpha
        ? `hsla(${h}, ${s}%, ${l}%, ${Math.random().toFixed(2)})`
        : `hsl(${h}, ${s}%, ${l}%)`;
    }
    default:
      throw new Error(`Invalid color format: ${format}`);
  }
}

/**
 * Generate a random username
 * @param {Object} options - Configuration options
 * @param {string} [options.style='simple'] - Username style (simple, gamer, professional)
 * @param {boolean} [options.numbers=true] - Include numbers
 * @returns {string} Random username
 */
function generateUsername(options = {}) {
  const { style = 'simple', numbers = true } = options;
  
  switch (style) {
    case 'simple': {
      const word = generateWord({ type: 'noun', capitalize: true });
      return numbers 
        ? `${word}${generateInteger({ max: 999 })}`
        : word;
    }
    case 'gamer': {
      const prefix = ['Pro', 'Elite', 'Epic', 'Ultra', 'Master'][generateInteger({ max: 4 })];
      const word = generateWord({ type: 'noun', capitalize: true });
      const suffix = numbers 
        ? generateInteger({ max: 9999 })
        : ['X', 'Pro', 'Master', 'Elite'][generateInteger({ max: 3 })];
      return `${prefix}${word}${suffix}`;
    }
    case 'professional': {
      const firstName = generateWord({ type: 'noun', capitalize: true });
      const lastName = generateWord({ type: 'noun', capitalize: true });
      return numbers
        ? `${firstName}.${lastName}${generateInteger({ max: 99 })}`
        : `${firstName}.${lastName}`;
    }
    default:
      throw new Error(`Invalid username style: ${style}`);
  }
}

/**
 * Generate a random emoji sequence
 * @param {Object} options - Configuration options
 * @param {number} [options.count=1] - Number of emojis
 * @param {string} [options.category='all'] - Emoji category
 * @returns {string} Random emoji sequence
 */
function generateEmoji(options = {}) {
  const { count = 1, category = 'all' } = options;
  
  const categories = {
    faces: ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸'],
    food: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥'],
    nature: ['🌸', '💮', '🏵️', '🌹', '🥀', '🌺', '🌻', '🌼', '🌷', '🌱', '🌲', '🌳', '🌴', '🌵'],
    objects: ['📱', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '📷', '🎥', '🎞️', '📽️', '🎬', '📺', '�radio']
  };
  
  let emojiPool;
  if (category === 'all') {
    emojiPool = Object.values(categories).flat();
  } else if (categories[category]) {
    emojiPool = categories[category];
  } else {
    throw new Error(`Invalid emoji category: ${category}`);
  }
  
  let result = '';
  for (let i = 0; i < count; i++) {
    result += emojiPool[generateInteger({ max: emojiPool.length - 1 })];
  }
  
  return result;
}

/**
 * Generate a random code snippet
 * @param {Object} options - Configuration options
 * @param {string} [options.language='javascript'] - Programming language
 * @param {string} [options.type='function'] - Snippet type
 * @returns {string} Code snippet
 */
function generateCodeSnippet(options = {}) {
  const { language = 'javascript', type = 'function' } = options;
  
  const functionName = generateWord({ type: 'verb' }) + generateWord({ type: 'noun', capitalize: true });
  const paramName = generateWord({ type: 'noun' });
  
  switch (language) {
    case 'javascript':
      switch (type) {
        case 'function':
          return `function ${functionName}(${paramName}) {\n  return ${paramName};\n}`;
        case 'arrow':
          return `const ${functionName} = (${paramName}) => ${paramName};`;
        case 'class':
          return `class ${functionName} {\n  constructor(${paramName}) {\n    this.${paramName} = ${paramName};\n  }\n}`;
        default:
          throw new Error(`Invalid snippet type: ${type}`);
      }
    case 'python':
      switch (type) {
        case 'function':
          return `def ${functionName}(${paramName}):\n    return ${paramName}`;
        case 'class':
          return `class ${functionName}:\n    def __init__(self, ${paramName}):\n        self.${paramName} = ${paramName}`;
        default:
          throw new Error(`Invalid snippet type: ${type}`);
      }
    default:
      throw new Error(`Invalid language: ${language}`);
  }
}

module.exports = {
  generateColor,
  generateUsername,
  generateEmoji,
  generateCodeSnippet
};