# Lab 7 - Implémentation Mongoose & MVC - Résumé

## ✅ Ce qui a été implémenté

### 1. **Installation des dépendances**
- ✅ Mongoose 9.0.0 installé
- ✅ Vitest 2.1.9 installé (compatible avec Node 18)
- ✅ @vitest/ui et @vitest/coverage-v8 installés

### 2. **Architecture MVC créée**

#### **Models** (src/models/)
- ✅ `doctor.model.js` - Schéma Mongoose avec validation
  - Champs: name, specialty, active
  - Timestamps automatiques
  - Query helper `active()`
  - Method `deactivate()`
  
- ✅ `patient.model.js` - Schéma Mongoose avec validation d'âge
  - Champs: name, age (0-150), active
  - Virtual property `isMinor`
  - Query helper `active()`

- ✅ `appointment.model.js` - Schéma avec références
  - Références à Doctor et Patient (ObjectId)
  - Champs: date, time, status (enum)
  - Index unique pour éviter les doubles bookings
  - Method `populateDetails()`

#### **Controllers** (src/controllers/)
- ✅ `doctor.controller.js` - CRUD complet
- ✅ `patient.controller.js` - CRUD complet
- ✅ `appointment.controller.js` - CRUD complet avec gestion des conflits

#### **Routes** (src/routes/)
- ✅ `doctors.js` - Mapping simple vers contrôleurs
- ✅ `patients.js` - Mapping simple vers contrôleurs
- ✅ `appointments.js` - Mapping simple vers contrôleurs

### 3. **Migration de la base de données**
- ✅ `src/db.js` - Migré de MongoDB natif vers Mongoose
  - Connexion Mongoose avec gestion d'état
  - Backward compatibility avec `getDB()`
  - Graceful shutdown handlers
  
- ✅ `seed.js` - Migré pour utiliser les modèles Mongoose

### 4. **Tests créés**

#### **Tests unitaires** (tests/unit/)
- ✅ `validation.test.js` - 18 tests pour fonctions pures
  - Validation doctor (7 tests)
  - Validation patient (6 tests)
  - Validation appointment (5 tests)

#### **Tests d'intégration** (tests/integration/)
- ✅ `doctors.test.js` - 12 tests API complète
- ✅ `patients.test.js` - 11 tests API complète
- ✅ `appointments.test.js` - 10 tests API complète
- ✅ **Total: 51 tests**

### 5. **Configuration**
- ✅ `vitest.config.js` - Configuration avec coverage à 80%
- ✅ `tests/setup.js` - Setup/teardown automatique
- ✅ `package.json` - Scripts mis à jour
  - `pnpm test` - Lance les tests avec coverage
  - `pnpm test:watch` - Mode watch
  - `pnpm test:ui` - Interface visuelle

### 6. **Documentation**
- ✅ README.md mis à jour avec Lab 7
- ✅ Structure de projet actualisée
- ✅ Technologies mises à jour

## ⚠️ Configuration requise avant de tester

### 1. Créer le fichier `.env`

Vous devez créer un fichier `.env` à la racine du projet avec votre connexion MongoDB Atlas :

\`\`\`bash
cp .env.example .env
\`\`\`

Puis éditez `.env` et ajoutez votre URI MongoDB:

\`\`\`env
MONGODB_URI=mongodb+srv://votre-username:votre-password@cluster.mongodb.net/healthcare?retryWrites=true&w=majority
\`\`\`

**Note:** Vous pouvez aussi créer `.env.aurel` qui sera prioritaire.

### 2. Tester l'implémentation

Une fois le `.env` configuré:

\`\`\`bash
# Tester le seed de la base de données
pnpm seed

# Lancer le serveur en mode dev
pnpm dev

# Lancer tous les tests
pnpm test

# Lancer les tests en mode watch
pnpm test:watch

# Ouvrir l'UI de test
pnpm test:ui
\`\`\`

## 📊 Résultat attendu des tests

Avec une connexion MongoDB valide, vous devriez voir:

\`\`\`
✓ tests/unit/validation.test.js (18 tests)
✓ tests/integration/doctors.test.js (12 tests)
✓ tests/integration/patients.test.js (11 tests)
✓ tests/integration/appointments.test.js (10 tests)

Tests: 51 passed (51)
Coverage: > 80% sur lines, functions, branches, statements
\`\`\`

## 🎯 Points clés du Lab 7 implémentés

### Mongoose Features
- [x] Schemas avec validation
- [x] Timestamps automatiques
- [x] References entre collections (doctorId, patientId)
- [x] Virtual properties (isMinor)
- [x] Query helpers (active())
- [x] Instance methods (deactivate(), populateDetails())
- [x] Indexes (unique constraint sur appointments)
- [x] Middleware potentiel (hooks)

### Architecture MVC
- [x] **Model** - Schémas et logique de données
- [x] **Controller** - Logique métier séparée
- [x] **Routes** - Mapping HTTP uniquement
- [x] Séparation claire des responsabilités

### Tests avec Vitest
- [x] Tests unitaires (fonctions pures)
- [x] Tests d'intégration (API complète)
- [x] Setup/teardown automatique
- [x] Nettoyage de DB avant chaque test
- [x] Coverage configuré à 80%

## 🔄 Comparaison Avant/Après

### Avant (Lab 6 - Driver MongoDB natif)
\`\`\`javascript
// Dans routes/doctors.js
router.get("/", async (req, res) => {
  const db = getDB();
  const doctors = await db.collection("doctors").find({}).toArray();
  res.json(doctors);
});
\`\`\`

### Après (Lab 7 - Mongoose + MVC)
\`\`\`javascript
// Modèle (src/models/doctor.model.js)
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true }
});

// Contrôleur (src/controllers/doctor.controller.js)
export async function listDoctors(req, res, next) {
  const doctors = await Doctor.find().lean();
  res.status(200).json(doctors);
}

// Route (src/routes/doctors.js)
router.get("/", listDoctors);
\`\`\`

## 🚀 Prochaines étapes (après Lab 7)

1. Tester l'API avec Bruno/Postman
2. Vérifier le coverage de tests (doit être ≥ 80%)
3. Commiter les changements avec un message approprié
4. Créer une Pull Request
5. S'assurer que la CI passe

## 📝 Fichiers créés/modifiés

### Créés (18 fichiers)
- src/models/doctor.model.js
- src/models/patient.model.js
- src/models/appointment.model.js
- src/controllers/doctor.controller.js
- src/controllers/patient.controller.js
- src/controllers/appointment.controller.js
- src/routes/doctors.js (refactorisé)
- src/routes/patients.js (refactorisé)
- src/routes/appointments.js (refactorisé)
- src/utils/validation.js
- tests/setup.js
- tests/unit/validation.test.js
- tests/integration/doctors.test.js
- tests/integration/patients.test.js
- tests/integration/appointments.test.js
- vitest.config.js
- LAB7_SUMMARY.md (ce fichier)

### Modifiés (5 fichiers)
- src/db.js (Mongoose au lieu de MongoDB natif)
- src/app.js (imports mis à jour)
- seed.js (utilise modèles Mongoose)
- package.json (scripts Vitest)
- README.md (documentation Lab 7)

## ✨ Améliorations apportées

1. **Validation automatique** via schémas Mongoose
2. **Relations typées** entre entités
3. **Code plus maintenable** avec MVC
4. **Tests plus robustes** avec setup/teardown
5. **Meilleure séparation** des responsabilités
6. **Type safety** améliorée avec Mongoose

---

**Créé le:** 2025-12-01
**Lab:** SED Lab 7 - Mongoose & MVC Architecture
**Status:** ✅ Implémentation complète - Nécessite configuration .env pour tests
