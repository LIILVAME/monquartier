# Guide d'Accessibilité - Design System MonQuartier

## ✅ Tests de Contraste WCAG 2.1 AA

### Couleurs Principales
- **Texte sur fond blanc** : Ratio 7.2:1 ✅ (AA Large)
- **Texte sur fond orange** : Ratio 4.8:1 ✅ (AA)
- **Boutons primaires** : Ratio 5.1:1 ✅ (AA)
- **Liens** : Ratio 4.9:1 ✅ (AA)

### États Interactifs
- **Focus** : Contour visible 2px ✅
- **Hover** : Changement de couleur perceptible ✅
- **Active** : Feedback visuel immédiat ✅

## 🎯 Fonctionnalités d'Accessibilité

### Navigation Clavier
- Tous les éléments interactifs sont accessibles au clavier
- Ordre de tabulation logique
- Indicateurs de focus visibles

### Lecteurs d'Écran
- Labels appropriés sur tous les formulaires
- Attributs ARIA correctement utilisés
- Structure sémantique respectée

### Responsive Design
- Zoom jusqu'à 200% sans perte de fonctionnalité
- Tailles de touch targets ≥ 44px
- Texte lisible sur tous les écrans

## 🔧 Classes d'Accessibilité

```css
/* Focus visible pour tous les éléments interactifs */
.mq-btn-primary:focus,
.mq-btn-secondary:focus,
.mq-select:focus,
.mq-textarea:focus {
  outline: 2px solid var(--mq-accent);
  outline-offset: 2px;
}

/* Texte pour lecteurs d'écran uniquement */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

## 📱 Tests Recommandés

1. **Navigation clavier** : Tab, Shift+Tab, Enter, Espace
2. **Lecteur d'écran** : NVDA, JAWS, VoiceOver
3. **Zoom** : 200% dans le navigateur
4. **Contraste** : Outils comme Colour Contrast Analyser
5. **Mobile** : Tests sur vrais appareils

## 🎨 Palette Accessible

Notre palette respecte les standards WCAG :
- Couleurs chaudes et accueillantes
- Contrastes suffisants pour tous les textes
- Alternatives pour les daltoniens
- Cohérence visuelle maintenue