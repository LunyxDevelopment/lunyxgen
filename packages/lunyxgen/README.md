# lunyxgen

Advanced random text and data generation library

## Installation

```bash
npm install lunyxgen
```

### String Generation

```javascript
const lunyxgen = require('lunyxgen');

// Generate random strings
lunyxgen.string({ length: 10 }); // "a7Fb9cD3e0"
lunyxgen.string({ length: 8, charset: 'uppercase' }); // "ABCDEFGH"
lunyxgen.string({ charset: 'hex', length: 6 }); // "3a7f9c"

// Generate UUIDs and tokens
lunyxgen.uuid(); // "550e8400-e29b-41d4-a716-446655440000"
lunyxgen.token('xxxx-xxxx-xxxx'); // "a7fb-9cd3-e01f"

// Generate pattern-based strings
lunyxgen.pattern('App-###-AA-aa'); // "App-123-XY-zw"
```

### Number Generation

```javascript
// Generate random integers and floats
lunyxgen.integer({ min: 1, max: 100 }); // 42
lunyxgen.float({ min: 0, max: 1, precision: 2 }); // 0.73

// Generate sets of unique numbers
lunyxgen.uniqueSet({ count: 5, min: 1, max: 50 }); // [7, 12, 23, 38, 45]

// Generate boolean with probability
lunyxgen.boolean(0.7); // true (70% probability)

// Generate normally distributed numbers
lunyxgen.normal({ mean: 0, stdDev: 1 }); // 0.37
```

### Text Generation

```javascript
// Generate random words
lunyxgen.word(); // "test"
lunyxgen.word({ type: 'adjective', capitalize: true }); // "Happy"
lunyxgen.words({ count: 3 }); // ["apple", "blue", "run"]

// Generate sentences
lunyxgen.sentence(); // "Life is good for the country."
lunyxgen.question({ questionType: 'what' }); // "What makes people happy?" 
lunyxgen.structuredSentence({ structure: 'adjective subject verb adverb' }); // "Happy children play quickly."

// Generate paragraphs
lunyxgen.paragraph(); // "Several sentences forming a paragraph..."
lunyxgen.article({ paragraphCount: 3, title: "My Article" }); // Full article
lunyxgen.lorem({ paragraphs: 2 }); // Lorem ipsum text
```

## ESM Support

```javascript
import lunyxgen from 'lunyxgen';
import { string, word, paragraph } from 'lunyxgen';
```

## Advanced Usage

For advanced usage, you can access the full modules:

```javascript
// Access full modules
const { modules } = require('lunyxgen');
const stringUtils = modules.string;
```

## Example

```javascript
const lunyxgen = require('lunyxgen');
const lunyxext = require('@lunyxjs/lunyxgen.ext');

// Generate a random article title
const title = lunyxgen.words({ count: 3, type: 'any', capitalize: true }).join(' ');

// Generate article content
const content = lunyxgen.article({ paragraphCount: 2 });

// Use template to format the article
const article = lunyxext.template('# {{title}}\n\n{{content}}\n\n*Generated on {{date}}*', {
  title,
  content,
  date: new Date().toLocaleDateString()
});

console.log(article);
```

[View Extention Package](https://www.npmjs.com/package/@lunyxjs/lunyxgen.ext)