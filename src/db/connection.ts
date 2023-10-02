import { Sequelize } from "sequelize";

//parametres de connection Xampp
const sequelize = new Sequelize("agilmatdb", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    freezeTableName: true,
  },
});

sequelize
  .authenticate()
  .then(function () {
    console.log("success");
  })
  .catch(function (error) {
    console.log("error: " + error);
  });

export default sequelize;
