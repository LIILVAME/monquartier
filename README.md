# MonQuartier - Abidjan

Un site web minimaliste et convivial permettant aux résidents d'évaluer et de partager des informations sur la qualité de vie dans les quartiers du District Autonome d'Abidjan.

## 🎯 Fonctionnalités

### ✅ Fonctionnalités implémentées
- **Système de notation par critères** : Évaluez la sécurité, propreté, transports et commerces
- **Section de commentaires modérée** : Partagez votre expérience de vie locale
- **Carte interactive** : Visualisez les quartiers d'Abidjan avec leurs notes moyennes
- **Filtrage par communes** : Filtrez le contenu par les 10 communes d'Abidjan
- **Design responsive** : Interface adaptée à tous les appareils
- **Navigation intuitive** : Menu mobile avec animation hamburger
- **Accessibilité WCAG 2.1** : Support complet pour tous les utilisateurs

### 🏘️ Communes couvertes
- Abobo
- Adjamé  
- Attécoubé
- Cocody
- Koumassi
- Marcory
- Plateau
- Port-Bouët
- Treichville
- Yopougon

## 🚀 Démarrage rapide

### Prérequis
- Un navigateur web moderne
- Un serveur web local (optionnel pour le développement)

### Installation
1. Clonez ou téléchargez les fichiers du projet
2. Ouvrez `index.html` dans votre navigateur

### Serveur local (recommandé)
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (si http-server est installé)
npx http-server

# Avec PHP
php -S localhost:8000
```

Puis ouvrez http://localhost:8000 dans votre navigateur.

## 📁 Structure du projet

```
monquartier/
├── index.html          # Page principale
├── styles.css          # Styles CSS avec design responsive
├── script.js           # Fonctionnalités JavaScript
└── README.md           # Documentation
```

## 🎨 Design et UX

### Palette de couleurs
- **Primaire** : #2563eb (Bleu professionnel)
- **Secondaire** : #64748b (Gris moderne)
- **Accent** : #f59e0b (Orange pour les étoiles)
- **Succès** : #10b981 (Vert)
- **Erreur** : #ef4444 (Rouge)

### Typographie
- **Police** : Inter (Google Fonts)
- **Hiérarchie** : Titres clairs et lisibles
- **Contraste** : Respecte les standards WCAG AA

### Responsive Design
- **Mobile First** : Optimisé pour les petits écrans
- **Breakpoints** : 768px (tablette), 480px (mobile)
- **Navigation** : Menu hamburger sur mobile

## ♿ Accessibilité

### Standards respectés
- **WCAG 2.1 Level AA** : Contraste, navigation clavier, structure sémantique
- **ARIA** : Labels et rôles appropriés
- **Focus** : Indicateurs visuels clairs
- **Screen readers** : Support complet

### Fonctionnalités d'accessibilité
- Navigation au clavier
- Textes alternatifs
- Contrastes élevés
- Support du mode sombre
- Structure sémantique HTML5

## 🗺️ Carte interactive

### Technologie
- **Leaflet.js** : Bibliothèque de cartes légère et performante
- **OpenStreetMap** : Données cartographiques libres
- **Markers** : Positionnement des 10 communes d'Abidjan

### Fonctionnalités
- Zoom et navigation
- Popups informatifs avec notes moyennes
- Couleurs basées sur les évaluations
- Responsive sur tous appareils

## 📊 Système d'évaluation

### Critères d'évaluation
1. **Sécurité** 🛡️ : Sentiment de sécurité dans le quartier
2. **Propreté** 🧹 : État de propreté des rues et espaces publics
3. **Transports** 🚌 : Accessibilité et qualité des transports
4. **Commerces** 🏪 : Disponibilité et variété des commerces

### Notation
- **Échelle** : 1 à 5 étoiles
- **Interface** : Système d'étoiles interactif
- **Validation** : Tous les critères obligatoires

## 💬 Système de commentaires

### Fonctionnalités
- **Modération** : Commentaires vérifiés avant publication
- **Anonymat** : Protection de la vie privée
- **Filtrage** : Par commune et quartier
- **Validation** : Minimum 10 caractères

### Sécurité
- Échappement HTML pour prévenir les attaques XSS
- Validation côté client et serveur (à implémenter)

## 🔧 Technologies utilisées

### Frontend
- **HTML5** : Structure sémantique
- **CSS3** : Variables CSS, Flexbox, Grid
- **JavaScript ES6+** : Fonctionnalités modernes
- **Leaflet.js** : Cartographie interactive

### Polices et icônes
- **Google Fonts** : Inter
- **Emojis** : Icônes des critères d'évaluation

## 📱 Compatibilité

### Navigateurs supportés
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Appareils
- Desktop (1200px+)
- Tablette (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Performances

### Optimisations
- **Lazy loading** : Carte chargée à la demande
- **CSS optimisé** : Variables et réutilisation
- **JavaScript modulaire** : Fonctions séparées
- **Images** : Format SVG pour les icônes

### Métriques cibles
- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1

## 🔮 Évolutions futures

### Fonctionnalités à développer
- [ ] Backend avec base de données
- [ ] Authentification utilisateur
- [ ] API REST pour les évaluations
- [ ] Notifications push
- [ ] Mode hors ligne (PWA)
- [ ] Géolocalisation automatique
- [ ] Graphiques et statistiques
- [ ] Export des données

### Améliorations techniques
- [ ] Tests automatisés
- [ ] CI/CD Pipeline
- [ ] Monitoring des performances
- [ ] Optimisation SEO
- [ ] Compression des assets

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📞 Contact

Pour toute question ou suggestion concernant MonQuartier Abidjan, n'hésitez pas à nous contacter.

---

**MonQuartier** - Améliorer ensemble la qualité de vie à Abidjan 🏙️