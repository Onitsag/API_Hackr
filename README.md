Voici une mise à jour du README détaillant chaque route de l'API HackR et ses fonctionnalités, en prenant en compte les captures d'écran :

---

# 🚀 **API HackR**

Bienvenue dans le projet **API HackR** ! Une API Node.js moderne et robuste offrant divers outils de hacking simulé. Avec gestion des utilisateurs, des permissions, et une documentation Swagger intégrée. 🌐💻

---

## 🌟 **Fonctionnalités et Routes**

### **Auth** 🔒

Ces routes gèrent l'inscription, la connexion et la gestion des utilisateurs :

- **`POST /api/auth/register`** : Inscription d'un nouvel utilisateur. Nécessite un nom d'utilisateur, un mot de passe et, éventuellement, un rôle (par défaut : utilisateur).
- **`POST /api/auth/login`** : Connexion d'un utilisateur avec nom d'utilisateur et mot de passe. Renvoie un token JWT.
- **`GET /api/auth/protected`** : Accès à une route protégée (uniquement pour utilisateurs authentifiés).
- **`GET /api/auth/admin`** : Accès réservé aux administrateurs.
- **`PUT /api/auth/update-permissions/{userId}`** : Mise à jour des permissions d'un utilisateur spécifique. Nécessite un compte administrateur.

---

### **Features** 🛠️

Explorez les outils inclus dans l'API HackR :

- **`GET /api/features/generate-password`** : Génère un mot de passe sécurisé aléatoire.
- **`POST /api/features/verify-email`** : Vérifie si une adresse e-mail existe.
- **`POST /api/features/send-emails`** : Permet d'envoyer des e-mails multiples avec contenu personnalisé.
- **`POST /api/features/phishing`** : Crée une page de phishing simulée, générée dynamiquement avec GPT.
- **`POST /api/features/osint`** : Exécute un processus OSINT complet pour obtenir des informations sur une personne (longue requête).
- **`POST /api/features/check-password`** : Vérifie si un mot de passe est dans la liste des 10 000 mots de passe les plus courants.
- **`POST /api/features/domain-info`** : Récupère tous les domaines et sous-domaines associés à un nom de domaine donné.
- **`GET /api/features/fake-identity`** : Génère une identité fictive avec photo et page HTML.
- **`GET /api/features/generate-secure-password`** : Génère un mot de passe très sécurisé.
- **`POST /api/features/ddos`** : Simule une attaque DDoS avec des requêtes ping (simulation uniquement).
- **`GET /api/features/random-image`** : Génère une image aléatoire et la sauvegarde.

---

### **Logs** 📋

Ces routes permettent aux administrateurs de suivre l'activité de l'API :

- **`GET /api/features/logs`** : Obtenir les dernières actions réalisées (admin uniquement).
- **`GET /api/features/logs/user/{userId}`** : Obtenir les dernières actions d'un utilisateur spécifique (admin uniquement).
- **`GET /api/features/logs/action`** : Obtenir les dernières actions d'une fonctionnalité spécifique (admin uniquement).

---

## ⚙️ **Installation**

### 1️⃣ Cloner le projet

```bash
git clone <URL_DU_DEPOT>
cd API_HACKR
```

### 2️⃣ Configurer l'environnement

Créez un fichier `.env` à la racine avec les informations nécessaires (voir fichier envoyé sur Teams)

### 3️⃣ Installer les dépendances

```bash
npm install
```

### 4️⃣ Importer la base de données 🗂️

Importez la BDD sur PhpMyAdmin grâce au fichier `api_hackr.sql` du repo.

### 5️⃣ Démarrer le serveur 🚀

```bash
npm start
```

L'API sera accessible sur [http://localhost:5000](http://localhost:5000). 🎉

Vous pouvez réaliser des tests sur Postman grâce à la collection `API Hackr.postman_collection` présente dans le repo.

---

## 📚 **Documentation**

Accédez à la documentation Swagger interactive :

📄 **Lien** : [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---