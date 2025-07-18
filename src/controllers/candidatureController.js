const Candidature = require('../models/Candidature');
const Projet = require('../models/Projet');
const Etudiant = require('../models/User');

const  Rules  = require('../models/Rules'); // Import required models

exports.createCandidature = async (req, res) => {
  try {
    const { projetId, etudiantId } = req.body;

    // Step 1: Fetch the rules from the Rules table
    const rules = await Rules.findOne();
    if (!rules) {
      return res.status(500).json({ error: 'Rules not found' });
    }
    const maxCandidatures = rules.max_candidateur_send;
    const proposalDeadline = rules.application_deadline;

    // Step 2: Check if the proposal deadline has passed  wink samo
    const currentDate = new Date();
    if (proposalDeadline && currentDate > new Date(proposalDeadline)) {
      return res.status(400).json({ error: 'The proposal deadline has passed' });
    }

    // Step 3: Count the number of candidatures sent by the user
    const candidatureCount = await Candidature.count({
      where: { etudiantId: etudiantId }
    });

    // Step 4: Check if the user has reached the maximum candidature limit
    if (candidatureCount >= maxCandidatures && maxCandidatures !== 0) {
      return res.status(400).json({ error: `User has reached the maximum limit of ${maxCandidatures} candidatures` });
    }

    // Step 5: Check if the project exists
    const projet = await Projet.findByPk(projetId);
    if (!projet) return res.status(404).json({ error: 'Project not found' });

    // Step 6: Check if the student exists (the one who is being added)
    const etudiant = await Etudiant.findByPk(etudiantId);
    if (!etudiant) return res.status(404).json({ error: 'Student to be added not found' });

    // Step 7: Check if the user (sender) is a teacher
    const currentUser = await Etudiant.findByPk(etudiantId);
    if (currentUser.typeUtilisateur === 'Enseignant') {
      return res.status(403).json({ error: 'Teachers cannot add project members' });
    }

    // Step 8: Check if the student (the one being added) is already in the project
    const existingCandidature = await Candidature.findOne({
      where: { projetId: projetId, etudiantId: etudiantId }
    });

    if (existingCandidature) {
      return res.status(400).json({ error: 'Student is already part of this project' });
    }

    // Step 9: Create a new candidature for the other student
    const candidature = await Candidature.create({
      projetId: projetId,
      etudiantId: etudiantId,
      statut: 'en attente', // Status for the other student is 'en attente'
    });

    // Step 10: Respond with the created candidature
    res.status(201).json(candidature);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create candidature' });
  }
};


exports.getCandidatureProjet = async (req,res)=>{

  try {
    const{projetId} = req.body;
  
    const candidatures = await Candidature.findAll({where:{
      projetId:projetId
    },include:[{
      model:Projet,
      as:'Projet',
    },{
      model:Etudiant,
      as:'Etudiant',
    },
  ]});

    return res.status(200).json(candidatures);

  } catch (error) {
    return res.send(404).json({error:`${error}`});

  }



}
exports.projetMembre = async (req, res) => {
  try {
    const { projetId } = req.body;

    const candidatures = await Candidature.findAll({
      where: { projetId },
      include: [
        { 
          model: Etudiant, 
          as: 'Etudiant', 
          attributes: ['nom', 'prenom', 'email', 'telephone', 'domaine', 'photo'],
          foreignKey: 'etudiantId' 
        },
        
      ]
    });

    if (candidatures.length === 0) {
      return res.status(404).json({ message: 'No candidatures found for this project.' });
    }

    res.status(200).json(candidatures);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project members', details: error.message });
  }
};

exports.updateCandidature = async (req,res)=>{
  try {
    const candidateur = await Candidature.findByPk(req.params.id);
    if (candidateur) {
      candidateur.update(req.body);
      res.status(201).json({
        "message":'update status successfully',
        "update":req.body
      });
    }else{
      res.status(500).json({ error: 'candidateur not found', details: error.message });

    }
   

  } catch (error) {
    res.status(500).json({ error: 'Failed to update candidateur status', details: error.message });

  }
}

exports.getCandidatureEnvoyer = async (req,res)=>{
  try {
    const { etudiantId } = req.body;
    const candidatures = await Candidature.findAll({where:{
      etudiantId:etudiantId
    },include:[{
      model:Projet,
      as:'Projet',
    },{
      model:Etudiant,
      as:'Etudiant',
      attributes:['nom','prenom','email','telephone','domaine','photo']
    }]});
    return res.status(200).json(candidatures);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch candidature', details: error.message });
  }
}

exports.deleteCandidature = async (req,res)=>{
  try {
    const candidature = await Candidature.findByPk(req.params.id);
    if (candidature) {
      candidature.destroy();
      res.status(200).json({
        "message":'delete candidature successfully',
        "candidature":candidature
      });
    }else{
      res.status(500).json({ error: 'candidature not found', details: error.message });

    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete candidature', details: error});
  }
}