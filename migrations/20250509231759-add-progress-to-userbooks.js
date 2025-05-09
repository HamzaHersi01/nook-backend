'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('UserBooks', 'currentPage', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    
    await queryInterface.addColumn('UserBooks', 'totalPages', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    
    await queryInterface.addColumn('UserBooks', 'lastReadAt', {
      type: Sequelize.DATE,
      allowNull: true
    });

    await queryInterface.addConstraint('UserBooks', {
      fields: ['currentPage'],
      type: 'check',
      where: {
        currentPage: {
          [Sequelize.Op.gte]: 0
        }
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('UserBooks', 'currentPage');
    await queryInterface.removeColumn('UserBooks', 'totalPages');
    await queryInterface.removeColumn('UserBooks', 'lastReadAt');
  }
};