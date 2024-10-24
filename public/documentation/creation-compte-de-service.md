
# ABC – Nos gestes climats
## Mise en place d’un compte de service

### Création d’un compte de service

1. Se rendre sur la page Console Google Cloud pour créer un compte de service :  
   [https://console.cloud.google.com/projectselector2/iam-admin/serviceaccounts?hl=fr&pli=1&supportedpurview=project](https://console.cloud.google.com/projectselector2/iam-admin/serviceaccounts?hl=fr&pli=1&supportedpurview=project)

2. Cliquer sur **Créer un projet** et renseigner les champs :  


3. Créer un compte de service :  

4. Cliquer sur l’email du compte de service, puis sur **Clés**  

5. Ajouter une clé puis **Créer une clé JSON**  

   Cela va télécharger un fichier JSON contenant toutes les informations nécessaires :

   ```json
   {
     "type": "service_account",
     "project_id": "nos-gestes-climats",
     "private_key_id": "XXXXXXX",
     "private_key": "XXXXX",
     "client_email": "XXX@XXX.gserviceaccount.com",
     "client_id": "XXX",
     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
     "token_uri": "https://oauth2.googleapis.com/token",
     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/compte-de-service%40nos-gestes-climats.iam.gserviceaccount.com",
     "universe_domain": "googleapis.com"
   }
### Application dans le projet

Dans le projet, remplir le fichier `.env` avec les variables ci-dessus.

**NB :** Pour des raisons de sécurité, la `private_key` doit être encodée en base64.

### Autorisation de la feuille de calcul

Une fois la feuille de calcul créée, rendez-vous dessus via le navigateur et cliquez sur **Partager** en haut à droite.

Ajoutez l'adresse email du compte de service.  
