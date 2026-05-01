const jwt = require('jsonwebtoken');

// Use environment variables - Senior Move 
const SECRET = process.env.JWT_SECRET || 'fallback_for_local_dev_only'; 

const generateToken = (user) => {
    const payload = {
        id: user.id,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
    };
    return jwt.sign(payload, SECRET);
};

module.exports = { generateToken };