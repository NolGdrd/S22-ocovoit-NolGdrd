# Cahier des charges fonctionnel

Ceci est un appel d'offre. Nous ferons notre choix en fonction de la qualité et non de la quantité. Cependant, le cahier des charges fonctionnel est détaillé pour avoir une vue sur la direction du projet.

**O-Covoit** est une plateforme de covoiturage qui permet de mettre en relation des conducteurs et des passagers pour des trajets courts ou longs. Basée sur une intelligence artificielle, elle permet de trouver les meilleurs trajet pour chaque utilisateur, et inversement, trouver le max de passagers pour chaque conducteur. Les algorithmes de l'IA seront hautement personnalisables pour chaque utilisateur.

## Contraintes et spécifications

- Forte scalabilité possible : l'application doit être capable de gérer un grand nombre d'utilisateurs et d'être hébergée sur plusieurs serveurs
- Sécurité avancée : l'application devra gérer plusieurs types d'utilisateurs avec des droits différents
- API documentée : des services externes pourront utiliser l'API de l'application
- Fiabilité des évolutions : l'application devra être facilement maintenable et évolutive en gardant une qualité irréprochable
- Volumétrie des données : l'application devra pouvoir gérer un grand nombre de données
- Temps réel : réception des données, telles que l'emplacement des utilisateurs, en temps réel sur l'application
- Notifications : envoi de notifications en cas de réservation, nouveau trajet, etc.
- Conteneurisation : l'application devra être conteneurisée pour faciliter le déploiement
- Stack technique : la seule contrainte est le TypeScript. Le reste est à votre convenance.

## Fonctionnalités

Pour ne pas rendre public notre concept novateur, nous avons décidé de ne pas détailler les fonctionnalités de l'application. Cependant, nous avons listé les fonctionnalités classiques qui devront être présentes.

- Inscription et connexion
- Création et modification de trajets
- Recherche de trajets
- Gestion des réservations
- Gestion des avis

Une attention particulière sera portée sur les rôles d'un utilisateur. En effet, un utilisateur peut être à la fois conducteur et passager. Il peut également être administrateur de l'application.

Le front n'est pas à développer, mais il faudra tout de même le conteneuriser avec un template Vite.

### Proposition

**TODO** : à remplir lors de la phase de conception, suivant les attendus. Pas de formatage particulier.

#### Architecture

#### UMLs

#### Plan de tests
