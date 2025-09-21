# Déploiement GitHub Pages - MonQuartier

## 🚀 Accès à la version déployée

Une fois que vous aurez poussé ce code vers votre repository GitHub, votre application sera automatiquement déployée sur GitHub Pages.

### URL de déploiement
Votre application sera accessible à l'adresse :
```
https://[votre-nom-utilisateur].github.io/[nom-du-repository]/
```

Par exemple, si votre nom d'utilisateur GitHub est `vametoure` et le repository s'appelle `monquartier`, l'URL sera :
```
https://vametoure.github.io/monquartier/
```

## ⚙️ Configuration requise

### 1. Activer GitHub Pages
1. Allez dans les **Settings** de votre repository GitHub
2. Scrollez jusqu'à la section **Pages**
3. Dans **Source**, sélectionnez **GitHub Actions**

### 2. Pousser le code
```bash
git add .
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

### 3. Vérifier le déploiement
- Allez dans l'onglet **Actions** de votre repository
- Vous verrez le workflow "Deploy to GitHub Pages" en cours d'exécution
- Une fois terminé, votre site sera accessible à l'URL mentionnée ci-dessus

## 📁 Structure de déploiement

Le workflow déploie directement les fichiers suivants :
- `index.html` - Page principale
- `styles.css` - Styles CSS
- `script.js` - JavaScript
- `leaflet.css` - Styles Leaflet (local)
- Tous les autres fichiers HTML et assets

## 🔧 Workflow automatique

Le fichier `.github/workflows/deploy.yml` configure :
- ✅ Déploiement automatique sur chaque push vers `main`
- ✅ Installation des dépendances npm
- ✅ Build des assets CSS
- ✅ Déploiement sur GitHub Pages

## 📝 Notes importantes

- Le déploiement peut prendre 2-5 minutes après le push
- Les changements sont visibles immédiatement après le déploiement
- Le site utilise HTTPS automatiquement
- Le cache peut prendre quelques minutes à se mettre à jour

## 🐛 Dépannage

Si le déploiement échoue :
1. Vérifiez l'onglet **Actions** pour les erreurs
2. Assurez-vous que GitHub Pages est activé dans les settings
3. Vérifiez que la branche source est correcte (main/master)

---

**Prêt à déployer !** 🎉