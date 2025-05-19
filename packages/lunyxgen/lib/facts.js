/**
 * Facts generation utilities for lunyxgen
 */

const FACTS = {
  science: [
    "A teaspoonful of neutron star would weigh 6 billion tons",
    "Honey never spoils. Archaeologists found 3000-year-old honey in Egyptian tombs",
    "A day on Venus is longer than its year",
    "20% of Earth's oxygen is produced by the Amazon rainforest",
    "A bolt of lightning is five times hotter than the sun's surface",
    "DNA is like a computer program but far more advanced than any software ever created",
    "The human brain processes images 60,000 times faster than text",
    "Quantum entanglement allows particles to instantly communicate across any distance",
    "The observable universe contains more than 100 billion galaxies",
    "Every second, the Sun converts 600 million tons of hydrogen into helium"
  ],
  history: [
    "The Great Wall of China took over 2000 years to build",
    "Ancient Egyptians used moldy bread as a form of antibiotic",
    "The first computer programmer was a woman - Ada Lovelace",
    "Vikings used melted snow to create navigation tools",
    "The shortest war in history lasted 38 minutes between Britain and Zanzibar",
    "Ancient Romans used urine as mouthwash",
    "The first oranges weren't orange - they were green",
    "Coffee was discovered by goats in Ethiopia around 850 AD",
    "The Eiffel Tower can grow up to 6 inches taller during summer",
    "Cleopatra lived closer to the invention of the iPhone than to the building of pyramids"
  ],
  technology: [
    "The first computer mouse was made of wood",
    "The first webpage is still online at info.cern.ch",
    "Email was invented before the internet",
    "The first computer virus was created in 1983",
    "The original name for Google was BackRub",
    "The first text message said 'Merry Christmas'",
    "The QWERTY keyboard was designed to slow typing",
    "The first YouTube video was uploaded on April 23, 2005",
    "Bitcoin's creator remains anonymous to this day",
    "The first computer bug was an actual bug - a moth"
  ],
  psychology: [
    "The human brain can store 2.5 petabytes of data",
    "Your brain is more active during sleep than during the day",
    "Humans can only maintain about 150 meaningful relationships",
    "The brain named itself",
    "Memory is like a game of telephone - it changes slightly each time you recall it",
    "Decisions are often made several seconds before we become consciously aware of them",
    "The brain consumes 20% of the body's total energy",
    "Multitasking is physically impossible for the brain",
    "The brain continues to develop until age 25",
    "People who speak multiple languages have denser grey matter"
  ],
  programming: [
    "The first programmer was Ada Lovelace, who wrote the first algorithm for the Analytical Engine",
    "JavaScript was created in just 10 days by Brendan Eich",
    "Python was named after Monty Python, not the snake",
    "The first computer game was created in 1961 - Spacewar!",
    "Linux was created as a hobby by Linus Torvalds",
    "The term 'bug' comes from an actual moth found in a computer relay",
    "Ruby was created on February 24, 1993 - a birthday present from Yukihiro Matsumoto to himself",
    "The first website went live on August 6, 1991",
    "Node.js was created because JavaScript was 'trapped in the browser'",
    "Git was created by Linus Torvalds in just 3 days"
  ]
};

/**
 * Generate a random fact
 * @param {Object} options - Configuration options
 * @param {string} [options.category='random'] - Fact category (science, history, technology, psychology, programming, random)
 * @param {boolean} [options.unique=false] - Whether to ensure unique facts in multiple calls
 * @returns {string} Random fact
 */
function generateFact(options = {}) {
  const { category = 'random', unique = false } = options;
  
  let facts;
  if (category === 'random') {
    // Combine all categories
    facts = Object.values(FACTS).flat();
  } else if (FACTS[category]) {
    facts = FACTS[category];
  } else {
    throw new Error(`Invalid category: ${category}`);
  }
  
  if (unique) {
    // Store used facts in closure to ensure uniqueness across calls
    if (!generateFact.usedFacts) {
      generateFact.usedFacts = new Set();
    }
    
    const availableFacts = facts.filter(fact => !generateFact.usedFacts.has(fact));
    if (availableFacts.length === 0) {
      generateFact.usedFacts.clear(); // Reset when all facts are used
      return generateFact(options);
    }
    
    const fact = availableFacts[Math.floor(Math.random() * availableFacts.length)];
    generateFact.usedFacts.add(fact);
    return fact;
  }
  
  return facts[Math.floor(Math.random() * facts.length)];
}

/**
 * Generate multiple random facts
 * @param {Object} options - Configuration options
 * @param {number} [options.count=3] - Number of facts to generate
 * @param {string} [options.category='random'] - Fact category
 * @param {boolean} [options.unique=true] - Whether facts should be unique
 * @returns {string[]} Array of random facts
 */
function generateFacts(options = {}) {
  const { count = 3, category = 'random', unique = true } = options;
  
  if (count < 1) {
    throw new Error('Count must be at least 1');
  }
  
  if (unique) {
    const facts = [];
    for (let i = 0; i < count; i++) {
      facts.push(generateFact({ category, unique: true }));
    }
    return facts;
  } else {
    return Array.from({ length: count }, () => generateFact({ category }));
  }
}

/**
 * Get available fact categories
 * @returns {string[]} Array of available categories
 */
function getCategories() {
  return Object.keys(FACTS);
}

/**
 * Generate a fact-based quiz question
 * @param {Object} options - Configuration options
 * @param {string} [options.category='random'] - Fact category
 * @returns {Object} Quiz question object with question and answer
 */
function generateQuizQuestion(options = {}) {
  const fact = generateFact(options);
  
  // Convert fact into question-answer format
  const sentences = fact.split(/[.!?]+/).filter(Boolean);
  if (sentences.length > 1) {
    return {
      question: sentences[0] + '?',
      answer: sentences.slice(1).join('. ').trim()
    };
  } else {
    // For single-sentence facts, create a fill-in-the-blank
    const words = fact.split(' ');
    const keyWordIndex = Math.floor(words.length / 2);
    const answer = words[keyWordIndex];
    words[keyWordIndex] = '_____';
    
    return {
      question: words.join(' '),
      answer
    };
  }
}

module.exports = {
  generateFact,
  generateFacts,
  getCategories,
  generateQuizQuestion,
  FACTS
};