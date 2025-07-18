const Admin = require('../models/Admin')
const User = require('../models/User')

exports.getAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll({
            include: [{
                model: User,
                as: 'User',
                attributes: ['nom', 'prenom', 'email', 'telephone', 'domaine', 'photo']
            }],
            attributes: ['id']
        });
        res.json(admins);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch admins' + error });
    }
}

exports.addAdmin = async (req, res) => {
    try {
        const admin = await Admin.create(req.body);
        res.status(201).json(admin);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create admin' });
    }
}