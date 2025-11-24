# MongoDB - Guide d'implémentation

## Où MongoDB est utilisé

MongoDB est implémenté dans les fichiers suivants :

- **`src/db.js`** - Gère la connexion à MongoDB (initialisation, récupération de la base de données)
- **`routes/doctors.js`** - Opérations CRUD pour les médecins
- **`routes/patients.js`** - Opérations CRUD pour les patients
- **`routes/appointments.js`** - Opérations CRUD pour les rendez-vous
- **`src/server.js`** - Initialise la connexion avant de démarrer le serveur

## Configuration avec .env

La connexion MongoDB utilise une variable d'environnement pour sécuriser les identifiants.

### 1. Créer votre fichier `.env`
Copie le fichier `.env.example` et renomme-le en `.env` :
```bash
cp .env.example .env
```

### 2. Ajouter votre URI MongoDB
Modifie le fichier `.env` avec ton URI de connexion MongoDB Atlas :
```
MONGODB_URI=mongodb+srv://ton_user:ton_password@ton_cluster.mongodb.net/?appName=AppName
```

### 3. C'est tout !
L'application chargera automatiquement ton `.env` au démarrage.

## Obtenir votre propre URI MongoDB

1. Allez sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créez un cluster gratuit
3. Dans **"Database"** → **"Connect"**, copier votre URI
4. Collez-la dans votre `.env`

## Commandes utiles

```bash
npm run dev      # Démarrer le serveur en mode développement
npm run seed     # Remplir la base de données avec des données d'exemple
npm test         # Lancer les tests
```

## ⚠️ Sécurité

- **Ne commitez jamais votre `.env`** dans Git (il est ignoré par `.gitignore`)
- Partagez uniquement le fichier `.env.example` avec vos coéquipiers
- Chaque développeur doit créer son propre `.env` avec ses identifiants

