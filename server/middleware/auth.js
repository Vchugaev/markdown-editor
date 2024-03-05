const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: "Please login to access the data" });
        }
        const verify = await jwt.verify(token, process.env.SECRET_KEY);
        req.user = await userModel.findById(verify.id);
        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports = isAuthenticated;