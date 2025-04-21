const bcrypt = require('bcryptjs');

// Fonction pour hasher les mots de passe
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

async function seedDatabase({ strapi }) {
  console.log('\n\n\n');
  console.log('=========================================');
  console.log('=== DÉBUT DU SCRIPT DE SEEDING ===');
  console.log('=========================================');
  console.log('\n');
  
  try {
    // Test de création d'un utilisateur simple
    console.log('1. Tentative de création d\'un utilisateur test...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const user = await strapi.plugins['users-permissions'].services.user.add({
      username: 'test_user',
      email: 'test@example.com',
      password: hashedPassword,
      confirmed: true,
      blocked: false,
      provider: 'local',
      role: 1
    });
    
    console.log('✅ Utilisateur créé avec succès:', user);
    
    // Test de création d'une catégorie simple
    console.log('\n2. Tentative de création d\'une catégorie test...');
    const category = await strapi.entityService.create('api::category.category', {
      data: {
        name: 'Test Category',
        publishedAt: new Date()
      }
    });
    
    console.log('✅ Catégorie créée avec succès:', category);
    
    // Test de création d'une ressource simple
    console.log('\n3. Tentative de création d\'une ressource test...');
    const resource = await strapi.entityService.create('api::resource.resource', {
      data: {
        title: 'Test Resource',
        description: 'This is a test resource',
        content: 'Test content',
        link: 'https://example.com',
        category: category.id,
        author: user.id,
        status: 'published',
        publishedAt: new Date()
      }
    });
    
    console.log('✅ Ressource créée avec succès:', resource);
    
    console.log('\n');
    console.log('=========================================');
    console.log('=== SEEDING TERMINÉ AVEC SUCCÈS ===');
    console.log('=========================================');
    console.log('\n\n\n');
  } catch (error) {
    console.error('\n');
    console.error('=========================================');
    console.error('=== ERREUR LORS DU SEEDING ===');
    console.error('=========================================');
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    console.error('=========================================');
    console.error('\n\n\n');
    throw error;
  }
}

module.exports = { seedDatabase }; 