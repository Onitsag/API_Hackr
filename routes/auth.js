const express = require('express');
const { register, login } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();
const roleCheck = require('../middleware/roleMiddleware');
const Permission = require('../models/Permission');
const User = require('../models/User');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 example: user
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Utilisateur inscrit avec succès
 *       400:
 *         description: L'utilisateur existe déjà
 *       500:
 *         description: Erreur serveur
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Identifiants invalides
 *       500:
 *         description: Erreur serveur
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/protected:
 *   get:
 *     summary: Route protégée accessible uniquement aux utilisateurs authentifiés
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Bienvenue à l'utilisateur authentifié
 *       401:
 *         description: Non autorisé
 */
router.get('/protected', auth, (req, res) => {
    res.json({ msg: `Welcome ${req.user.username}` });
});

/**
 * @swagger
 * /api/auth/admin:
 *   get:
 *     summary: Contenu réservé aux administrateurs
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contenu pour les administrateurs
 *       403:
 *         description: Accès refusé
 *       401:
 *         description: Non autorisé
 */
router.get('/admin', auth, roleCheck(['admin']), (req, res) => {
    res.json({ msg: 'Admin content' });
});

/**
 * @swagger
 * /api/auth/update-permissions/{userId}:
 *   put:
 *     summary: Mettre à jour les permissions d'un utilisateur (depuis un compte admin uniquement)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Permissions mises à jour avec succès
 *       400:
 *         description: Format des permissions invalide
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
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