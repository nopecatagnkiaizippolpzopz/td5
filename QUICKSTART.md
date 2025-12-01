# 🚀 Guide de Démarrage Rapide - Lab 7

## ⚡ Installation et Configuration (5 minutes)

### 1. Configuration de MongoDB

**Option A: Utiliser .env existant**

Si vous avez déjà un fichier `.env.aurel`, rien à faire - il sera utilisé automatiquement.

**Option B: Créer un nouveau .env**

```bash
# Copier le template
cp .env.example .env

# Éditer avec votre éditeur favori
nano .env  # ou vim, code, etc.
```

Contenu du `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/healthcare?retryWrites=true&w=majority
```

> 💡 Remplacez `username`, `password` et `cluster` par vos vraies informations MongoDB Atlas

### 2. Vérification Rapide

```bash
# Vérifier que les dépendances sont installées
pnpm install

# Tester la connexion avec le seed
pnpm seed
```

Si vous voyez `✓ Added X doctors, patients, appointments`, c'est bon ! ✅

## 🧪 Lancer les Tests

### Tests complets avec coverage

```bash
pnpm test
```

**Résultat attendu:**
```
✓ tests/unit/validation.test.js (18 passed)
✓ tests/integration/doctors.test.js (12 passed)
✓ tests/integration/patients.test.js (11 passed)  
✓ tests/integration/appointments.test.js (10 passed)

Tests: 51 passed
Coverage: > 80%
```

### Tests en mode watch (développement)

```bash
pnpm test:watch
```

### Interface visuelle des tests

```bash
pnpm test:ui
```

Ouvre une interface web sur `http://localhost:51204` (ou autre port)

## 🏃 Lancer l'Application

### Mode développement (avec auto-reload)

```bash
pnpm dev
```

Le serveur démarre sur `http://localhost:3000`

### Mode production

```bash
pnpm start
```

## 🔍 Tester l'API

### Avec curl

```bash
# GET all doctors
curl http://localhost:3000/api/doctors

# POST new doctor
curl -X POST http://localhost:3000/api/doctors \
  -H "Content-Type: application/json" \
  -d '{"name":"Dr. Test","specialty":"Testing"}'

# GET all patients
curl http://localhost:3000/api/patients

# POST new patient
curl -X POST http://localhost:3000/api/patients \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","age":30}'
```

### Avec Bruno

1. Ouvrir Bruno
2. "Open Collection" → Sélectionner `bruno/Healthcare API`
3. Exécuter les requêtes

## 📊 Vérification du Code

### Linting

```bash
pnpm lint
```

Devrait afficher aucune erreur ✅

### Structure du projet

Vérifier que vous avez bien:

```
src/
├── models/           ✓ 3 fichiers (doctor, patient, appointment)
├── controllers/      ✓ 3 fichiers (doctor, patient, appointment)
├── routes/           ✓ 3 fichiers (doctors, patients, appointments)
└── utils/            ✓ validation.js

tests/
├── unit/             ✓ validation.test.js
├── integration/      ✓ 3 test files
└── setup.js          ✓ Configuration Vitest
```

## 🐛 Résolution de Problèmes

### ❌ "MONGODB_URI is undefined"

**Solution**: Créez un fichier `.env` avec votre URI MongoDB

```bash
cp .env.example .env
# Puis éditez .env avec votre URI
```

### ❌ Tests échouent avec erreur de connexion

**Solutions**:
1. Vérifiez que votre IP est autorisée dans MongoDB Atlas
2. Vérifiez username/password dans l'URI
3. Vérifiez que le cluster est actif

### ❌ "Cannot find module"

**Solution**: Réinstallez les dépendances

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### ❌ Port 3000 déjà utilisé

**Solution**: Changez le port dans `.env`

```env
PORT=3001
MONGODB_URI=...
```

## ✅ Checklist de Validation

Avant de considérer le Lab 7 comme terminé:

- [ ] `pnpm install` - Dépendances installées
- [ ] `pnpm seed` - Base de données seedée avec succès
- [ ] `pnpm lint` - Aucune erreur de linting
- [ ] `pnpm test` - 51 tests passent avec coverage ≥ 80%
- [ ] `pnpm dev` - Serveur démarre sans erreur
- [ ] Tests API manuels (curl/Bruno) fonctionnent
- [ ] Code suit l'architecture MVC
- [ ] Models Mongoose avec validation
- [ ] Controllers séparés des routes
- [ ] Tests unitaires ET intégration présents

## 📚 Fichiers Importants

| Fichier | Description |
|---------|-------------|
| `LAB7_SUMMARY.md` | Résumé détaillé de tout ce qui a été fait |
| `ARCHITECTURE.md` | Diagrammes et explication de l'architecture MVC |
| `README.md` | Documentation complète du projet |
| `vitest.config.js` | Configuration des tests |
| `package.json` | Scripts et dépendances |

## 🎯 Prochaines Étapes

1. **Valider**: S'assurer que tous les tests passent
2. **Tester**: Utiliser Bruno/Postman pour tester manuellement
3. **Comprendre**: Lire `ARCHITECTURE.md` pour bien comprendre le MVC
4. **Commiter**: Faire un commit avec les changements
5. **CI/CD**: Vérifier que la pipeline GitHub Actions passe

## 💡 Tips

- Utiliser `pnpm test:watch` pendant le développement
- Consulter `ARCHITECTURE.md` pour comprendre le flux de données
- Regarder `tests/integration/*.test.js` comme exemples
- Les tests nettoient la DB automatiquement avant chaque test
- Coverage visible dans `coverage/index.html` après `pnpm test`

## 🆘 Besoin d'Aide?

1. Lire `LAB7_SUMMARY.md` pour le détail complet
2. Lire `ARCHITECTURE.md` pour comprendre l'architecture
3. Vérifier les fichiers de tests comme exemples
4. Consulter la documentation Mongoose: https://mongoosejs.com/
5. Consulter la documentation Vitest: https://vitest.dev/

---

**Bonne chance avec le Lab 7! 🚀**
