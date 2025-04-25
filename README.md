# Système de Gestion de Bibliothèque

Une application web pour gérer les livres, les étudiants et les emprunts dans une bibliothèque.

## Fonctionnalités

- Gestion des étudiants
- Gestion des livres
- Gestion des emprunts
- Interface utilisateur moderne et responsive

## Prérequis

- Node.js (v14 ou supérieur)
- MongoDB Atlas (ou MongoDB local)

## Installation

1. Clonez le dépôt
```
git clone <votre-repo-url>
cd livrables-app
```

2. Installez les dépendances
```
npm install
```

3. Configurez la connexion à la base de données
   - Modifiez la chaîne de connexion MongoDB dans `app.js` si nécessaire

4. Démarrez l'application
```
npm start
```

## Déploiement sur Azure

1. Créez un compte Azure si vous n'en avez pas déjà un

2. Installez Azure CLI
```
npm install -g azure-cli
```

3. Connectez-vous à Azure
```
az login
```

4. Créez une application web sur Azure
```
az webapp create --resource-group <votre-groupe-ressources> --plan <votre-plan> --name <votre-nom-app> --runtime "NODE:14-lts"
```

5. Configurez les variables d'environnement (si nécessaire)
```
az webapp config appsettings set --resource-group <votre-groupe-ressources> --name <votre-nom-app> --settings MONGODB_URI="votre-chaîne-de-connexion"
```

6. Déployez votre application
```
az webapp deployment source config-local-git --resource-group <votre-groupe-ressources> --name <votre-nom-app>
git remote add azure <url-git-azure>
git push azure master
```

## Licence

ISC 