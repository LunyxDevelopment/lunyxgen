# @lunyxjs/lunyxgen.ext

Extension for lunyxgen with advanced generation capabilities

## Installation

```bash
npm install @lunyxjs/lunyxgen.ext
```

### Prefix and Suffix

```javascript
const lunyxext = require('@lunyxjs/lunyxgen.ext');

// Add prefixes
lunyxext.prefix('user', 'new_'); // "new_user"
lunyxext.prefixEach(['dog', 'cat'], 'pet_'); // ["pet_dog", "pet_cat"]
lunyxext.prefixMultiple(['apple', 'banana'], ['red_', 'yellow_']); // ["red_apple", "yellow_banana"]

// Add suffixes
lunyxext.suffix('report', '_v1'); // "report_v1" 
lunyxext.suffixRotating(['file1', 'file2', 'file3'], ['_old', '_new']); // ["file1_old", "file2_new", "file3_old"]
```

### Text Insertion

```javascript
// Insert text at positions
lunyxext.insert('Hello World', ' Amazing ', 6); // "Hello Amazing World"
lunyxext.insertMultiple('base', ['pre-', '-mid-', '-post'], [0, 2, 4]); // "pre-ba-mid-se-post"
lunyxext.wrap('content', '/* ', ' */'); // "/* content */"

// Insert at patterns
lunyxext.insertAtPattern('hello world', 'o', '-'); // "hello- wo-rld"
lunyxext.insertAtWords('the quick brown fox', [1, 3], '!'); // "the quick! brown fox!"
```

### Templates

```javascript
// Process templates
lunyxext.template('Hello {{name}}!', { name: 'John' }); // "Hello John!"
lunyxext.templateArray('- {{item}}', [{ item: 'one' }, { item: 'two' }]); // "- one\n- two"

// Conditional templates
lunyxext.templateConditional('{{#if user}}Hello {{user}}!{{else}}Hello Guest!{{/if}}', 
  { user: 'John' }); // "Hello John!"
```

### Advanced Transformations

```javascript
// Transform strings with pattern
lunyxext.transform('base', {
  prefix: 'pre_',
  suffix: '_post',
  insertion: { text: '-mid-', position: 2 }
}); // "pre_ba-mid-se_post"

// Create pattern generators
const idGenerator = lunyxext.createGenerator({
  prefix: 'ID_',
  suffix: '_X',
  custom: str => str.toUpperCase()
});
idGenerator('test'); // "ID_TEST_X"

// Random transformations
lunyxext.randomTransform('base', {
  prefixes: ['pre_', 'super_'],
  suffixes: ['_v1', '_v2'],
  transformCount: 2
}); // Random combination of transformations
```

## ESM Support

```javascript
import lunyxext from '@lunyxjs/lunyxgen.ext';
import { prefix, transform, template } from '@lunyxjs/lunyxgen.ext';
```

## Advanced Usage

For advanced usage, you can access the full modules:

```javascript
// Access full modules
const { modules: extModules } = require('@lunyxjs/lunyxgen.ext');
const templateUtils = extModules.template;
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

[View Core Package](https://www.npmjs.com/package/lunyxgen)