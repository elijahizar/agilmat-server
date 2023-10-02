import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connection";
import ModelModel from "./model";

// These are the attributes of the model
interface BrandAttributes {
  id: number;
  brand_name: string;
  created_at: Date;
  updated_at: Date;
}

// These are the attributes that can be set during instance creation
interface BrandCreationAttributes extends Optional<BrandAttributes, "id"> {}

class Brand
  extends Model<BrandAttributes, BrandCreationAttributes>
  implements BrandAttributes
{
  public id!: number;
  public brand_name!: string;
  public created_at!: Date;
  public updated_at!: Date;

  // Define associations
  public readonly models?: ModelModel[];
}

Brand.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    brand_name: {
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
    tableName: "brand",
    timestamps: false,
  }
);

export default Brand;
