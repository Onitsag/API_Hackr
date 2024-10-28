const Permission = require('../models/Permission');

const permissionCheck = (requiredPermission) => async (req, res, next) => {
  try {
    const userId = req.user.userId;

    // Vérifier si l'utilisateur a la permission requise
    const permission = await Permission.findOne({ where: { userId, permission: requiredPermission } });

    if (!permission) {
      return res.status(403).json({ msg: 'Access denied. Permission required.' });
    }

    next();
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = permissionCheck;
