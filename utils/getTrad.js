const pluginId = require('../admin/src/pluginId');

const getTrad = (id) => `${pluginId}.${id}`;

module.exports = getTrad;