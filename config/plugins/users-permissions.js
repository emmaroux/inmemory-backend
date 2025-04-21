module.exports = {
  config: {
    jwt: {
      expiresIn: '7d',
    },
  },
  routes: {
    admin: {
      type: 'admin',
      routes: [
        {
          method: 'GET',
          path: '/roles',
          handler: 'role.find',
          config: {
            policies: [],
          },
        },
        {
          method: 'GET',
          path: '/roles/:id',
          handler: 'role.findOne',
          config: {
            policies: [],
          },
        },
        {
          method: 'PUT',
          path: '/roles/:id',
          handler: 'role.update',
          config: {
            policies: [],
          },
        },
      ],
    },
    'content-api': {
      type: 'content-api',
      routes: [
        {
          method: 'GET',
          path: '/categories',
          handler: 'category.find',
          config: {
            policies: [],
            auth: {
              scope: ['api::category.category.find'],
            },
          },
        },
        {
          method: 'GET',
          path: '/categories/:id',
          handler: 'category.findOne',
          config: {
            policies: [],
            auth: {
              scope: ['api::category.category.findOne'],
            },
          },
        },
      ],
    },
  },
  bootstrap(/*{ strapi }*/) {},
}; 