/**
 * Number generation utilities for lunyxgen
 */

/**
 * Generate a random integer between min and max (inclusive)
 * @param {Object} options - Configuration options
 * @param {number} [options.min=0] - Minimum value (inclusive)
 * @param {number} [options.max=100] - Maximum value (inclusive)
 * @param {boolean} [options.excludes] - Array of numbers to exclude
 * @returns {number} Random integer
 */
function generateInteger(options = {}) {
  const { min = 0, max = 100, excludes = [] } = options;
  
  if (min > max) {
    throw new Error('Min cannot be greater than max');
  }
  
  if (Array.isArray(excludes) && excludes.length > 0) {
    // Create array of valid numbers
    const validNumbers = [];
    for (let i = min; i <= max; i++) {
      if (!excludes.includes(i)) {
        validNumbers.push(i);
      }
    }
    
    if (validNumbers.length === 0) {
      throw new Error('No valid numbers available after exclusions');
    }
    
    const randomIndex = Math.floor(Math.random() * validNumbers.length);
    return validNumbers[randomIndex];
  }
  
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random float between min and max
 * @param {Object} options - Configuration options
 * @param {number} [options.min=0] - Minimum value (inclusive)
 * @param {number} [options.max=1] - Maximum value (inclusive)
 * @param {number} [options.precision=2] - Number of decimal places
 * @returns {number} Random float
 */
function generateFloat(options = {}) {
  const { min = 0, max = 1, precision = 2 } = options;
  
  if (min > max) {
    throw new Error('Min cannot be greater than max');
  }
  
  const random = Math.random() * (max - min) + min;
  return Number(random.toFixed(precision));
}

/**
 * Generate a set of unique random numbers
 * @param {Object} options - Configuration options
 * @param {number} [options.count=5] - Number of unique numbers to generate
 * @param {number} [options.min=1] - Minimum value (inclusive)
 * @param {number} [options.max=100] - Maximum value (inclusive)
 * @returns {Array<number>} Array of unique random numbers
 */
function generateUniqueSet(options = {}) {
  const { count = 5, min = 1, max = 100 } = options;
  
  if (min > max) {
    throw new Error('Min cannot be greater than max');
  }
  
  const range = max - min + 1;
  if (count > range) {
    throw new Error(`Cannot generate ${count} unique numbers in range ${min}-${max}`);
  }
  
  const result = new Set();
  while (result.size < count) {
    result.add(Math.floor(Math.random() * range) + min);
  }
  
  return Array.from(result);
}

/**
 * Generate a random boolean with a specified probability
 * @param {number} [probability=0.5] - Probability of returning true (0-1)
 * @returns {boolean} Random boolean
 */
function generateBoolean(probability = 0.5) {
  if (probability < 0 || probability > 1) {
    throw new Error('Probability must be between 0 and 1');
  }
  
  return Math.random() < probability;
}

/**
 * Generate a normally distributed random number
 * @param {Object} options - Configuration options
 * @param {number} [options.mean=0] - Mean of the distribution
 * @param {number} [options.stdDev=1] - Standard deviation
 * @param {number} [options.precision=2] - Number of decimal places
 * @returns {number} Normally distributed random number
 */
function generateNormal(options = {}) {
  const { mean = 0, stdDev = 1, precision = 2 } = options;
  
  // Box-Muller transform
  const u1 = Math.random();
  const u2 = Math.random();
  
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  const value = z0 * stdDev + mean;
  
  return Number(value.toFixed(precision));
}

module.exports = {
  generateInteger,
  generateFloat,
  generateUniqueSet,
  generateBoolean,
  generateNormal
};