const express = require('express');
const { register, login } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');
const permissionCheck = require('../middleware/permissionMiddleware');
const router = express.Router();
const roleCheck = require('../middleware/roleMiddleware');
const Permission = require('../models/Permission');
const User = require('../models/User');

// Route pour l'inscription
router.post('/register', register);

// Route pour la connexion
router.post('/login', login);

// Route protégée (exemple)
router.get('/protected', auth, (req, res) => {
    res.json({ msg: `Welcome ${req.user.username}` });
});

// Route protégée accessible uniquement par les administrateurs
router.get('/admin', auth, roleCheck(['admin']), (req, res) => {
    res.json({ msg: 'Admin content' });
});

// Route pour mettre à jour les permissions d'un utilisateur (accessible uniquement par les administrateurs)
router.put('/update-permissions/:userId', auth, roleCheck(['admin']), async (req, res) => {
    const { userId } = req.params;
    const { permissions } = req.body;

    if (!permissions || !Array.isArray(permissions)) {
        return res.status(400).json({ msg: 'Invalid permissions format. It should be an array of permissions.' });
    }

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found.' });
        }

        // Supprimer les anciennes permissions
        await Permission.destroy({ where: { userId: user.id } });

        // Ajouter les nouvelles permissions
        for (const permission of permissions) {
            await Permission.create({ userId: user.id, permission });
        }

        res.status(200).json({ msg: 'Permissions updated successfully.' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

module.exports = router;