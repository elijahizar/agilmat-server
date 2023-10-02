import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connection";
import { Sequelize } from "sequelize";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public created_at?: Date; // Include created_at with allowNull: false
  public updated_at?: Date; // Include updated_at with allowNull: false

  // ...

  // Define your model's attributes and associations here

  // Enable automatic timestamps
  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: true, // Set allowNull: false for created_at
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: true, // Set allowNull: false for updated_at
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: "user",
        timestamps: true, // Enable automatic timestamps
        updatedAt: "updated_at", // Specify the updated_at field name
        createdAt: "created_at", // Specify the created_at field name
      }
    );

    return User;
  }
}

export default User;
