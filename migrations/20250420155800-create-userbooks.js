'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserBooks', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
      },
      bookIsbn: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: 'Books', key: 'isbn' },
        onDelete: 'CASCADE',
      },
      status: {
        type: Sequelize.ENUM('to-read','reading','finished','paused','did not finish'),
        allowNull: false,
        defaultValue: 'to-read',
      },
      addedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },      
    });
    await queryInterface.addConstraint('UserBooks', {
      fields: ['userId', 'bookIsbn'],
      type: 'unique',
      name: 'user_book_unique'
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('UserBooks');
  }
};
