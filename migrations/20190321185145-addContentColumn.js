'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'threads', 
      'content', 
      Sequelize.TEXT, {
        after: 'name'
      })
  },

  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'threads',
      'content'
    );
  }
};
