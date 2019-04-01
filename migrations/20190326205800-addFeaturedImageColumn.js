'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'threads',
      'featured_image',
      Sequelize.TEXT, {
        before: 'content'
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'threads',
      'featured_image'
    )
  }
};
