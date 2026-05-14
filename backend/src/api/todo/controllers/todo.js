'use strict';

/**
 * todo controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::todo.todo', ({ strapi }) => ({
  /**
   * Override find to only return todos belonging to the authenticated user
   */
  async find(ctx) {
    const { user } = ctx.state;
    if (!user) return ctx.unauthorized();

    // In v5, we use the Document Service directly for secure scoped queries
    const entries = await strapi.documents('api::todo.todo').findMany({
      filters: {
        user: {
          id: user.id
        }
      },
      status: 'published',
      ...ctx.query
    });

    return { data: entries };
  },

  /**
   * Override findOne to ensure ownership
   */
  async findOne(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    const entry = await strapi.documents('api::todo.todo').findOne({
      documentId: id,
      populate: ['user'],
    });

    if (!entry) return ctx.notFound();
    if (entry.user?.id !== user.id) return ctx.forbidden();

    return { data: entry };
  },

  /**
   * Override create to associate with current user
   */
  async create(ctx) {
    const { user } = ctx.state;
    const { data } = ctx.request.body;

    if (!user) return ctx.unauthorized();

    const entry = await strapi.documents('api::todo.todo').create({
      data: {
        ...data,
        user: user.id, // Associate with current user
      },
      status: 'published'
    });

    return { data: entry };
  },

  /**
   * Override update to ensure ownership
   */
  async update(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;
    const { data } = ctx.request.body;

    const entry = await strapi.documents('api::todo.todo').findOne({
      documentId: id,
      populate: ['user'],
    });

    if (!entry) return ctx.notFound();
    if (entry.user?.id !== user.id) return ctx.forbidden();

    // Prevent ownership change
    const updateData = { ...data };
    delete updateData.user;

    const updatedEntry = await strapi.documents('api::todo.todo').update({
      documentId: id,
      data: updateData,
      status: 'published'
    });

    return { data: updatedEntry };
  },

  /**
   * Override delete to ensure ownership
   */
  async delete(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    const entry = await strapi.documents('api::todo.todo').findOne({
      documentId: id,
      populate: ['user'],
    });

    if (!entry) return ctx.notFound();
    if (entry.user?.id !== user.id) return ctx.forbidden();

    await strapi.documents('api::todo.todo').delete({
      documentId: id
    });

    return ctx.send({ message: 'Deleted successfully' }, 200);
  },
}));
