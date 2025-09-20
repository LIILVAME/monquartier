# Guide de Dépannage - Design System MonQuartier

## Problèmes Résolus

### ⚠️ Avertissements CSS avec les directives `@apply`

**Problème :** L'IDE affichait des avertissements pour les directives `@apply` de Tailwind CSS dans `components.css`.

**Solution :** 
1. **Configuration Tailwind** : Création de `tailwind.config.js` avec la configuration complète
2. **Configuration PostCSS** : Ajout de `postcss.config.js` pour traiter Tailwind
3. **Configuration IDE** : Création de `.vscode/settings.json` et `.vscode/css_custom_data.json`
4. **Optimisation CSS** : Regroupement des directives `@apply` sur plusieurs lignes pour une meilleure lisibilité

### 📁 Fichiers Créés/Modifiés

#### Nouveaux Fichiers
- `tailwind.config.js` - Configuration Tailwind CSS
- `postcss.config.js` - Configuration PostCSS
- `package.json` - Gestion des dépendances
- `.vscode/settings.json` - Configuration IDE
- `.vscode/css_custom_data.json` - Données CSS personnalisées

#### Fichiers Modifiés
- `components.css` - Optimisation des directives `@apply`

### 🔧 Configuration IDE (VS Code)

Pour éviter les avertissements CSS avec Tailwind :

```json
{
  "css.validate": false,
  "scss.validate": false,
  "less.validate": false,
  "tailwindCSS.includeLanguages": {
    "css": "css"
  },
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

### 🚀 Scripts Disponibles

```bash
# Build CSS avec Tailwind
npm run build

# Build CSS en mode watch
npm run build-css

# Serveur de développement
npm run serve

# Développement complet
npm run dev
```

### 📋 Bonnes Pratiques

1. **Directives @apply** : Regrouper sur plusieurs lignes pour la lisibilité
2. **Configuration** : Toujours inclure `tailwind.config.js` et `postcss.config.js`
3. **IDE** : Configurer l'éditeur pour reconnaître Tailwind CSS
4. **Validation** : Désactiver la validation CSS native en faveur de Tailwind

### 🔍 Vérification

Pour vérifier que tout fonctionne :
1. Aucun avertissement CSS dans l'IDE
2. Le serveur démarre sans erreur
3. Les styles s'appliquent correctement
4. L'autocomplétion Tailwind fonctionne

### 📞 Support

En cas de problème persistant :
1. Vérifier que tous les fichiers de configuration sont présents
2. Redémarrer l'IDE après modification de la configuration
3. Vérifier les logs du serveur de développement