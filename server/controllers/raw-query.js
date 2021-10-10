'use strict';

module.exports = {
  async execute(ctx) {
    const {code} = ctx.request.body;

    let queries = code.replace(/^\s+/gm, "").split(';').map(query => {
      return query.replace(/\r?\n|\r/, "");
    }).slice(0, -1);

    let results = [];
    for (const query of queries) {
      let result = await strapi.db.connection.raw(`${query};`).catch(err => {
        return err.message;
      });
      if (typeof result === 'string') result = [{'⚠ ERROR': result}];
      results.push({
        query,
        result,
      });
    }

    ctx.send({
      message: 'ok',
      results,
    });
  },
};
