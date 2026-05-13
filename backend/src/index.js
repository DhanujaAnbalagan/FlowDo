'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Enable permissions for Authenticated role
    const authenticatedRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'authenticated' } });

    if (authenticatedRole) {
      const actions = [
        'api::todo.todo.create',
        'api::todo.todo.find',
        'api::todo.todo.findOne',
        'api::todo.todo.update',
        'api::todo.todo.delete',
      ];

      for (const action of actions) {
        const exists = await strapi.query('plugin::users-permissions.permission').findOne({
          where: { action, role: authenticatedRole.id },
        });

        if (!exists) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: { action, role: authenticatedRole.id },
          });
        }
      }
      console.log('✅ Permissions configured for Authenticated role');
    }
  },
};
