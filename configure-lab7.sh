#!/bin/bash

# Lab 7 - Script de configuration rapide

echo "🚀 Configuration du Lab 7 - Mongoose & MVC"
echo "=========================================="
echo ""

# Vérifier si .env existe
if [ ! -f .env ] && [ ! -f .env.aurel ]; then
    echo "⚠️  Aucun fichier .env trouvé!"
    echo ""
    echo "Veuillez créer un fichier .env avec votre MongoDB URI:"
    echo ""
    echo "  1. Copiez le fichier exemple:"
    echo "     cp .env.example .env"
    echo ""
    echo "  2. Éditez .env et remplacez l'URI par votre connexion MongoDB Atlas:"
    echo "     MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/healthcare"
    echo ""
    echo "  3. Relancez ce script:"
    echo "     ./configure-lab7.sh"
    echo ""
    exit 1
fi

echo "✅ Fichier .env trouvé"
echo ""

# Vérifier la connexion
echo "📡 Test de connexion à MongoDB..."
echo ""

# Essayer de lancer le seed
pnpm seed

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Connexion MongoDB réussie!"
    echo ""
    echo "🎯 Prochaines étapes:"
    echo ""
    echo "  1. Lancer les tests:"
    echo "     pnpm test"
    echo ""
    echo "  2. Lancer le serveur en mode dev:"
    echo "     pnpm dev"
    echo ""
    echo "  3. Tester l'API avec Bruno ou Postman"
    echo "     http://localhost:3000/api/doctors"
    echo ""
    echo "  4. Voir l'interface de test:"
    echo "     pnpm test:ui"
    echo ""
else
    echo ""
    echo "❌ Erreur de connexion MongoDB"
    echo ""
    echo "Vérifiez votre MONGODB_URI dans le fichier .env"
    echo ""
    exit 1
fi
