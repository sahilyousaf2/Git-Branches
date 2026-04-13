const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory user storage (use a database in production)
const users = [];

// Signup endpoint
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(409).json({ message: 'Email already registered' });
    }

    // Create new user
    const newUser = {
        id: users.length + 1,
        username,
        email,
        password // In production, hash the password!
    };

    users.push(newUser);

    res.status(201).json({ message: 'Signup successful', user: { username, email } });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});