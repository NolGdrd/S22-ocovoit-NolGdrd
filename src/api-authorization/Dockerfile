# Utilise une image de base officielle de Node.js version 20 sur Alpine Linux
FROM node:20-alpine

# Crée un répertoire '/app' dans l'image Docker
RUN mkdir -p /app

# Définit '/app' comme répertoire de travail pour les commandes suivantes executes dans l'image
WORKDIR /app

# Indique que le conteneur écoute sur le port 3000 au runtime
EXPOSE 3000 

# Définit la commande par défaut pour exécuter quand un conteneur est lancé à partir de cette image
CMD ["npm", "run", "dev"]