/**
 * lunyxgen - Advanced random text and data generation library
 * 
 * This library provides various utilities for generating random strings,
 * numbers, words, sentences, paragraphs, educational facts, and security keys.
 */

const string = require('./lib/string');
const number = require('./lib/number');
const word = require('./lib/word');
const sentence = require('./lib/sentence');
const paragraph = require('./lib/paragraph');
const facts = require('./lib/facts');
const security = require('./lib/security');
const advanced = require('./lib/advanced');

// Re-export all modules
module.exports = {
  // String generation
  string: string.generateString,
  hex: string.generateHex,
  uuid: string.generateUUID,
  token: string.generateToken,
  pattern: string.generatePattern,
  
  // Number generation
  integer: number.generateInteger,
  float: number.generateFloat,
  uniqueSet: number.generateUniqueSet,
  boolean: number.generateBoolean,
  normal: number.generateNormal,
  
  // Word generation
  word: word.generateWord,
  words: word.generateWords,
  compoundWord: word.generateCompoundWord,
  
  // Sentence generation
  sentence: sentence.generateSentence,
  sentences: sentence.generateSentences,
  structuredSentence: sentence.generateStructuredSentence,
  question: sentence.generateQuestion,
  
  // Paragraph generation
  paragraph: paragraph.generateParagraph,
  paragraphs: paragraph.generateParagraphs,
  article: paragraph.generateArticle,
  lorem: paragraph.generateLorem,
  
  // Facts generation
  fact: facts.generateFact,
  facts: facts.generateFacts,
  factCategories: facts.getCategories,
  quizQuestion: facts.generateQuizQuestion,
  
  // Security key generation
  secureKey: security.generateSecureKey,
  apiKey: security.generateApiKey,
  jwtSecret: security.generateJwtSecret,
  securePassword: security.generateSecurePassword,
  keyPair: security.generateKeyPair,
  
  // Advanced generation
  color: advanced.generateColor,
  username: advanced.generateUsername,
  emoji: advanced.generateEmoji,
  codeSnippet: advanced.generateCodeSnippet,
  
  // Full modules for advanced usage
  modules: {
    string,
    number,
    word,
    sentence,
    paragraph,
    facts,
    security,
    advanced
  }
};