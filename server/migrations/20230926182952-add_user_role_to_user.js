'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn('users', 'user_role', {
      type: Sequelize.ENUM('user', 'admin'),
      defaultValue: 'user',
      field: 'user_role'
    })
  },

  async down (queryInterface, Sequelize) {
 
    await queryInterface.removeColumn('users', 'user_role');
  }
};
