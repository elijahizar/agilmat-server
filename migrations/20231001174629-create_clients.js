"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the "brand" table
    await queryInterface.createTable("brand", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      brand_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Create the "model" table
    await queryInterface.createTable("model", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      model_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      brand_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "brand",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });

    // Add a foreign key to the "device" table to establish the relationship with "model"
    await queryInterface.addColumn("device", "model_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "model",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the foreign key from the "device" table
    await queryInterface.removeColumn("device", "model_id");

    // Drop the "brand" and "model" tables in reverse order
    await queryInterface.dropTable("model");
    await queryInterface.dropTable("brand");
  },
};
