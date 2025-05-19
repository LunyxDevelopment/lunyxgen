/**
 * Security key generation utilities for lunyxgen
 */

const { generateString } = require('./string');
const crypto = require('node:crypto');

/**
 * Generate a cryptographically secure random key
 * @param {Object} options - Configuration options
 * @param {number} [options.length=32] - Key length in bytes
 * @param {string} [options.encoding='hex'] - Output encoding (hex, base64, binary)
 * @param {string} [options.format='raw'] - Key format (raw, dashed, segmented)
 * @param {number} [options.segmentLength=4] - Length of each segment when format is 'segmented'
 * @returns {string} Secure random key
 */
function generateSecureKey(options = {}) {
  const {
    length = 32,
    encoding = 'hex',
    format = 'raw',
    segmentLength = 4
  } = options;
  
  if (length < 1) {
    throw new Error('Length must be greater than 0');
  }
  
  // Generate cryptographically secure random bytes
  const buffer = crypto.randomBytes(length);
  
  // Convert to specified encoding
  let key = buffer.toString(encoding);
  
  // Apply formatting
  switch (format) {
    case 'dashed':
      key = key.match(/.{4}/g)?.join('-') || key;
      break;
    case 'segmented':
      key = key.match(new RegExp(`.{${segmentLength}}`, 'g'))?.join('-') || key;
      break;
    case 'raw':
    default:
      // Keep as is
      break;
  }
  
  return key;
}

/**
 * Generate an API key with prefix
 * @param {Object} options - Configuration options
 * @param {string} [options.prefix='api'] - Key prefix
 * @param {number} [options.length=32] - Key length in bytes
 * @param {string} [options.separator='_'] - Separator between prefix and key
 * @returns {string} API key
 */
function generateApiKey(options = {}) {
  const {
    prefix = 'api',
    length = 32,
    separator = '_'
  } = options;
  
  const key = generateSecureKey({ length, encoding: 'base64' });
  return `${prefix}${separator}${key}`;
}

/**
 * Generate a JWT secret key
 * @param {Object} options - Configuration options
 * @param {number} [options.length=64] - Key length in bytes
 * @param {boolean} [options.urlSafe=true] - Use URL-safe base64 encoding
 * @returns {string} JWT secret key
 */
function generateJwtSecret(options = {}) {
  const {
    length = 64,
    urlSafe = true
  } = options;
  
  let key = generateSecureKey({ length, encoding: 'base64' });
  
  if (urlSafe) {
    key = key.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }
  
  return key;
}

/**
 * Generate a secure password
 * @param {Object} options - Configuration options
 * @param {number} [options.length=16] - Password length
 * @param {boolean} [options.numbers=true] - Include numbers
 * @param {boolean} [options.symbols=true] - Include symbols
 * @param {boolean} [options.uppercase=true] - Include uppercase letters
 * @param {boolean} [options.lowercase=true] - Include lowercase letters
 * @returns {string} Secure password
 */
function generateSecurePassword(options = {}) {
  const {
    length = 16,
    numbers = true,
    symbols = true,
    uppercase = true,
    lowercase = true
  } = options;
  
  if (length < 8) {
    throw new Error('Password length must be at least 8 characters');
  }
  
  // Build character set based on options
  let charset = '';
  if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (numbers) charset += '0123456789';
  if (symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  if (charset === '') {
    throw new Error('At least one character type must be enabled');
  }
  
  // Generate password ensuring it contains at least one character from each enabled set
  let password = '';
  const sets = [];
  if (lowercase) sets.push('abcdefghijklmnopqrstuvwxyz');
  if (uppercase) sets.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  if (numbers) sets.push('0123456789');
  if (symbols) sets.push('!@#$%^&*()_+-=[]{}|;:,.<>?');
  
  // Add one character from each required set
  sets.forEach(set => {
    password += set[crypto.randomInt(set.length)];
  });
  
  // Fill the rest with random characters
  while (password.length < length) {
    password += charset[crypto.randomInt(charset.length)];
  }
  
  // Shuffle the password
  return password.split('')
    .sort(() => crypto.randomInt(3) - 1)
    .join('');
}

/**
 * Generate encryption key pair
 * @param {Object} options - Configuration options
 * @param {string} [options.type='rsa'] - Key type (rsa, ec)
 * @param {number} [options.modulusLength=2048] - RSA key size in bits
 * @param {string} [options.namedCurve='P-256'] - EC curve name
 * @param {string} [options.format='pem'] - Output format (pem, der)
 * @returns {Object} Key pair object with public and private keys
 */
function generateKeyPair(options = {}) {
  const {
    type = 'rsa',
    modulusLength = 2048,
    namedCurve = 'P-256',
    format = 'pem'
  } = options;
  
  return new Promise((resolve, reject) => {
    const config = type === 'rsa'
      ? {
          modulusLength,
          publicKeyEncoding: { type: 'spki', format },
          privateKeyEncoding: { type: 'pkcs8', format }
        }
      : {
          namedCurve,
          publicKeyEncoding: { type: 'spki', format },
          privateKeyEncoding: { type: 'pkcs8', format }
        };
    
    crypto.generateKeyPair(
      type,
      config,
      (err, publicKey, privateKey) => {
        if (err) reject(err);
        else resolve({ publicKey, privateKey });
      }
    );
  });
}

module.exports = {
  generateSecureKey,
  generateApiKey,
  generateJwtSecret,
  generateSecurePassword,
  generateKeyPair
};