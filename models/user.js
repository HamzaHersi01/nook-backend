'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    // Define associations here
    static associate(models) {
      // One-to-many: A user can have many userBooks
      User.hasMany(models.UserBook, { foreignKey: 'userId' });
    }
  }

  // Define the fields and validation rules
  User.init(
    {
      id: {
        type: DataTypes.UUID,               // Use UUID for globally unique user ID
        defaultValue: DataTypes.UUIDV4,     // Auto-generate UUID on creation
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,                       // Prevent duplicate emails
        validate: {
          isEmail: true,                    // Sequelize validator for email format
        },
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,                   // Store hashed password
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',                   // Explicit table name
      timestamps: true,                     // Adds createdAt and updatedAt fields
    }
  );

  return User;
};
