# MongoDB - Guide d'implémentation

## Où MongoDB est utilisé

MongoDB est implémenté dans les fichiers suivants :

- **`src/db.js`** - Gère la connexion à MongoDB (initialisation, récupération de la base de données)
- **`routes/doctors.js`** - Opérations CRUD pour les médecins
- **`routes/patients.js`** - Opérations CRUD pour les patients
- **`routes/appointments.js`** - Opérations CRUD pour les rendez-vous
- **`src/server.js`** - Initialise la connexion avant de démarrer le serveur

## Comment utiliser votre propre instance MongoDB

### 1. Obtenir votre URI de connexion
Allez sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) et créez un cluster. Récupérez votre URI de connexion.

### 2. Modifier `src/db.js`
Remplacez l'URI existant à la ligne 3 :
```javascript
const uri = "votre_nouvelle_uri_mongodb";
```

### 3. C'est tout !
Les routes utiliseront automatiquement votre instance MongoDB à la place de celle par défaut.

## Commandes utiles

```bash
npm run dev      # Démarrer le serveur en mode développement
npm run seed     # Remplir la base de données avec des données d'exemple
npm test         # Lancer les tests
```

## Remarques
- Ne commitez pas votre URI MongoDB directement dans le code
- Utilisez des variables d'environnement (`.env`) pour les données sensibles
