# Architecture MVC - Lab 7

## Vue d'ensemble de l'architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT                               │
│                    (Bruno / Postman)                         │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP Requests
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                      ROUTES LAYER                            │
│                   (src/routes/*.js)                          │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   doctors    │  │   patients   │  │ appointments │      │
│  │  (GET/POST   │  │  (GET/POST   │  │  (GET/POST   │      │
│  │   PUT/DEL)   │  │   PUT/DEL)   │  │   PUT/DEL)   │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
└─────────┼──────────────────┼──────────────────┼─────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    CONTROLLERS LAYER                         │
│                 (src/controllers/*.js)                       │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Doctor     │  │   Patient    │  │ Appointment  │      │
│  │ Controller   │  │ Controller   │  │ Controller   │      │
│  │              │  │              │  │              │      │
│  │ - listAll    │  │ - listAll    │  │ - listAll    │      │
│  │ - getById    │  │ - getById    │  │ - getById    │      │
│  │ - create     │  │ - create     │  │ - create     │      │
│  │ - update     │  │ - update     │  │ - update     │      │
│  │ - delete     │  │ - delete     │  │ - delete     │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
└─────────┼──────────────────┼──────────────────┼─────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                      MODELS LAYER                            │
│                   (src/models/*.js)                          │
│                    (Mongoose Schemas)                        │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Doctor Model │  │Patient Model │  │Appointment   │      │
│  │              │  │              │  │   Model      │      │
│  │ Schema:      │  │ Schema:      │  │ Schema:      │      │
│  │ - name       │  │ - name       │  │ - doctorId   │      │
│  │ - specialty  │  │ - age        │  │ - patientId  │      │
│  │ - active     │  │ - active     │  │ - date       │      │
│  │ - timestamps │  │ - timestamps │  │ - time       │      │
│  │              │  │              │  │ - status     │      │
│  │ Methods:     │  │ Virtuals:    │  │ - timestamps │      │
│  │ .deactivate()│  │ .isMinor     │  │              │      │
│  │              │  │              │  │ Methods:     │      │
│  │ Queries:     │  │ Queries:     │  │.populateDetails()   │
│  │ .active()    │  │ .active()    │  │              │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
└─────────┼──────────────────┼──────────────────┼─────────────┘
          │                  │                  │
          └──────────────────┴──────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                     DATABASE LAYER                           │
│                      (src/db.js)                             │
│                   Mongoose Connection                        │
│                                                               │
│              ┌────────────────────────┐                      │
│              │   MongoDB Connection   │                      │
│              │   with Mongoose ODM    │                      │
│              └───────────┬────────────┘                      │
└──────────────────────────┼──────────────────────────────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │  MongoDB Atlas  │
                  │    (Cloud DB)   │
                  └─────────────────┘
```

## Flux de données - Exemple: Créer un doctor

```
1. Client → POST /api/doctors { name: "Dr. Smith", specialty: "Surgery" }
   ↓
2. Route (doctors.js) → Appelle createDoctor()
   ↓
3. Controller (doctor.controller.js) → Validation & Logique métier
   ↓
4. Model (Doctor) → Mongoose valide le schéma & sauvegarde
   ↓
5. MongoDB Atlas → Stocke le document
   ↓
6. Response ← { _id: "...", name: "Dr. Smith", specialty: "Surgery", ... }
```

## Séparation des responsabilités (MVC)

### 📋 MODEL (src/models/)
- **Responsabilité**: Structure de données et validation
- **Contient**:
  - Schémas Mongoose
  - Validation des champs
  - Relations entre entités
  - Methods & virtuals
  - Query helpers
- **N'a PAS**: Logique HTTP, routes, requêtes/réponses

### 🎮 CONTROLLER (src/controllers/)
- **Responsabilité**: Logique métier
- **Contient**:
  - Traitement des requêtes
  - Validation business logic
  - Appels aux modèles
  - Gestion des erreurs
  - Formatage des réponses
- **N'a PAS**: Définition de routes, schémas de données

### 🛣️ ROUTES (src/routes/)
- **Responsabilité**: Mapping HTTP → Controllers
- **Contient**:
  - Définition des endpoints
  - Méthodes HTTP (GET/POST/PUT/DELETE)
  - Appels aux contrôleurs
- **N'a PAS**: Logique métier, accès direct à la DB

## Avantages de cette architecture

### ✅ Maintenabilité
- Code organisé et facile à naviguer
- Chaque fichier a une responsabilité claire
- Modifications isolées (un changement = un fichier)

### ✅ Testabilité
- Controllers testables unitairement
- Models avec validation automatique
- Routes simples, peu de logique à tester

### ✅ Réutilisabilité
- Controllers réutilisables (Web, Mobile API, etc.)
- Models partagés entre différentes routes
- Logique centralisée

### ✅ Scalabilité
- Facile d'ajouter de nouveaux endpoints
- Structure claire pour de nouveaux développeurs
- Séparation permet le travail en équipe

## Comparaison Lab 6 vs Lab 7

### Lab 6 (MongoDB Driver natif)
```javascript
// Tout dans le fichier route
router.post("/", async (req, res) => {
  const { name, specialty } = req.body;
  if (!name || !specialty) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const db = getDB();
  const result = await db.collection("doctors").insertOne({
    name,
    specialty
  });
  res.status(201).json({ _id: result.insertedId, name, specialty });
});
```

### Lab 7 (Mongoose + MVC)
```javascript
// Model (doctor.model.js)
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true }
});

// Controller (doctor.controller.js)
export async function createDoctor(req, res, next) {
  const { name, specialty } = req.body;
  if (!name || !specialty) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const doctor = await Doctor.create({ name, specialty });
  res.status(201).json(doctor);
}

// Route (doctors.js)
router.post("/", createDoctor);
```

**Avantages**:
- ✅ Validation automatique par Mongoose
- ✅ Code séparé et organisé
- ✅ Typage fort avec schémas
- ✅ Middleware et hooks disponibles
- ✅ Relations entre entités gérées
