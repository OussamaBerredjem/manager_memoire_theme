const { where } = require('sequelize');
const Member = require('../models/Member');
const Projet = require('../models/Projet');
const User = require('../models/User');
const Groupe = require('../models/Groupe');

const Rules  = require('../models/Rules'); // Import Member and Rules models

exports.createMember = async (req, res) => {
    try {
        const { groupeId } = req.body; // Get groupeId from the request body

        // Step 1: Fetch the max_groupe_size limit from the Rules table
        const rules = await Rules.findOne();
        if (!rules) {
            return res.status(500).json({ error: 'Rules not found' });
        }
        const maxGroupeSize = rules.max_groupe_size;

        // Step 2: Count the number of members in the groupe
        const memberCount = await Member.count({
            where: { groupeId }
        });

        // Step 3: Check if the groupe has reached the maximum size
        if (memberCount >= maxGroupeSize && maxGroupeSize !== 0) {
            return res.status(400).json({ error: `Groupe has reached the maximum size of ${maxGroupeSize} members` });
        }

        // Step 4: Create the new member if the limit is not exceeded
        const member = await Member.create(req.body);
        res.status(201).json(member);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create member' });
    }
};

exports.getGroupeMembers = async (req, res) => {
  try {
    const members = await Member.findAll({where: {groupeId: req.params.id,statu:'accepter'},include:[{model:User,as:"Etudiant"}]});
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch members' + error });
  }
};

exports.updateMember = async (req,res)=>{    
  try {
    const member = await Member.findByPk(req.params.id);
    member.update(req.body);
    res.status(201).json({
      message:"member update successfully",
      member:req.body
    })
  } catch (error) {
    return res.status(500)
  }
}

exports.deleteMember = async (req,res)=>{ 
  try {
    const member = await Member.findByPk(req.params.id);
    member.destroy();
    res.status(200).json({
      message:"member delete successfully",
      member:member
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete member' });
  }
}



exports.getRequestMembers = async (req, res) => {
    try {
        const members = await Member.findAll({where: {etudiantId: req.params.id, statu: 'attente'},include:[{model:User,as:"Etudiant"},{model:Groupe,as:"Groupe",include:[{model:Projet,as:"Projet"}]}]});
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch members' + error });
    }
}