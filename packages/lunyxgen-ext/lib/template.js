/**
 * Template utilities for @lunyxjs/lunyxgen.ext
 */

/**
 * Process a template string with variable replacements
 * @param {string} template - Template string with placeholders
 * @param {Object} vars - Variables to insert into template
 * @param {Object} options - Additional options
 * @param {string} [options.leftDelimiter='{{'] - Left delimiter for variables
 * @param {string} [options.rightDelimiter='}}'] - Right delimiter for variables
 * @param {boolean} [options.keepMissing=false] - Whether to keep placeholders when vars are missing
 * @returns {string} Processed template
 */
function processTemplate(template, vars = {}, options = {}) {
  const {
    leftDelimiter = '{{',
    rightDelimiter = '}}',
    keepMissing = false
  } = options;
  
  if (typeof template !== 'string') {
    throw new Error('Template must be a string');
  }
  
  // Escape delimiters for regex
  const leftDelimRegex = leftDelimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const rightDelimRegex = rightDelimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  
  // Create regex pattern for variable replacements
  const pattern = new RegExp(`${leftDelimRegex}\\s*([\\w.]+)\\s*${rightDelimRegex}`, 'g');
  
  // Process replacements
  return template.replace(pattern, (match, key) => {
    // Handle nested properties (e.g., user.name)
    const value = key.split('.').reduce((obj, prop) => {
      return obj && obj[prop] !== undefined ? obj[prop] : undefined;
    }, vars);
    
    if (value !== undefined) {
      return value;
    }
    
    return keepMissing ? match : '';
  });
}

/**
 * Process a template with array data, repeating for each item
 * @param {string} template - Template string with placeholders
 * @param {Array} items - Array of objects to use for replacements
 * @param {Object} options - Additional options
 * @param {string} [options.separator='\n'] - Separator between repeated items
 * @param {string} [options.leftDelimiter='{{'] - Left delimiter for variables
 * @param {string} [options.rightDelimiter='}}'] - Right delimiter for variables
 * @returns {string} Processed template with repetitions
 */
function processTemplateArray(template, items, options = {}) {
  const {
    separator = '\n',
    leftDelimiter = '{{',
    rightDelimiter = '}}'
  } = options;
  
  if (typeof template !== 'string') {
    throw new Error('Template must be a string');
  }
  
  if (!Array.isArray(items)) {
    throw new Error('Items must be an array');
  }
  
  // Process template for each item and join with separator
  return items
    .map(item => processTemplate(template, item, { leftDelimiter, rightDelimiter }))
    .join(separator);
}

/**
 * Process nested templates (templates within templates)
 * @param {string} template - Template string with nested placeholders
 * @param {Object} vars - Variables for the main template
 * @param {Object} options - Additional options
 * @param {number} [options.maxDepth=3] - Maximum nesting depth to prevent infinite recursion
 * @returns {string} Fully processed template
 */
function processNestedTemplates(template, vars = {}, options = {}) {
  const { maxDepth = 3 } = options;
  
  if (typeof template !== 'string') {
    throw new Error('Template must be a string');
  }
  
  let result = template;
  let depth = 0;
  let previousResult = '';
  
  // Process until stable or max depth reached
  while (result !== previousResult && depth < maxDepth) {
    previousResult = result;
    result = processTemplate(result, vars, options);
    depth++;
  }
  
  return result;
}

/**
 * Process a template with conditional sections
 * @param {string} template - Template with conditional blocks
 * @param {Object} vars - Variables for condition evaluation
 * @param {Object} options - Additional options
 * @param {string} [options.ifStart='{{#if'] - Start of if block
 * @param {string} [options.ifEnd='{{/if}}'] - End of if block
 * @param {string} [options.elseTag='{{else}}'] - Else tag
 * @returns {string} Processed template with conditionals resolved
 */
function processConditionalTemplate(template, vars = {}, options = {}) {
  const {
    ifStart = '{{#if',
    ifEnd = '{{/if}}',
    elseTag = '{{else}}'
  } = options;
  
  if (typeof template !== 'string') {
    throw new Error('Template must be a string');
  }
  
  // Escape for regex
  const ifStartRegex = ifStart.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const ifEndRegex = ifEnd.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const elseTagRegex = elseTag.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  
  // Pattern for conditional blocks
  const pattern = new RegExp(
    `${ifStartRegex}\\s+([\\w.]+)\\s*}}([\\s\\S]*?)(?:${elseTagRegex}([\\s\\S]*?))?${ifEndRegex}`,
    'g'
  );
  
  // Process conditional blocks
  let result = template;
  let match;
  
  while ((match = pattern.exec(template)) !== null) {
    const [fullMatch, condition, ifContent, elseContent = ''] = match;
    
    // Evaluate condition by checking if variable exists and is truthy
    const conditionValue = condition.split('.').reduce((obj, prop) => {
      return obj && obj[prop] !== undefined ? obj[prop] : undefined;
    }, vars);
    
    // Replace with appropriate content
    const replacement = conditionValue ? ifContent : elseContent;
    
    // Find position in result to replace
    const startPos = result.indexOf(fullMatch);
    if (startPos !== -1) {
      result = result.slice(0, startPos) + replacement + result.slice(startPos + fullMatch.length);
      // Reset regex to avoid infinite loop with zero-length matches
      pattern.lastIndex = startPos + replacement.length;
    }
  }
  
  // Process any remaining variables
  return processTemplate(result, vars, options);
}

module.exports = {
  processTemplate,
  processTemplateArray,
  processNestedTemplates,
  processConditionalTemplate
};