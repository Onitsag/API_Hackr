const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { id: decoded.userId } });

        if (!user) {
            return res.status(401).json({ msg: 'Token is not valid' });
        }

        // Attacher l'utilisateur récupéré à la requête
        req.user = {
            userId: user.id,
            username: user.username,
            role: user.role
        };

        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = auth;
