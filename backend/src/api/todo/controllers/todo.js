'use strict';

/**
 * todo controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::todo.todo', ({ strapi }) => ({
  async create(ctx) {
    const { user } = ctx.state;
    if (!user) return ctx.unauthorized();

    const todo = await strapi.documents('api::todo.todo').create({
      data: {
        ...ctx.request.body.data,
        user: user.id,
      },
      status: 'published',
    });

    return { data: todo };
  },

  async find(ctx) {
    const { user } = ctx.state;
    if (!user) return ctx.unauthorized();

    const todos = await strapi.documents('api::todo.todo').findMany({
      filters: {
        user: user.id,
      },
    });

    return { data: todos };
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    const todo = await strapi.documents('api::todo.todo').findOne({
      documentId: id,
      populate: ['user'],
    });

    if (!todo) return ctx.notFound();
    if (todo.user?.id !== user.id) return ctx.forbidden();

    return await super.findOne(ctx);
  },

  async update(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    const todo = await strapi.documents('api::todo.todo').findOne({
      documentId: id,
      populate: ['user'],
    });

    if (!todo) return ctx.notFound();
    if (todo.user?.id !== user.id) return ctx.forbidden();

    if (ctx.request.body.data) {
      delete ctx.request.body.data.user;
    }

    return await super.update(ctx);
  },

  async delete(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    const todo = await strapi.documents('api::todo.todo').findOne({
      documentId: id,
      populate: ['user'],
    });

    if (!todo) return ctx.notFound();
    if (todo.user?.id !== user.id) return ctx.forbidden();

    return await super.delete(ctx);
  },
}));
