import { Request, Response } from "express";
import { TableQuery } from "../interfaces/TableQuery";
import { Service } from "../models/service";
import { User } from "../models/user";
import { Op, literal } from "sequelize";
import sequelize from "../db/connection";

export const newService = async (req: Request, res: Response) => {
  console.log(req.body);
  //Destructuring (javascript) pour avoir le nom et password
  const { title, description, priority, assignedTo, equipment } = req.body;
  if (!req.body) {
    res.status(400).json({
      msg: "No request parameters received.",
    });
  }

  try {
    // Sauvegarder l'utilisateur dans la base de données
    await Service.create({
      title: title,
      description: description,
      priority: priority,
      equipment: parseInt(equipment),
      assignedTo: parseInt(assignedTo),
    });

    console.log("newService", req.body);
    res.json({
      msg: `Service enregistré correctement.`,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      msg: "Une erreur est survenue",
      error,
    });
  }
};

export const getServices = async (
  req: Request<any, any, any, TableQuery>,
  res: Response
) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "id",
    sortOrder = "ASC",
    search = "",
  } = req.query;

  const offset = (Number(page) - 1) * Number(limit);

  const limitNumber: number = Number(limit);
  const pageNumber: number = Number(page);

  const filter: any = {
    attributes: [
      "id",
      "title",
      "description",
      "priority",
      "created_at",
      "updated_at",
      "equipment",
      [literal(`user_account.first_name`), "assignedTo"],
    ],
    include: [
      {
        model: User,
        attributes: ["first_name"],
      },
    ],
    order: [[sortBy, sortOrder]],
    limit: limitNumber,
    offset,
  };

  if (search) {
    filter.where = {
      [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { id: { [Op.like]: `%${search}%` } },
      ],
    };
  }

  const { rows, count } = await Service.findAndCountAll(filter);

  const totalPages = Math.ceil(count / limitNumber);

  res.json({
    Services: rows,
    page: pageNumber,
    limit: limitNumber,
    totalCount: count,
    totalPages: totalPages,
  });
};

export const getServiceById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const service = await Service.findByPk(+id);
    if (service === null) {
      res.json({
        msg: `Service not found`,
      });
    } else {
      res.json(service);
    }
  } catch (error) {
    res.status(400).json({
      msg: "Une erreur est survenue.",
      error,
    });
  }
};

export const deleteServiceById = async (req: Request, res: Response) => {
  console.log(req.params);
  const { id } = req.params;

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
  const { id, title, description, priority, assigned_to, equipment, status } =
    req.body;
  console.log("updateServicebyId", req.body);
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
        status: status,
        assigned_to: assigned_to,
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
};
