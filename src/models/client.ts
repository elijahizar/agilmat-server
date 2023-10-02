import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connection";
import Unit from "./unit";

// These are the attributes of the model
interface ClientAttributes {
  id: number;
  client_name: string;
  contact: string | null;
  address: string | null;
  created_at: Date;
  updated_at: Date;
}

// These are the attributes that can be set during instance creation
interface ClientCreationAttributes extends Optional<ClientAttributes, "id"> {}

class Client
  extends Model<ClientAttributes, ClientCreationAttributes>
  implements ClientAttributes
{
  public id!: number;
  public client_name!: string;
  public contact!: string | null;
  public address!: string | null;
  public created_at!: Date;
  public updated_at!: Date;

  // Define associations
  public readonly units?: Unit[];
}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    client_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    tableName: "client",
    timestamps: false,
  }
);

export default Client;
