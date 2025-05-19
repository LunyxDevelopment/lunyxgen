// Example usage of lunyxgen and @lunyxjs/lunyxgen.ext

// Import the base package
const lunyxgen = require('./packages/lunyxgen');

// Import the extension package
const lunyxext = require('./packages/lunyxgen-ext');

console.log('==== LUNYXGEN EXAMPLES ====');

// Generate a random string
console.log('\nRandom String:');
console.log(lunyxgen.string({ length: 12, charset: 'alphanumeric' }));

// Generate a random number
console.log('\nRandom Number:');
console.log(lunyxgen.integer({ min: 1, max: 100 }));

// Generate a random word
console.log('\nRandom Word:');
console.log(lunyxgen.word({ type: 'noun', capitalize: true }));

// Generate a random sentence
console.log('\nRandom Sentence:');
console.log(lunyxgen.sentence({ wordCount: 8 }));

// Generate a random paragraph
console.log('\nRandom Paragraph:');
console.log(lunyxgen.paragraph({ sentenceCount: 3 }));

// Generate random facts
console.log('\nRandom Facts:');
console.log('\nScience Fact:', lunyxgen.fact({ category: 'science' }));
console.log('\nTechnology Fact:', lunyxgen.fact({ category: 'technology' }));
console.log('\nProgramming Fact:', lunyxgen.fact({ category: 'programming' }));

// Generate a quiz question
console.log('\nQuiz Question:');
const quiz = lunyxgen.quizQuestion({ category: 'psychology' });
console.log('Q:', quiz.question);
console.log('A:', quiz.answer);

// Generate security keys
console.log('\nSecurity Keys:');

// Generate a secure API key
console.log('\nAPI Key:', lunyxgen.apiKey({ prefix: 'sk', length: 32 }));

// Generate a JWT secret
console.log('\nJWT Secret:', lunyxgen.jwtSecret());

// Generate a secure password
console.log('\nSecure Password:', lunyxgen.securePassword({
  length: 16,
  numbers: true,
  symbols: true
}));

// Generate a secure key with custom format
console.log('\nFormatted Secure Key:', lunyxgen.secureKey({
  length: 16,
  format: 'segmented',
  segmentLength: 4
}));

// Try new advanced generators
console.log('\n==== NEW ADVANCED GENERATORS ====');

// Generate random colors
console.log('\nRandom Colors:');
console.log('HEX:', lunyxgen.color({ format: 'hex' }));
console.log('RGB:', lunyxgen.color({ format: 'rgb' }));
console.log('HSL:', lunyxgen.color({ format: 'hsl' }));
console.log('RGBA:', lunyxgen.color({ format: 'rgb', alpha: true }));

// Generate usernames
console.log('\nRandom Usernames:');
console.log('Simple:', lunyxgen.username({ style: 'simple' }));
console.log('Gamer:', lunyxgen.username({ style: 'gamer' }));
console.log('Professional:', lunyxgen.username({ style: 'professional' }));

// Generate emojis
console.log('\nRandom Emojis:');
console.log('Single:', lunyxgen.emoji());
console.log('Multiple:', lunyxgen.emoji({ count: 3 }));
console.log('Category (animals):', lunyxgen.emoji({ count: 2, category: 'animals' }));

// Generate code snippets
console.log('\nRandom Code Snippets:');
console.log('\nJavaScript Function:');
console.log(lunyxgen.codeSnippet({ language: 'javascript', type: 'function' }));
console.log('\nPython Class:');
console.log(lunyxgen.codeSnippet({ language: 'python', type: 'class' }));

console.log('\n==== LUNYXGEN.EXT EXAMPLES ====');

// Add a prefix to a string
console.log('\nPrefix Example:');
console.log(lunyxext.prefix('user', 'new_', { separator: '' }));

// Add a suffix to a string
console.log('\nSuffix Example:');
console.log(lunyxext.suffix('document', '_v1', { separator: '' }));

// Insert text in the middle
console.log('\nInsertion Example:');
console.log(lunyxext.insert('Hello World', ' Amazing ', 6));

// Process a template
console.log('\nTemplate Example:');
console.log(lunyxext.template('Hello {{name}}! Welcome to {{place}}.', { 
  name: 'John',
  place: 'Wonderland'
}));

// Advanced transformation
console.log('\nAdvanced Transform Example:');
const baseString = lunyxgen.word({ type: 'noun', capitalize: true });
console.log(`Base string: ${baseString}`);
console.log('Transformed: ' + lunyxext.transform(baseString, {
  prefix: 'Super',
  suffix: 'Deluxe',
  insertion: {
    text: '-Ultra-',
    position: { atEnd: false }
  }
}));

// Generate with pattern
console.log('\nPattern Generator Example:');
const nameGenerator = lunyxext.createGenerator({
  prefix: 'Agent ',
  suffix: '',
  custom: (str) => str.toUpperCase()
});

const randomNames = lunyxgen.words({ count: 3, type: 'noun', capitalize: true });
console.log('Original names:', randomNames.join(', '));
console.log('Transformed names:', nameGenerator(randomNames).join(', '));

// Try new format utilities
console.log('\n==== NEW FORMAT UTILITIES ====');

// Format text in different styles
console.log('\nText Format Examples:');
const text = 'hello world example';
console.log('camelCase:', lunyxext.format(text, { style: 'camelCase' }));
console.log('PascalCase:', lunyxext.format(text, { style: 'PascalCase' }));
console.log('snake_case:', lunyxext.format(text, { style: 'snake_case' }));
console.log('kebab-case:', lunyxext.format(text, { style: 'kebab-case' }));
console.log('CONSTANT_CASE:', lunyxext.format(text, { style: 'CONSTANT_CASE' }));

// Format identifiers for different languages
console.log('\nIdentifier Format Examples:');
console.log('JavaScript:', lunyxext.formatIdentifier(text, { language: 'javascript' }));
console.log('Python:', lunyxext.formatIdentifier(text, { language: 'python' }));
console.log('Ruby:', lunyxext.formatIdentifier(text, { language: 'ruby' }));

// Format file names
console.log('\nFile Name Format Examples:');
console.log('Component:', lunyxext.formatFileName(text, { extension: 'jsx' }));
console.log('Style:', lunyxext.formatFileName(text, { extension: 'css', style: 'kebab-case' }));

// Format URL slugs
console.log('\nSlug Format Examples:');
const title = 'Hello World: A Simple Example!';
console.log('Default:', lunyxext.formatSlug(title));
console.log('Custom separator:', lunyxext.formatSlug(title, { separator: '_' }));

// Format display text
console.log('\nDisplay Format Examples:');
console.log('Title case:', lunyxext.formatDisplay(text, { transform: 'title' }));
console.log('Sentence case:', lunyxext.formatDisplay(text, { transform: 'sentence' }));

console.log('\n==== COMBINED EXAMPLES ====');

// Generate a random article with templating
const articleTitle = lunyxgen.words({ count: 3, type: 'any', capitalize: true }).join(' ');
const articleTemplate = '# {{title}}\n\n{{content}}\n\n*Generated on {{date}}*';

const article = lunyxext.template(articleTemplate, {
  title: articleTitle,
  content: lunyxgen.article({ paragraphCount: 2 }),
  date: new Date().toLocaleDateString()
});

console.log('\nGenerated Article:');
console.log(article);

console.log('\nDone!');