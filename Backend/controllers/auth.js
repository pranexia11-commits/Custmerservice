import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq, or } from 'drizzle-orm';

const JWT_SECRET = process.env.JWT_SECRET || process.env.JWT_SECRECT || 'default_jwt_secret_key_change_me_in_production';

/**
 * Register Admin User
 */
export const registerAdmin = async (req, res) => {
  req.body.role = 'admin';
  return register(req, res);
};

/**
 * Login Admin User
 */
export const loginAdmin = async (req, res) => {
  req.body.expectedRole = 'admin';
  return login(req, res);
};

/**
 * Register Customer / Customer Support User
 */
export const registerCustomer = async (req, res) => {
  req.body.role = 'customer';
  return register(req, res);
};

/**
 * Login Customer / Customer Support User
 */
export const loginCustomer = async (req, res) => {
  req.body.expectedRole = 'customer';
  return login(req, res);
};

/**
 * Register a new user (defaults to 'customer' role)
 */
export const register = async (req, res) => {
  const { username, password, email, role, customerName } = req.body;

  if (!username || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Username and password are required' 
    });
  }

  try {
    // Check if user already exists
    const conditions = [];
    conditions.push(eq(users.username, username));
    if (email) {
      conditions.push(eq(users.email, email));
    }

    const existingUsers = await db.select().from(users).where(
      conditions.length > 1 ? or(...conditions) : conditions[0]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username or email already exists' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Default registration role is 'customer' unless explicitly set to 'admin'
    const userRole = role || 'customer';

    const newUser = {
      username,
      password: hashedPassword,
      email: email || null,
      role: userRole,
      customerName: customerName || null
    };

    await db.insert(users).values(newUser);

    const [createdUser] = await db.select().from(users).where(eq(users.username, username));

    // Sign JWT
    const token = jwt.sign(
      { 
        id: createdUser.id, 
        username: createdUser.username, 
        role: createdUser.role,
        customerName: createdUser.customerName 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(201).json({
      success: true,
      message: `${createdUser.role === 'admin' ? 'Admin' : 'Customer Support'} registered successfully`,
      data: {
        token,
        user: {
          id: createdUser.id,
          username: createdUser.username,
          email: createdUser.email,
          role: createdUser.role,
          customerName: createdUser.customerName
        }
      }
    });

  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: 'Registration failed', 
      error: error.message 
    });
  }
};

/**
 * Log in an existing user
 */
export const login = async (req, res) => {
  const { username, password, expectedRole } = req.body;

  if (!username || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Username and password are required' 
    });
  }

  try {
    const [user] = await db.select().from(users).where(
      or(
        eq(users.username, username),
        eq(users.email, username)
      )
    );

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }

    // Check role if explicitly specified for login portal
    if (expectedRole && user.role !== expectedRole) {
      return res.status(403).json({ 
        success: false, 
        message: `Account is registered as ${user.role}. Please use the ${user.role === 'admin' ? 'Admin' : 'Customer Support'} portal.` 
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }

    // Sign JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username, 
        role: user.role,
        customerName: user.customerName 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          customerName: user.customerName
        }
      }
    });

  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: 'Login failed', 
      error: error.message 
    });
  }
};

/**
 * Fetch authenticated user profile
 */
export const me = async (req, res) => {
  try {
    const [user] = await db.select().from(users).where(eq(users.id, req.user.id));

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        customerName: user.customerName
      }
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve profile', 
      error: error.message 
    });
  }
};

