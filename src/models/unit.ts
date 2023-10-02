import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connection";
import Client from "./client";
import User from "./user";
import ModelModel from "./model";

// These are the attributes of the model
interface UnitAttributes {
  id: number;
  unit_name: string;
  location: string | null;
  status: string | null;
  client_id: number | null;
  user_id: number | null;
  created_at: Date;
  updated_at: Date;
}

// These are the attributes that can be set during instance creation
interface UnitCreationAttributes extends Optional<UnitAttributes, "id"> {}

class Unit
  extends Model<UnitAttributes, UnitCreationAttributes>
  implements UnitAttributes
{
  public id!: number;
  public unit_name!: string;
  public location!: string | null;
  public status!: string | null;
  public client_id!: number | null;
  public user_id!: number | null;
  public created_at!: Date;
  public updated_at!: Date;

  // Define associations
  public readonly client?: Client;
  public readonly user?: User;
  public readonly model?: ModelModel;
}

Unit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    unit_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "client",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "user",
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
    tableName: "unit",
    timestamps: false,
  }
);

export default Unit;
