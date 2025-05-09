'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class UserBook extends Model {
    static associate(models) {
      UserBook.belongsTo(models.User, { foreignKey: 'userId' });
      UserBook.belongsTo(models.Book, { foreignKey: 'bookIsbn' });
    }

    // Instance method to update progress
async updateProgress(currentPage, totalPages) {
  if (currentPage !== undefined) this.currentPage = currentPage;
  if (totalPages !== undefined) this.totalPages = totalPages;
  
  // Auto-update status
  if (this.currentPage === this.totalPages) {
    this.status = 'finished';
  } else if (this.currentPage > 0) {
    this.status = 'reading';
  }
  
  this.lastReadAt = new Date();
  return this.save();
}

    // Virtual getter for progress percentage
    getProgressPercentage() {
      if (!this.currentPage || !this.totalPages) return 0;
      return Math.round((this.currentPage / this.totalPages) * 100);
    }
  }

  UserBook.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM('to-read', 'reading', 'finished', 'paused', 'did not finish'),
      allowNull: false,
      defaultValue: 'to-read',
    },
    addedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    currentPage: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        isValidPage(value) {
          if (value && this.totalPages && value > this.totalPages) {
            throw new Error('Current page cannot exceed total pages');
          }
        }
      }
    },
    totalPages: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1
      }
    },
    lastReadAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    // Virtual field for progress percentage
    progressPercentage: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getProgressPercentage();
      }
    }
  }, {
    sequelize,
    modelName: 'UserBook',
    tableName: 'UserBooks',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'bookIsbn']
      },
      {
        fields: ['status']
      },
      {
        fields: ['lastReadAt']
      }
    ],
    hooks: {
      beforeUpdate: (userBook) => {
        // Automatically update lastReadAt when progress changes
        if (userBook.changed('currentPage')) {
          userBook.lastReadAt = new Date();
        }
      }
    }
  });

  return UserBook;
};