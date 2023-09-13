'use strict';

module.exports = {
  async execute(ctx) {
    const {code: query} = ctx.request.body;

    let result = await strapi.db.connection.raw(query).catch(err => err.message);

    if (typeof result === 'string') {
      result = [{'⚠ ERROR': result}];
    }

    ctx.send({
      message: 'ok',
      response: {
        query,
        result,
      }
    });
  },
};
