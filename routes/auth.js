const express = require('express');
const { register, login } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Route pour l'inscription
router.post('/register', register);

// Route pour la connexion
router.post('/login', login);

// Route protégée (exemple)
router.get('/protected', auth, (req, res) => {
    res.json({ msg: `Welcome ${req.user.username}` });
});

const roleCheck = require('../middleware/roleMiddleware');

// Route protégée accessible uniquement par les administrateurs
router.get('/admin', auth, roleCheck(['admin']), (req, res) => {
    res.json({ msg: 'Admin content' });
});

module.exports = router;