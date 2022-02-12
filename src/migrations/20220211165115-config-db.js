'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query("CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;");
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query("DROP EXTENSION IF EXISTS timescaledb CASCADE");
  }
};
