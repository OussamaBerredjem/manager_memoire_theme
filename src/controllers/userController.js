const User = require('../models/User');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const Candidature = require('../models/Candidature');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { motDePasse,typeUtilisateur,email } = req.body;

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(motDePasse, 10); // 10 is the saltRounds

    // Create the user with the hashed password
    const user = await User.create({
      email:email, // spread the other user data
      motDePasse: hashedPassword ,// save the hashed password
      typeUtilisateur:typeUtilisateur
    });
   
    res.status(201).json(user); // Respond with the created user
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user may be email exist'});
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id); // Find user by ID
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user); // Respond with the user
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Complete the user profile
exports.completeProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id); // Find user by ID

    if (!user) return res.status(404).json({ error: 'User not found' });

    // Update the user's profile with the provided details
    await user.update(req.body);

    res.status(200).json({ message: 'Profile completed successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to complete profile' + error });
  }
};

// Update the user profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id); // Find user by ID

    if (!user) return res.status(404).json({ error: 'User not found' });

    // Update the user's profile with the new information
    await user.update(req.body);

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' + error });
  }
};

exports.userList = async (req,res)=>{
  try {
    const {typeUtilisateur} = req.body;
    const users = await User.findAll({where:{typeUtilisateur}});
    res.status(200).json(users)
    } catch (error) {
    res.send(500).json({"error":error})
  }
 
}

exports.otherUserList = async (req,res)=>{
  try {
    const {id} = req.body;
    const users = await User.findAll({where:{
      id:{
        [Op.ne]:id
      },
      typeUtilisateur:{
        [Op.ne]:"Enseignant"
      }
  }});
    res.status(200).json(users)
    } catch (error) {
    res.status(500).json({"error":error.message})
  }
}

exports.etudiantListWithProjet = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { typeUtilisateur: "Etudiant" },
    });

    const usersWithProjetStatus = await Promise.all(users.map(async (user) => {
      const isInscrit = await Candidature.findOne({
        where: {
          etudiantId: user.id,
          statut: 'acceptee'
        }
      });


      return {
        ...user.toJSON(),
        isInscrit: !!isInscrit
      };
    }));

    res.status(200).json(usersWithProjetStatus);
  } catch (error) {
    res.status(500).json({ "error": error.message });
  }
}

exports.removeUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    user.destroy();
    res.status(200).json({
      message: "user delete successfully",
      user: user
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
}