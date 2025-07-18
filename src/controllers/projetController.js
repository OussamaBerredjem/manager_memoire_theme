// src/controllers/projetController.js
const Candidature = require('../models/Candidature');
const Projet = require('../models/Projet');
const User = require('../models/User');

const  Rules = require('../models/Rules'); // Import Projet and Rules models


exports.createProjet = async (req, res) => {
    try {
        const { enseignantId } = req.body; // Get enseignantId from the request body

        // Step 1: Fetch the rules from the Rules table
        const rules = await Rules.findOne();
        if (!rules) {
            return res.status(500).json({ error: 'Rules not found' });
        }
        const maxProjects = rules.max_projects;
        const applicationDeadline = rules.project_proposal_deadline;

        // Step 2: Check if the application deadline has passed
        const currentDate = new Date();
        if (applicationDeadline&&applicationDeadline && currentDate > new Date(applicationDeadline)) {
            return res.status(400).json({ error: 'The application deadline has passed' });
        }

        // Step 3: Count the number of projects associated with the enseignant
        const projectCount = await Projet.count({
            where: { enseignantId }
        });

        // Step 4: Check if the enseignant has reached the project limit
        if (projectCount >= maxProjects && maxProjects !== 0) {
            return res.status(400).json({ error: `Enseignant has reached the maximum limit of ${maxProjects} projects` });
        }

        // Step 5: Create the new project if the limit is not exceeded
        const projet = await Projet.create(req.body);
        res.status(201).json(projet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create project' });
    }
};

exports.getAllProjets = async (req, res) => {
  try {
    const projets = await Projet.findAll({where:{
      statut:"disponible"
    },
      include:[{model:User,as:"Enseignant"}]
    });
    res.json(projets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' +error});
  }
};

exports.getProjetById = async (req, res) => {
  try {
    const projet = await Projet.findByPk(req.params.id,{
      include:[{model:User,as:"Enseignant"}]
    });
    if (!projet) return res.status(404).json({ error: 'Project not found' });
    res.json(projet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

exports.updateProjet = async (req,res)=>{
  try {
    const projetId = req.params.id;
    const projet = await Projet.findByPk(req.params.id);
    projet.update(req.body);
    res.status(201).json({
      message:"projet update successfully",
      projet:req.body
    })
  } catch (error) {
    return res.status(500)
  }
}

exports.deleteProjet = async (req,res)=>{ 
  try {
    const projet = await Projet.findByPk(req.params.id);
    projet.destroy();
    res.status(200).json({
      message:"projet delete successfully",
      projet:projet
    })
  } catch (error) {
    return res.status(500)
  }
}

exports.getProjectDisponnible = async (req,res)=>{
  try {
    const projets = await Projet.findAll({where:{
      statut:"disponible"
    },include:[{model:User,as:"Enseignant"}]});
    return res.status(200).json(projets);
  } catch (error) {
    return res.status(500)
  }
}



