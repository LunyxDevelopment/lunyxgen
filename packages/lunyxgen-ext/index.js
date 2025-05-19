/**
 * @lunyxjs/lunyxgen.ext - Extension for lunyxgen with advanced generation capabilities
 * 
 * This extension library provides advanced text manipulation features:
 * - Prefix utilities
 * - Suffix utilities
 * - Text insertion utilities
 * - Template processing
 * - Advanced transformation patterns
 * - Text formatting utilities
 */

const prefix = require('./lib/prefix');
const suffix = require('./lib/suffix');
const insertion = require('./lib/insertion');
const template = require('./lib/template');
const advanced = require('./lib/advanced');
const format = require('./lib/format');

// Re-export all modules
module.exports = {
  // Prefix utilities
  prefix: prefix.addPrefix,
  prefixEach: prefix.addPrefixToEach,
  prefixMultiple: prefix.addPrefixesMultiple,
  prefixConditional: prefix.addPrefixConditional,
  prefixRotating: prefix.addPrefixRotating,
  
  // Suffix utilities
  suffix: suffix.addSuffix,
  suffixEach: suffix.addSuffixToEach,
  suffixMultiple: suffix.addSuffixesMultiple,
  suffixConditional: suffix.addSuffixConditional,
  suffixRotating: suffix.addSuffixRotating,
  
  // Insertion utilities
  insert: insertion.insertText,
  insertMultiple: insertion.insertTextMultiple,
  wrap: insertion.wrapText,
  insertAtPattern: insertion.insertAtPattern,
  insertAtWords: insertion.insertAtWords,
  
  // Template utilities
  template: template.processTemplate,
  templateArray: template.processTemplateArray,
  templateNested: template.processNestedTemplates,
  templateConditional: template.processConditionalTemplate,
  
  // Advanced utilities
  transform: advanced.transformString,
  transformMultiple: advanced.transformStrings,
  transformWithPatterns: advanced.transformWithPatterns,
  createGenerator: advanced.createPatternGenerator,
  randomTransform: advanced.generateRandomTransformations,
  
  // Format utilities
  format: format.formatText,
  formatIdentifier: format.formatIdentifier,
  formatFileName: format.formatFileName,
  formatSlug: format.formatSlug,
  formatDisplay: format.formatDisplay,
  
  // Full modules for advanced usage
  modules: {
    prefix,
    suffix,
    insertion,
    template,
    advanced,
    format
  }
};