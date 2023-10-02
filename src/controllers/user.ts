import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import jwt from "jsonwebtoken";

export const newUser = async (req: Request, res: Response) => {
  //Destructuring (javascript) pour avoir les donnees.
  const { name, email, password } = req.body;

  // Vérifier si l'email existe déjà dans la base de données.
  const useremail = await User.findOne({ where: { email: email } });

  if (useremail) {
    return res.status(400).json({
      msg: `Ce courriel ${email} est déjà enregistré `,
    });
  }

  //Encryptation  password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Sauvegarder l'utilisateur dans la base de données
    await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    res.json({
      msg: `Utilisateur ${email} enregistré correctement.`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Une erreur est survenue",
      error,
    });
  }
};

//function async
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  //validation user exist dans la bd?
  const useremail: any = await User.findOne({ where: { email: email } });

  if (!useremail) {
    return res.status(400).json({
      msg: `l'utilisateur avec l'email ${email} n'existe pas`,
    });
  }

  //validation password
  const passwordValid = await bcrypt.compare(password, useremail.password);
  if (!passwordValid) {
    return res.status(400).json({
      msg: `Password pas correct`,
    });
  }

  //generation token

  const token = jwt.sign(
    {
      email: email,
    },
    process.env.SECRET_KEY || "pepito123"
  );
  res.json(token);
};

//const pour afficher la list d'utilisateurs
export const getUsers = async (req: Request, res: Response) => {
  const listUsers = await User.findAll();

  res.json(listUsers);
};

//Retourner un seule utilisateur
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      msg: `Utilisateur avec id ${id} non trouve`,
    });
  }
};

//Delete utilisateur
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await User.destroy({ where: { id: id } });
    if (response) {
      res.json({
        msg: `User ${id} supprimé.`,
      });
    } else {
      res.json({
        msg: `User non trouvé.`,
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "Une erreur est survenue.",
      error,
    });
  }
};

//Update utilisateur
export const updateUser = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.update(body);
      res.json({
        msg: "Utilisateur mis à jour",
      });
    } else {
      res.status(404).json({
        msg: `Utilisateur avec id ${id} non trouve`,
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "Une erreur est survenue.",
    });
  }
};

////////////////////////////////////////////////////////////////
//Check si tout va bien
//console.log(req.body);

// console.log(name, lastname);
// console.log(password);

//console.log(hashedPassword);
