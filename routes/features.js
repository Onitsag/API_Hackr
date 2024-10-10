const express = require('express');
const auth = require('../middleware/authMiddleware');
const permissionCheck = require('../middleware/permissionMiddleware');
const router = express.Router();
const crypto = require('crypto'); // Utilisé pour générer des mots de passe sécurisés

// Route pour générer un mot de passe sécurisé (nécessite la permission "generate_password" ou être admin)
router.get('/generate-password', auth, (req, res, next) => {
    if (req.user.role === 'admin') {
        return next();
    }
    return permissionCheck('generate_password')(req, res, next);
}, (req, res) => {
    const password = crypto.randomBytes(12).toString('hex'); // Générer un mot de passe de 12 caractères
    res.json({ password });
});

module.exports = router;