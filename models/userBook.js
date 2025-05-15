'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class UserBook extends Model {
    // Associate UserBook with User (many-to-one)
    static associate(models) {
      UserBook.belongsTo(models.User, { foreignKey: 'userId' });
    }

    // Instance method to update reading progress
    async updateProgress(currentPage, totalPages) {
      if (currentPage !== undefined) this.currentPage = currentPage;
      if (totalPages !== undefined) this.totalPages = totalPages;

      // Auto-update reading status based on progress
      if (this.currentPage === this.totalPages) {
        this.status = 'finished';
      } else if (this.currentPage > 0) {
        this.status = 'reading';
      }

      this.lastReadAt = new Date(); // Timestamp for last reading activity
      return this.save(); // Persist changes
    }

    // Virtual getter for progress percentage (0–100)
    getProgressPercentage() {
      if (!this.currentPage || !this.totalPages) return 0;
      return Math.round((this.currentPage / this.totalPages) * 100);
    }
  }

  UserBook.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      workID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          'to-read',
          'reading',
          'finished',
          'paused',
          'did not finish'
        ),
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
          },
        },
      },
      totalPages: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 1,
        },
      },
      lastReadAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      progressPercentage: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.getProgressPercentage(); // Virtual getter call
        },
      },
    },
    {
      sequelize,
      modelName: 'UserBook',
      tableName: 'UserBooks',
      timestamps: false, // No automatic createdAt/updatedAt
      indexes: [
        {
          unique: true,
          fields: ['userId', 'workID'], // Prevent duplicate entries for same book/user
        },
        {
          fields: ['status'], // For efficient filtering
        },
        {
          fields: ['lastReadAt'], // For sorting by recency
        },
      ],
      hooks: {
        // Hook to automatically update lastReadAt if currentPage is changed
        beforeUpdate: (userBook) => {
          if (userBook.changed('currentPage')) {
            userBook.lastReadAt = new Date();
          }
        },
      },
    }
  );

  return UserBook;
};
