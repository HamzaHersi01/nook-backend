'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserBooks', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      workID: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('to-read', 'reading', 'finished', 'paused', 'did not finish'),
        allowNull: false,
        defaultValue: 'to-read'
      },
      addedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      currentPage: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      totalPages: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      lastReadAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    await queryInterface.addConstraint('UserBooks', {
      fields: ['userId', 'workID'],
      type: 'unique',
      name: 'unique_user_work'
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('UserBooks');
  }
};
