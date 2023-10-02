import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connection";
import Service from "./service";

// These are the attributes of the model
interface ServiceTypeAttributes {
  id: number;
  type_name: string;
  created_at: Date;
  updated_at: Date;
}

// These are the attributes that can be set during instance creation
interface ServiceTypeCreationAttributes
  extends Optional<ServiceTypeAttributes, "id"> {}

class ServiceType
  extends Model<ServiceTypeAttributes, ServiceTypeCreationAttributes>
  implements ServiceTypeAttributes
{
  public id!: number;
  public type_name!: string;
  public created_at!: Date;
  public updated_at!: Date;

  // Define associations
  public readonly services?: Service[];
}

ServiceType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type_name: {
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
  },
  {
    sequelize,
    tableName: "service_type",
    timestamps: false,
  }
);

export default ServiceType;
