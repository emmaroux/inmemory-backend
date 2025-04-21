'use strict';

/**
 * category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::category.category', ({ strapi }) => ({
  async find(ctx) {
    try {
      console.log('=== Début de la requête find categories ===');
      console.log('Query params:', ctx.query);
      console.log('Headers:', ctx.headers);
      
      // Vérification du service
      const categoryService = strapi.service('api::category.category');
      console.log('Service category:', !!categoryService);
      
      if (!categoryService) {
        throw new Error('Service category non trouvé');
      }
      
      // Vérification de la méthode find
      console.log('Méthode find existe:', typeof categoryService.find === 'function');
      
      if (typeof categoryService.find !== 'function') {
        throw new Error('Méthode find non trouvée sur le service category');
      }
      
      // Exécution de la requête
      console.log('Exécution de la requête find...');
      const entities = await categoryService.find(ctx.query);
      console.log('Entités trouvées:', entities);
      
      // Sanitization
      console.log('Sanitization des entités...');
      const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
      console.log('Entités sanitizées:', sanitizedEntities);
      
      // Transformation de la réponse
      console.log('Transformation de la réponse...');
      const response = this.transformResponse(sanitizedEntities);
      console.log('Réponse finale:', response);
      
      console.log('=== Fin de la requête find categories ===');
      return response;
    } catch (error) {
      console.error('Erreur dans le contrôleur category.find:', error);
      console.error('Stack:', error.stack);
      throw error;
    }
  },
})); 