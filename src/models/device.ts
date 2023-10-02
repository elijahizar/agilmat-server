import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connection";
import User from "./user";
import ModelModel from "./model";
import Service from "./service";

// These are the attributes of the model
interface DeviceAttributes {
  id: number;
  serial_number: string;
  model_id: number | null;
  status: string | null;
  unit_id: number | null;
  created_at?: Date;
  updated_at?: Date;
}

// These are the attributes that can be set during instance creation
interface DeviceCreationAttributes extends Optional<DeviceAttributes, "id"> {}

class Device
  extends Model<DeviceAttributes, DeviceCreationAttributes>
  implements DeviceAttributes
{
  public id!: number;
  public serial_number!: string;
  public model_id!: number | null;
  public status!: string | null;
  public unit_id!: number | null;
  public created_at?: Date;
  public updated_at?: Date;

  // Define associations
  public readonly user?: User;
  public readonly model?: ModelModel;
  public readonly services?: Service[];
}

Device.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    serial_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "model",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    unit_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "unit",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "device",
    timestamps: false,
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

export default Device;
