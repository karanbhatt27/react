const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection helper (skippable in CI)
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/react-test';
async function connectDB() {
  if (process.env.SKIP_DB === '1' || process.env.SKIP_DB === 'true') {
    console.log('⚠️  Skipping MongoDB connection (SKIP_DB set)');
    return;
  }

  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.log('❌ MongoDB connection error:', err);
  }
}

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// User Model
const User = mongoose.model('User', userSchema);

// POST /api/users - Add a new user
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Validate input
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create new user
    const newUser = new User({ name, email, age });
    await newUser.save();

    res.status(201).json({
      message: '✅ User created successfully',
      user: newUser,
    });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user', details: err.message });
  }
});

// GET /api/users - Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users', details: err.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Export app so CI/tests can import without starting the listener
module.exports = { app, connectDB };

// If run directly, connect DB and start the listener
if (require.main === module) {
  (async () => {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })();
}
