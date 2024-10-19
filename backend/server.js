const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');

// App config
const app = express();
app.use(express.json());
app.use(cors());
const JWT_SECRET = 'your_secret_key';
const PORT = 5000;
// User Schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const User = mongoose.model('User', UserSchema);

// Connect to MongoDB
mongoose.connect('mongodb+srv://helovirendra40:UVsu2eMcJjDosJAP@cluster0.v0pbc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// Register route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = await User.create({ username, password: hashedPassword });
        res.status(201).json({ message: 'User Registered' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
});

// Dashboard route (protected)
app.get('/dashboard', async (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);

        res.status(200).json({ message: `Welcome to Dashboard, ${user.username}!` });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
});


// Start server
app.listen(PORT, () => {
    console.log('Server running on port 5000');
});
