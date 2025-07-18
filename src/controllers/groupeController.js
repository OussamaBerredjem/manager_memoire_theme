const Groupe = require('../models/Groupe');
const Member = require('../models/Member');
const Projet = require('../models/Projet');

exports.getAllGroupes = async (req, res) => {
    try {
        const groupes = await Groupe.findAll();
        res.json(groupes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch groupes' + error });
    }
}

exports.getGroupeById = async (req, res) => {
    try {
        const groupe = await Groupe.findByPk(req.params.id);
        if (!groupe) return res.status(404).json({ error: 'Groupe not found' });
        res.json(groupe);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch groupe' });
    }
}

exports.updateGroupe = async (req, res) => {
    try {
        const groupeId = req.params.id;
        const groupe = await Groupe.findByPk(req.params.id);
        groupe.update(req.body);
        res.status(201).json({
            message: "groupe update successfully",
            groupe: req.body
        })
    } catch (error) {
        return res.status(500)
    }
}

exports.deleteGroupe = async (req, res) => {
    try {
        const groupe = await Groupe.findByPk(req.params.id);
        groupe.destroy();
        res.status(200).json({
            message: "groupe delete successfully",
            groupe: groupe
        })
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete groupe' });
    }
}

exports.createGroupe = async (req, res) => {
    try {
        const groupe = await Groupe.create(req.body);
        res.status(201).json(groupe);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create groupe' });
    }
}

exports.getJoinedGroupeByUserId = async (req, res) => {
    try {
        const members = await Member.findAll({
            where: {
                etudiantId: req.params.id,
                statu: 'accepter' // Filter by status "accepter"
            },
            include: [
                {
                    model: Groupe,
                    as: 'Groupe',
                    include: [
                        {
                            model: Projet,
                            as: 'Projet' // Include the associated project
                        }
                    ]
                }
            ]
        });

        if (!members || members.length === 0) {
            return res.status(200).json([]);
        }

        // Extract relevant information
        const result = members.map(member => ({
            groupeId: member.Groupe.id,
            groupeNom: member.Groupe.nom,
            groupeType: member.Groupe.type,
            projetId: member.Groupe.Projet.id,
            projetNom: member.Groupe.Projet.nom, // Assuming Projet has a 'nom' field
            statu: member.statu
        }));

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch joined groups' });
    }
};
