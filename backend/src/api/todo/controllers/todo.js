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

    // Ensure we only find todos belonging to the user
    // We modify ctx.query to inject the user filter
    ctx.query = {
      ...ctx.query,
      filters: {
        ...(ctx.query.filters || {}),
        user: user.id,
      },
    };

    // Use super.find to leverage core logic (pagination, etc.)
    return await super.find(ctx);
  },

  /**
   * Override findOne to ensure the user owns the todo
   */
  async findOne(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    // We use the Document Service to check ownership
    const todo = await strapi.documents('api::todo.todo').findOne({
      documentId: id,
      populate: { user: true },
    });

    if (!todo) return ctx.notFound();
    if (todo.user?.id !== user.id) return ctx.forbidden();

    // Now call super.findOne which will return the formatted response
    return await super.findOne(ctx);
  },

  /**
   * Override create to automatically associate the todo with the current user
   */
  async create(ctx) {
    const { user } = ctx.state;
    if (!user) return ctx.unauthorized();

    // Force user to be the current user
    if (!ctx.request.body.data) {
      ctx.request.body.data = {};
    }
    
    ctx.request.body.data.user = user.id;

    // Use super.create to leverage core logic (and return standard format)
    return await super.create(ctx);
  },

  /**
   * Override update to ensure ownership and prevent owner changes
   */
  async update(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    const todo = await strapi.documents('api::todo.todo').findOne({
      documentId: id,
      populate: { user: true },
    });

    if (!todo) return ctx.notFound();
    if (todo.user?.id !== user.id) return ctx.forbidden();

    // Prevent changing ownership via update
    if (ctx.request.body.data) {
      delete ctx.request.body.data.user;
    }

    return await super.update(ctx);
  },

  /**
   * Override delete to ensure ownership
   */
  async delete(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    const todo = await strapi.documents('api::todo.todo').findOne({
      documentId: id,
      populate: { user: true },
    });

    if (!todo) return ctx.notFound();
    if (todo.user?.id !== user.id) return ctx.forbidden();

    return await super.delete(ctx);
  },
}));
