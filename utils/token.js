// Import the fs module for file system operations 🗂️
import fs from 'fs';
import bcrypt from 'bcrypt';
// Import the jwt module for working with JSON Web Tokens (JWT) 🔑
import jwt from 'jsonwebtoken';

// Read the private and public keys from files specified by environment variables
const privateKey =  process.env.PRIVKEY //fs.readFileSync(process.env.PRIVKEY);
const publicKey = process.env.PUBKEY// fs.readFileSync(process.env.PUBKEY);

/**
 * Generate a JSON Web Token (JWT) using a secret key
 * @param {string|any} data - Data to be included in the token
 * @returns {jwt.JwtPayload} - The generated JWT
 */
export const getJWT = (data) => {
    // Create a JWT using the secret key
    return jwt.sign({ id: data }, process.env.JWTSECRET, { algorithm: 'HS256' });
};

/**
 * Generate a signed JWT using the private key
 * @param {string|any} data - Data to be included in the token
 * @returns {jwt.JwtPayload} - The signed JWT
 */
export const getSignedJWT = (data) => {
    // Create a signed JWT using the private key
    return jwt.sign({ id: data }, privateKey, {
        algorithm: 'RS256', // Asymmetric signing algorithm
    });
};

/**
 * Verify a JWT using the secret key
 * @param {jwt.JwtPayload} data - The JWT to verify
 * @returns {string|any} - The decoded token data
 */
export const verifyJWT = (data) => {
    // Verify the JWT using the secret key
    return jwt.verify(data, process.env.JWTSECRET, { algorithms: ['HS256'] });
};

/**
 * Verify a signed JWT using the public key
 * @param {jwt.JwtPayload} signedString - The signed JWT to verify
 * @returns {string|any} - The decoded token data
 */
export const verifySignedJWT = (signedString) => {
    // Verify the signed JWT using the public key
    return jwt.verify(signedString, publicKey, {
        algorithms: ['RS256'],
    });
};



/**
 * Hash a plain text password
 * @param {string} password - The plain text password to hash
 * @returns {Promise<string>} - The hashed password
 */
export const hashPassword = async (password) => {
    const saltRounds = 10; // Number of salt rounds for bcrypt
    return await bcrypt.hash(password, saltRounds);
};

/**
 * Compare a plain text password with a hashed password
 * @param {string} password - The plain text password
 * @param {string} hashedPassword - The hashed password
 * @returns {Promise<boolean>} - True if the passwords match, false otherwise
 */
export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};
