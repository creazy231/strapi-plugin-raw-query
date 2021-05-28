'use strict';

/**
 * raw-query.js controller
 *
 * @description: A set of functions called "actions" of the `raw-query` plugin.
 */

module.exports = {
  execute: async (ctx) => {
    // Add your own logic here.
    const {code} = ctx.request.body;

    let queries = code.replace(/^\s+/gm, "").split(';').map(query => {
      return query.replace(/\r?\n|\r/, "");
    }).slice(0, -1);
    console.log(queries);

    let results = [];
    for (const query of queries) {
      const result = await strapi.connections.default.raw(`${query};`);
      results.push({
        query,
        result,
      });
    }

    // Send 200 `ok`
    ctx.send({
      message: 'ok',
      results,
    });
  }
};
