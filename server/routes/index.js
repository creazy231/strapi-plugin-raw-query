module.exports = [
  {
    method: 'POST',
    path: '/execute',
    handler: 'rawQuery.execute',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
];
