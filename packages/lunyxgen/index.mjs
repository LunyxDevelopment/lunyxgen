/**
 * lunyxgen - Advanced random text and data generation library (ESM version)
 * 
 * This library provides various utilities for generating random strings,
 * numbers, words, sentences, paragraphs, educational facts, and security keys.
 */

import * as stringModule from './lib/string.js';
import * as numberModule from './lib/number.js';
import * as wordModule from './lib/word.js';
import * as sentenceModule from './lib/sentence.js';
import * as paragraphModule from './lib/paragraph.js';
import * as factsModule from './lib/facts.js';
import * as securityModule from './lib/security.js';
import * as advancedModule from './lib/advanced.js';

// Re-export functions for ESM
export const string = stringModule.generateString;
export const hex = stringModule.generateHex;
export const uuid = stringModule.generateUUID;
export const token = stringModule.generateToken;
export const pattern = stringModule.generatePattern;

export const integer = numberModule.generateInteger;
export const float = numberModule.generateFloat;
export const uniqueSet = numberModule.generateUniqueSet;
export const boolean = numberModule.generateBoolean;
export const normal = numberModule.generateNormal;

export const word = wordModule.generateWord;
export const words = wordModule.generateWords;
export const compoundWord = wordModule.generateCompoundWord;

export const sentence = sentenceModule.generateSentence;
export const sentences = sentenceModule.generateSentences;
export const structuredSentence = sentenceModule.generateStructuredSentence;
export const question = sentenceModule.generateQuestion;

export const paragraph = paragraphModule.generateParagraph;
export const paragraphs = paragraphModule.generateParagraphs;
export const article = paragraphModule.generateArticle;
export const lorem = paragraphModule.generateLorem;

export const fact = factsModule.generateFact;
export const facts = factsModule.generateFacts;
export const factCategories = factsModule.getCategories;
export const quizQuestion = factsModule.generateQuizQuestion;

export const secureKey = securityModule.generateSecureKey;
export const apiKey = securityModule.generateApiKey;
export const jwtSecret = securityModule.generateJwtSecret;
export const securePassword = securityModule.generateSecurePassword;
export const keyPair = securityModule.generateKeyPair;

export const color = advancedModule.generateColor;
export const username = advancedModule.generateUsername;
export const emoji = advancedModule.generateEmoji;
export const codeSnippet = advancedModule.generateCodeSnippet;

// Export modules for advanced usage
export const modules = {
  string: stringModule,
  number: numberModule,
  word: wordModule,
  sentence: sentenceModule,
  paragraph: paragraphModule,
  facts: factsModule,
  security: securityModule,
  advanced: advancedModule
};

// Default export for convenience
export default {
  string,
  hex,
  uuid,
  token,
  pattern,
  integer,
  float,
  uniqueSet,
  boolean,
  normal,
  word,
  words,
  compoundWord,
  sentence,
  sentences,
  structuredSentence,
  question,
  paragraph,
  paragraphs,
  article,
  lorem,
  fact,
  facts,
  factCategories,
  quizQuestion,
  secureKey,
  apiKey,
  jwtSecret,
  securePassword,
  keyPair,
  color,
  username,
  emoji,
  codeSnippet,
  modules
};