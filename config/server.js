module.exports = ({ env }) => {
  console.log('\n\n\n');
  console.log('#############################################');
  console.log('### CHARGEMENT DU SERVER.JS ###');
  console.log('#############################################');
  console.log('\n');
  
  return {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: {
      keys: env.array('APP_KEYS'),
    },
    webhooks: {
      populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
    },
  };
};
