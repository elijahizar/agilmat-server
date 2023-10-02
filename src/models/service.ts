import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connection";
import ModelModel from "./model";
import ServiceType from "./service_type";

// These are the attributes of the model
interface ServiceAttributes {
  id: number;
  service_date: Date | null;
  description: string | null;
  cost: number | null;
  service_type_id: number | null;
  device_id: number | null;
  created_at: Date;
  updated_at: Date;
}

// These are the attributes that can be set during instance creation
interface ServiceCreationAttributes extends Optional<ServiceAttributes, "id"> {}

class Service
  extends Model<ServiceAttributes, ServiceCreationAttributes>
  implements ServiceAttributes
{
  public id!: number;
  public service_date!: Date | null;
  public description!: string | null;
  public cost!: number | null;
  public service_type_id!: number | null;
  public device_id!: number | null;
  public created_at!: Date;
  public updated_at!: Date;

  // Define associations
  public readonly model?: ModelModel;
  public readonly service_type?: ServiceType;
}

Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    service_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    service_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "service_type",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    device_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "device",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "service",
    timestamps: false,
  }
);

export default Service;
