import Users from '../models/users.js'; // Import the Users model
import { sendSuccess, sendError } from '../helpers/http.response.js'; // Import response helpers
import { getJWT,comparePassword } from '../utils/token.js'; // Import getJWT function from token.js
import Menus from '../models/menus.js';


const login = async (req, res) => {
    // Extract username and password from the request body
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await Users.findOne({ where: { username } });
 

        // Check if user exists
        if (!user) {
            return sendError(res, 401, 'Invalid username');
        }

        // Validate the password using bcrypt
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return sendError(res, 401, 'Invalid password');
        }

        // Generate a token for the user using getJWT
        const token = getJWT({ id: user.id, username: user.username });

        const menus = await Menus.findAll();

        // Transform menus into a parent-child structure
        const menuTree = buildMenuTree(menus);
        console.log('user:', user);
        // Send success response with user details and token
        return sendSuccess(res, 200, 'Login successful', {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            menuTree,
            token,
        });
    } catch (error) {
        // Handle unexpected errors
        console.error('Login error:', error);
        return sendError(res, 500, 'An error occurred during login', error);
    }
};

/**
 * Get all menus with parent-child relationship
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
export const getMenus = async (req, res) => {
    try {
        // Fetch all menus from the database
        const menus = await Menus.findAll();

        // Transform menus into a parent-child structure
        const menuTree = buildMenuTree(menus);

        // Send success response with the menu tree
        return sendSuccess(res, 200, 'Menus fetched successfully', menuTree);
    } catch (error) {
        // Handle unexpected errors
        return sendError(res, 500, 'An error occurred while fetching menus', error);
    }
};

/**
 * Build a parent-child menu tree
 * @param {Array} menus - Flat array of menus
 * @returns {Array} - Hierarchical menu tree
 */
const buildMenuTree = (menus) => {
    const menuMap = {};

    // Map menus by their ID
    menus.forEach((menu) => {
        menuMap[menu.id] = { ...menu.dataValues, children: [] };
    });

    const menuTree = [];

    // Build the tree structure
    menus.forEach((menu) => {
        if (menu.parent_id) {
            // If the menu has a parent, add it to the parent's children
            menuMap[menu.parent_id].children.push(menuMap[menu.id]);
        } else {
            // If the menu has no parent, add it to the root level
            menuTree.push(menuMap[menu.id]);
        }
    });

    return menuTree;
};

export { login };