import { Request, Response } from "express";
import Client from "../models/client";
import User from "../models/user";
import ServiceType from "../models/service_type";

/* export const newServiceType = async (req: Request, res: Response) => {
  //Destructuring (javascript) pour avoir le nom et password
  const { title, description, priority, assigned_to, equipment } = req.body;
  if (!req.body) {
    res.status(400).json({
      msg: "No request parameters received.",
    });
  }

  try {
    // Sauvegarder l'utilisateur dans la base de données
    await ServiceType.create({
      title: title,
      description: description,
      priority: priority,
      id_1: equipment,
      id_2: assigned_to,
    });

    res.json({
      msg: `Service enregistré correctement.`,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Une erreur est survenue",
      error,
    });
  }
}; */

export const getServiceTypes = async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 50,
    sortBy = "name",
    sortOrder = "ASC",
    search = "",
  } = req.query;

  const offset = (Number(page) - 1) * Number(limit);

  const limitNumber: number = Number(limit);
  const pageNumber: number = Number(page);

  const { rows, count } = await ServiceType.findAndCountAll({
    attributes: ["id", "name"],
    limit: limitNumber,
    offset,
  });

  const totalPages = Math.ceil(count / limitNumber);

  res.json({
    ServiceTypes: rows,
  });
};
/* 
export const getServiceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("id", id);

  try {
    const Service = await Service.findByPk(id);
    if (Service === null) {
      res.json({
        msg: `Service not found`,
      });
    } else {
      res.json(Service);
    }
  } catch (error) {
    res.status(400).json({
      msg: "Une erreur est survenue.",
      error,
    });
  }
};

export const deleteServiceById = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const response = await Service.destroy({ where: { id: id } });
    if (response) {
      res.json({
        msg: `Service ${id} supprimé.`,
      });
    } else {
      res.json({
        msg: `Service not found.`,
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "Une erreur est survenue.",
      error,
    });
  }
};

export const updateServiceById = async (req: Request, res: Response) => {
  //Destructuring (javascript) pour avoir le nom et password
  const { id, title, description, priority, assigned_to, equipment } = req.body;
  if (!req.body) {
    res.status(400).json({
      msg: "No request parameters received.",
    });
  }

  try {
    // Sauvegarder l'utilisateur dans la base de données
    await Service.update(
      {
        title: title,
        description: description,
        priority: priority,
        id_1: equipment,
        id_2: assigned_to,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({
      msg: `Service actualisé correctement.`,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Une erreur est survenue",
      error,
    });
  }
}; */
