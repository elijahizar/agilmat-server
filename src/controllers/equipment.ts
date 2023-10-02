import { Request, Response } from "express";
import Client from "../models/client";
import Model from "../models/model";
import Device from "../models/device";
import { literal } from "sequelize";

export const newDevice = async (req: Request, res: Response) => {
  //Destructuring (javascript) pour avoir le nom et password
  const { model_id, serial_number, unit_id } = req.body;
  if (!req.body) {
    res.status(400).json({
      msg: "No request parameters received.",
    });
  }

  try {
    // Sauvegarder l'utilisateur dans la base de données
    await Device.create({
      serial_number: serial_number,
      model_id: model_id,
      unit_id: unit_id,
    });

    res.json({
      msg: `Matériel enregistré correctement.`,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Une erreur est survenue",
      error,
    });
    console.log(error);
  }
};

export const getDevices = async (req: Request, res: Response) => {
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

  const { rows, count } = await Device.findAndCountAll({
    attributes: [
      "id",
      "serial_number",
      [
        literal(
          "(SELECT model.name as model FROM model WHERE model.id = device.model_id)"
        ),
        "model",
      ],
      [
        literal(
          "(SELECT client.name as client FROM client WHERE client.id = device.unit_id)"
        ),
        "unit",
      ],
    ],
    limit: limitNumber,
    offset,
    subQuery: false,
  });

  const totalPages = Math.ceil(count / limitNumber);

  res.json({
    devices: rows,
    page: pageNumber,
    limit: limitNumber,
    totalCount: count,
    totalPages: totalPages,
  });
};

export const getDeviceById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const device = await Device.findByPk(id, {
      attributes: [
        "id",
        "serial_number",
        "name",
        ["model_id", "model"],
        ["uni_itd", "unit"],
      ],
      subQuery: false,
    });
    if (device === null) {
      res.json({
        msg: `Device not found`,
      });
    } else {
      res.json(device);
      console.log(device);
    }
  } catch (error) {
    res.status(400).json({
      msg: "Une erreur est survenue.",
      error,
    });
  }
};

export const deleteDeviceById = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const response = await Device.destroy({ where: { id: id } });
    if (response) {
      res.json({
        msg: `Device ${id} supprimé.`,
      });
    } else {
      res.json({
        msg: `Device not found.`,
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "Une erreur est survenue.",
      error,
    });
  }
};

export const updateDeviceById = async (req: Request, res: Response) => {
  //Destructuring (javascript) pour avoir le nom et password
  const { id, model_id, serial_number, unit_id } = req.body;
  if (!req.body) {
    res.status(400).json({
      msg: "No request parameters received.",
    });
  }

  try {
    // Sauvegarder l'utilisateur dans la base de données
    await Device.update(
      {
        serial_number: serial_number,
        model_id: model_id,
        unit_id: unit_id,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({
      msg: `Device actualisé correctement.`,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Une erreur est survenue",
      error,
    });
  }
};
