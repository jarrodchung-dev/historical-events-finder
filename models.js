const Sequelize = require("sequelize");

const sequelize = Sequelize("events", "root", "1234", {
  dialect: "mysql",
  logging: console.log
});

const User = sequelize.define("/users", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
});

const FavoriteSet = sequelize.define("/favorites", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  favoriteSet: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
});

module.exports = {
  sequelize: sequelize,
  User: User
};
