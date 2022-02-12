'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('entries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      resource: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('entries', {
      fields: ['id', 'createdAt'],
      type: 'primary key',
      name: 'entries_p'
    });

    await queryInterface.addIndex('entries', 
    [
      { attribute: 'id', order: 'ASC' },
      { attribute: 'createdAt', order: 'DESC' }
    ], 
    {
      unique: false,
      name: 'entries_id_createdAt',
    });

    await queryInterface.sequelize.query('SELECT create_hypertable(\'"entries"\', \'createdAt\');');    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('entries');
  }
};
