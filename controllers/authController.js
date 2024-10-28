const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Log = require('../models/Log');
const Permission = require('../models/Permission'); // Importer le modèle Permission

const register = async (req, res) => {
    const { username, password, role, permissions } = req.body; // Ajouter les permissions

    try {
        let user = await User.findOne({ where: { username } });
        if (user) {
            await Log.create({
                action: `User Registration Failed for username: ${username} (User already exists)`,
                userId: null,
            });
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({
            username,
            password: hashedPassword,
            role,
        });

        // Ajouter les permissions
        if (role !== 'admin' && permissions && Array.isArray(permissions)) {
            for (const permission of permissions) {
                await Permission.create({
                    userId: user.id,
                    permission
                });
            }
        }

        // Ajouter un log
        await Log.create({
            userId: user.id,
            action: `User Registered: ${username} (Role: ${role})`,
        });

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        // Ajouter un log en cas d'erreur
        await Log.create({
            action: `User Registration Failed for username: ${username} (${error.message})`,
            userId: null, // Pas d'userId car l'utilisateur n'a pas été créé
        });

        res.status(500).json({ msg: 'Server error' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ where: { username } });
        if (!user) {
            await Log.create({
                action: `User Login Failed for username: ${username} (User not found)`,
                userId: null,
            });
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            await Log.create({
                action: `User Login Failed for username: ${username} (Incorrect password)`,
                userId: user.id,
            });
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Créer un token JWT
        const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        user.token = token;
        await user.save();

        // Ajouter un log
        await Log.create({
            userId: user.id,
            action: `User Logged In: ${username}`,
        });

        res.json({ token });
    } catch (error) {
        // Ajouter un log en cas d'erreur
        await Log.create({
            action: `User Login Failed for username: ${username} (${error.message})`,
            userId: null, // Pas d'userId si l'erreur empêche l'authentification
        });

        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = { register, login };