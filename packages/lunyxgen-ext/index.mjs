/**
 * @lunyxjs/lunyxgen.ext - Extension for lunyxgen with advanced generation capabilities (ESM version)
 * 
 * This extension library provides advanced text manipulation features:
 * - Prefix utilities
 * - Suffix utilities
 * - Text insertion utilities
 * - Template processing
 * - Advanced transformation patterns
 * - Text formatting utilities
 */

import * as prefixModule from './lib/prefix.js';
import * as suffixModule from './lib/suffix.js';
import * as insertionModule from './lib/insertion.js';
import * as templateModule from './lib/template.js';
import * as advancedModule from './lib/advanced.js';
import * as formatModule from './lib/format.js';

// Re-export functions for ESM
export const prefix = prefixModule.addPrefix;
export const prefixEach = prefixModule.addPrefixToEach;
export const prefixMultiple = prefixModule.addPrefixesMultiple;
export const prefixConditional = prefixModule.addPrefixConditional;
export const prefixRotating = prefixModule.addPrefixRotating;

export const suffix = suffixModule.addSuffix;
export const suffixEach = suffixModule.addSuffixToEach;
export const suffixMultiple = suffixModule.addSuffixesMultiple;
export const suffixConditional = suffixModule.addSuffixConditional;
export const suffixRotating = suffixModule.addSuffixRotating;

export const insert = insertionModule.insertText;
export const insertMultiple = insertionModule.insertTextMultiple;
export const wrap = insertionModule.wrapText;
export const insertAtPattern = insertionModule.insertAtPattern;
export const insertAtWords = insertionModule.insertAtWords;

export const template = templateModule.processTemplate;
export const templateArray = templateModule.processTemplateArray;
export const templateNested = templateModule.processNestedTemplates;
export const templateConditional = templateModule.processConditionalTemplate;

export const transform = advancedModule.transformString;
export const transformMultiple = advancedModule.transformStrings;
export const transformWithPatterns = advancedModule.transformWithPatterns;
export const createGenerator = advancedModule.createPatternGenerator;
export const randomTransform = advancedModule.generateRandomTransformations;

export const format = formatModule.formatText;
export const formatIdentifier = formatModule.formatIdentifier;
export const formatFileName = formatModule.formatFileName;
export const formatSlug = formatModule.formatSlug;
export const formatDisplay = formatModule.formatDisplay;

// Export modules for advanced usage
export const modules = {
  prefix: prefixModule,
  suffix: suffixModule,
  insertion: insertionModule,
  template: templateModule,
  advanced: advancedModule,
  format: formatModule
};

// Default export for convenience
export default {
  prefix,
  prefixEach,
  prefixMultiple,
  prefixConditional,
  prefixRotating,
  
  suffix,
  suffixEach,
  suffixMultiple,
  suffixConditional,
  suffixRotating,
  
  insert,
  insertMultiple,
  wrap,
  insertAtPattern,
  insertAtWords,
  
  template,
  templateArray,
  templateNested,
  templateConditional,
  
  transform,
  transformMultiple,
  transformWithPatterns,
  createGenerator,
  randomTransform,
  
  format,
  formatIdentifier,
  formatFileName,
  formatSlug,
  formatDisplay,
  
  modules
};