'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  class UserBook extends Model {
    static associate(models) {
      UserBook.belongsTo(models.User,   { foreignKey: 'userId'   });
      UserBook.belongsTo(models.Book,   { foreignKey: 'bookIsbn' });
    }
  }
  UserBook.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM('to-read','reading','finished','paused','did not finish'),
      allowNull: false,
      defaultValue: 'to-read',
    },
    addedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'UserBook',
    tableName: 'UserBooks',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'bookIsbn']
      }
    ],
  });
  return UserBook;
};
