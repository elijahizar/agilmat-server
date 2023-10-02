import { Request, Response } from "express";
import Client from "../models/client";

export const getClients = async (req: Request, res: Response) => {
  const listClients = await Client.findAll();

  res.json(listClients);
};

export const newClient = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await Client.create(body);

    res.json({
      msg: `Le client a été ajouté avec succès`,
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: `Une erreur est survenue`,
    });
  }
};

//Retourner un seule utilisateur
export const getClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const client = await Client.findByPk(id);

  if (client) {
    res.json(client);
  } else {
    res.status(404).json({
      msg: `Client avec id ${id} non trouve`,
    });
  }
};

//Delete utilisateur
export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await Client.destroy({ where: { id: id } });
    if (response) {
      res.json({
        msg: `Client ${id} supprimé.`,
      });
    } else {
      res.json({
        msg: `Client non trouvé.`,
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
export const updateClient = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const client = await Client.findByPk(id);
    if (client) {
      await client.update(body);
      res.json({
        msg: "Client mis à jour",
      });
    } else {
      res.status(404).json({
        msg: `Client avec id ${id} non trouve`,
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "Une erreur est survenue.",
    });
  }
};
