'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("entries", [{
      resource: "123",
      url: "http://joselo.local/123",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      resource: "456",
      url: "http://joselo.local/456",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
},

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("entries", null, {});
  }
};
