import { DataTypes, Model as SequelizeModel, Optional } from "sequelize";
import sequelize from "../db/connection";
import Brand from "./brand";
import Device from "./device";

// These are the attributes of the model
interface ModelAttributes {
  id: number;
  model_name: string;
  created_at: Date;
  updated_at: Date;
  brand_id: number | null;
}

// These are the attributes that can be set during instance creation
interface ModelCreationAttributes extends Optional<ModelAttributes, "id"> {}

class Model
  extends SequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ModelAttributes
{
  public id!: number;
  public model_name!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public brand_id!: number | null;

  // Define associations
  public readonly brand?: Brand;
  public readonly devices?: Device[];
}

Model.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    model_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "brand",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    tableName: "model",
    timestamps: false,
  }
);

export default Model;
