# Documentation Technique Backend InMemory

## Architecture

- **Framework** : Strapi v4
- **Base de données** : PostgreSQL
- **Authentification** : JWT via Strapi
- **Environnement** : Node.js

## Structure d'une API dans Strapi

Chaque API dans Strapi doit avoir la structure suivante :

```
src/api/[nom-api]/
├── content-types/
│   └── [nom-api]/
│       └── schema.json    # Définition du modèle
├── controllers/
│   └── [nom-api].js      # Logique de contrôle
├── routes/
│   └── [nom-api].js      # Définition des routes
└── services/
    └── [nom-api].js      # Logique métier
```

### Exemple de configuration complète

1. **Schema** (`content-types/[nom-api]/schema.json`) :
```json
{
  "kind": "collectionType",
  "collectionName": "models",
  "info": {
    "displayName": "Model",
    "pluralName": "models",
    "singularName": "model"
  },
  "options": {
    "draftAndPublish": false
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    }
  }
}
```

2. **Controller** (`controllers/[nom-api].js`) :
```javascript
'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::model.model');
```

3. **Routes** (`routes/[nom-api].js`) :
```javascript
'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::model.model');
```

4. **Service** (`services/[nom-api].js`) :
```javascript
'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::model.model');
```

## Débogage d'une API

### Vérification de la structure

1. **Vérifier que tous les fichiers nécessaires existent** :
   - Schema
   - Controller
   - Routes
   - Service

2. **Vérifier les permissions** :
   - Dans `config/plugins/users-permissions.js`
   - Dans `config/roles/authenticated.json`
   - Dans l'interface d'administration de Strapi

3. **Vérifier les logs** :
   - Activer les logs détaillés dans le contrôleur
   - Vérifier les logs du serveur lors des requêtes

### Erreurs courantes

1. **Erreur 500 (Internal Server Error)** :
   - Vérifier que le service existe
   - Vérifier les logs du serveur
   - Vérifier les permissions

2. **Erreur 404 (Not Found)** :
   - Vérifier que la route existe
   - Vérifier que le contrôleur est correctement configuré

3. **Erreur 403 (Forbidden)** :
   - Vérifier les permissions dans l'interface d'administration
   - Vérifier le token JWT

### Bonnes pratiques

1. **Structure** :
   - Toujours créer les 4 fichiers (schema, controller, routes, service)
   - Suivre la convention de nommage de Strapi

2. **Permissions** :
   - Configurer les permissions dans l'interface d'administration
   - Documenter les permissions requises

3. **Logs** :
   - Ajouter des logs dans les contrôleurs
   - Utiliser des messages d'erreur descriptifs

## Modèles de Données

### Resource
```typescript
{
  kind: "collectionType",
  collectionName: "resources",
  info: {
    singularName: "resource",
    pluralName: "resources",
    displayName: "Resource"
  },
  options: {
    draftAndPublish: false
  },
  attributes: {
    title: {
      type: "string",
      required: true
    },
    content: {
      type: "text",
      required: true
    },
    date: {
      type: "date",
      required: true
    },
    location: {
      type: "string",
      required: true
    },
    status: {
      type: "enumeration",
      enum: ["draft", "published"],
      default: "draft",
      required: true
    },
    imageUrl: {
      type: "string"
    },
    link: {
      type: "string"
    },
    category: {
      type: "relation",
      relation: "manyToOne",
      target: "api::category.category",
      inversedBy: "resources"
    },
    votes: {
      type: "relation",
      relation: "oneToMany",
      target: "api::vote.vote",
      mappedBy: "resource"
    }
  }
}
```

### Category
```typescript
{
  kind: "collectionType",
  collectionName: "categories",
  info: {
    singularName: "category",
    pluralName: "categories",
    displayName: "Category"
  },
  options: {
    draftAndPublish: false
  },
  attributes: {
    name: {
      type: "string",
      required: true
    },
    description: {
      type: "text",
      required: true
    },
    resources: {
      type: "relation",
      relation: "oneToMany",
      target: "api::resource.resource",
      mappedBy: "category"
    }
  }
}
```

### Team
```typescript
{
  kind: "collectionType",
  collectionName: "teams",
  info: {
    singularName: "team",
    pluralName: "teams",
    displayName: "Team"
  },
  options: {
    draftAndPublish: false
  },
  attributes: {
    name: {
      type: "string",
      required: true
    },
    color: {
      type: "string",
      required: true
    },
    users: {
      type: "relation",
      relation: "manyToMany",
      target: "plugin::users-permissions.user",
      inversedBy: "teams"
    },
    votes: {
      type: "relation",
      relation: "oneToMany",
      target: "api::vote.vote",
      mappedBy: "team"
    }
  }
}
```

### Vote
```typescript
{
  kind: "collectionType",
  collectionName: "votes",
  info: {
    singularName: "vote",
    pluralName: "votes",
    displayName: "Vote"
  },
  options: {
    draftAndPublish: false
  },
  attributes: {
    value: {
      type: "integer",
      required: true
    },
    user: {
      type: "relation",
      relation: "manyToOne",
      target: "plugin::users-permissions.user",
      inversedBy: "votes"
    },
    resource: {
      type: "relation",
      relation: "manyToOne",
      target: "api::resource.resource",
      inversedBy: "votes"
    },
    team: {
      type: "relation",
      relation: "manyToOne",
      target: "api::team.team",
      inversedBy: "votes"
    }
  }
}
```

## Configuration des Permissions

### Public (non authentifié)
```json
{
  "category": {
    "find": true,
    "findOne": true
  },
  "resource": {
    "find": true,
    "findOne": true
  },
  "team": {
    "find": true,
    "findOne": true
  },
  "vote": {
    "find": true,
    "findOne": true
  }
}
```

### Authenticated
```json
{
  "category": {
    "find": true,
    "findOne": true
  },
  "resource": {
    "find": true,
    "findOne": true,
    "create": true,
    "update": true,
    "delete": true
  },
  "team": {
    "find": true,
    "findOne": true
  },
  "vote": {
    "find": true,
    "findOne": true,
    "create": true,
    "update": true,
    "delete": true
  }
}
```

## API Endpoints

### Format de Réponse Standard
```typescript
// Réponse Success
{
  data: T[],
  meta: {
    pagination: {
      page: number,
      pageSize: number,
      pageCount: number,
      total: number
    }
  }
}

// Réponse Error
{
  error: {
    status: number,
    name: string,
    message: string,
    details: any
  }
}
```

### Options de Requête

1. **Pagination**
```
?pagination[page]=1
?pagination[pageSize]=10
?pagination[start]=0
?pagination[limit]=10
```

2. **Population des Relations**
```
?populate=*                    // Toutes les relations
?populate=category,votes       // Relations spécifiques
?populate[category]=true       // Une seule relation
?populate[votes][populate]=*   // Relations imbriquées
```

3. **Filtres**
```
?filters[title][$contains]=test
?filters[date][$gt]=2024-01-01
?filters[category][name][$eq]=IA
```

4. **Tri**
```
?sort=date:desc
?sort[0]=date:desc&sort[1]=title:asc
```

## Authentification

### Login
```typescript
POST /api/auth/local
Body: {
  identifier: string, // email ou username
  password: string
}
Response: {
  jwt: string,
  user: {
    id: number,
    username: string,
    email: string
  }
}
```

### Utilisation du Token
```typescript
Headers: {
  Authorization: "Bearer <token>"
}
```

## Bonnes Pratiques

1. **Gestion des Relations**
   - Toujours vérifier l'existence des entités liées
   - Utiliser les transactions pour les opérations multiples
   - Nettoyer les relations orphelines

2. **Performance**
   - Limiter l'utilisation de `populate=*`
   - Utiliser la pagination
   - Indexer les champs fréquemment filtrés

3. **Sécurité**
   - Valider les entrées utilisateur
   - Limiter les permissions au minimum nécessaire
   - Ne pas exposer de données sensibles

4. **Maintenance**
   - Logger les erreurs importantes
   - Documenter les changements de schéma
   - Versionner les migrations de base de données

## Résolution des problèmes courants

### Problème de modèles manquants
Si vous rencontrez une erreur du type "Metadata for 'api::model.model' not found", cela signifie qu'un modèle est référencé mais n'existe pas dans le système de fichiers. Pour résoudre ce problème :

1. Vérifiez que le modèle existe dans le dossier `src/api/`
2. Si le modèle n'existe pas, créez-le avec la structure suivante :
   ```
   src/api/[model]/
   ├── content-types/
   │   └── [model]/
   │       └── schema.json
   ├── controllers/
   │   └── [model].js
   └── routes/
       └── [model].js
   ```
3. Assurez-vous que les relations entre les modèles sont correctement définies dans les schémas

Exemple de schéma pour un modèle :
```json
{
  "kind": "collectionType",
  "collectionName": "models",
  "info": {
    "displayName": "Model",
    "pluralName": "models",
    "singularName": "model"
  },
  "options": {
    "draftAndPublish": false
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "relation": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::other-model.other-model"
    }
  }
}
``` 