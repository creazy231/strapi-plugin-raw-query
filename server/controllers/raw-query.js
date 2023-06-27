'use strict';

module.exports = {
  async execute(ctx) {
    const {code} = ctx.request.body;

    const queries = code.replace(/^\s+/gm, "").split(';').map(query => query.replace(/\r?\n|\r/, "")).slice(0, -1);

    const results = [];
    for (const query of queries) {
      let result = await strapi.db.connection.raw(`${query};`).catch(err => err.message);

      if (typeof result === 'string') {
        result = [{'⚠ ERROR': result}];
      }

      results.push({
        query, result,
      });
    }

    ctx.send({
      message: 'ok', results,
    });
  },
};
