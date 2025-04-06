'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: '$2a$12$6o2LYkjNATfN4uP8EF8dMeajvtJBHACNW5dV0oM0P5o4M/hyNdSh6', // Replace with a hashed password
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user',
        email: 'user@example.com',
        password: '$2a$12$6o2LYkjNATfN4uP8EF8dMeajvtJBHACNW5dV0oM0P5o4M/hyNdSh6', // Replace with a hashed password
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
