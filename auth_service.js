
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to the Streak API!');
});


// A "Real-World" Backend Problem: Secure Token Generation
const generateToken = (user) => {
    // ⚠️ Security Tip: In production, never hardcode secrets. 
    // This is here so your 'Gatekeeper' can flag it if you add a secret-scanner later!
    const SECRET = process.env.SECRET;
    
    const payload = {
        id: user.id,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour expiry
    };

    return jwt.sign(payload, SECRET);
};

// 🛡️ A robust error handler (The "Real Engineering" part)
const verifyRequest = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: "Failed to authenticate token" });
    }
};

module.exports = { generateToken, verifyRequest };
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});