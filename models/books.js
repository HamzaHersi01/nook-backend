'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsToMany(models.User, {
        through: models.UserBook,
        foreignKey: 'bookIsbn',
      });
    }
  }
  Book.init({
    isbn: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authors: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    coverUrl: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'Books',
    timestamps: true,
  });
  return Book;
};
