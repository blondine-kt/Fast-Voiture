# Fast-Voiture


Fast Voiture est une application de commande de taxi, Ce module conducteur est specialement pour faciliter les transactions avec les passagers

Taches:
- Création d'une interface utilisateur web et mobile
 . Creation des screens avec React-Native
  > Page d'acceuil
     Terminée  
     Difficulté:
     ----------
       .Interface qui s'adapte à android, ios et web
       .Choix des couleurs neutre et non aggrésif
      Solution:
      ---------
       .Adapter le code
       .Verification de couleurs neutre dans le site https://www.rgbtohex.net/rgb/95-170-170 
   » Page d'inscription
     Terminée
     Difficulté:
     -----------
      . Ajout d'une image pour la reconnaissance faciale
      . L'utilisation de la validation yup avec typeScript
     Solution:
     ---------
      .L'image et la voix seront ajouter dans le profil de l'utilisateur 
       pour ajouter plus de sécurité à son compte
      .L'utilisation d'un fichier js pour faciliter l'utilisation de yup
   » Page de Connexion:
      Terminé
      Difficulté:
      -----------
       . Connexion avec la base de données et le serveur
       . Ajout de la recconnaissance faciale et vocale  

   » Page de Profil de l'utilisateur
      En Cours
      Difficulté:
      -----------
       . Outils de modification du profil
       . Ajout des routes pour l'adaptetion avec le module passager
       . Outils pour supprimer son compte
       . Outils de géolocalisation 

# Ameliorations:
- La documentation choisi pour cette interface expo dois etre d'au moins 6 mois du a la depreciation rapides des librairies de react-native.

# Ressource:
- https://docs.expo.dev/
- https://www.youtube.com/watch?v=KGzfBDtgjQo
- https://github.com/digitalinnovationone/trilha-react-native-expo-camera--capture-photo/blob/main/App.tsx
- https://medium.com/@svbala99/set-up-splash-screen-in-react-native-for-ios-and-android-2023-dbedb87fe75e
- https://github.com/react-navigation/react-navigation/blob/main/packages/react-native-drawer-layout/src/views/Drawer.native.tsx

# Sprinte 2

  # Taches
  - Page de Services
  - Page d'activité
  - Modification des information de l'utilisateur
  - Ajout de la geolocatisation, map view et navigation
  - Ajout de google maps api
  - Ajout de l'api de payment
  - Ajout de l'api de geolocalisation

  » Page de Services:
    En Cours
   - Permet de recuperer les requêtes du module passager, afin ajouter la navigation
   - Calcule la distance, le prix, et temps mis 
   Difficultés:
   -----------
    - Ajout du build pour acceder a la géolocalisation
    - Synchroniser la geolocalisation en temps-réel
    - Synchronisation des version google api et expo locations
   Solutions:
   ----------
    - Chaque librairie sont telecharger npx expo install pour que le module expo télécharge une version compatible a la sienne ainsi reduit les risques de bug
    - Creation du build android pour télécharger la version .apk de l'application
    - Creation de projet dans la plateforme google
    - Téléchargement des librairie map view et map directions
    

   » Modification des informations de l'utilisateur
      En Cours
      - Creation de la page pour modifier les infos de l'utilisateur
      - Creation de la page de modification du mot de passe
      - Synchronisation avec le serveur Fast Api
      Difficulté
      ----------
      - Recuperation des données utilisateur
      - Synchronistion des requetes entre le backend et le Front end
      Solution
      ---------
      - Creation du user context pour stocker le nom d'utilisateur
      - Lier les requetes avec le username

   » Ajout de la geolocatisation, map view et navigation
     En Cours
     - Ajout de google maps 
     - Ajout des identifiants du projet dans google maps console
     - Creation du build android et ajout de la restriction sha 1 
     Difficuluté
     ------------
     - Recuperation de la localisation en temps reel
     - Creation de l'api google maps pours retourner la latitude et longitude de l'adresse 

     Solution
     --------
     - Utilisation de la librarie expo-locations pour recuperer la localisation du chauffeur connecter
     - Creations d'une Microservice google pour geocoder l'adresse
     - Utilisation de mapsview pour visualiser la carte
     - Utilisation des markers pour verifier la localisation
     - Utilisation de mapdirections  pour faire la navigation



  » Page d'activité
    En Cours
    - Recuperation de l"historique du conducteur connecter
    - Historique des courses  et trajets
    - Historique des payments
    Difficulté
    ----------
     - Utilisation d'une base de donnée cloud pour sauvegarder les transaction



# Ressources
 https://docs.expo.dev/guides/using-firebase/
 https://docs.expo.dev/versions/latest/sdk/background-fetch/
 https://github.com/googlemaps/google-maps-services-python/blob/master/googlemaps/geocoding.py
 https://blog.spirokit.com/maps-in-react-native-a-step-by-step-guide
 https://dekings.medium.com/get-distance-and-duration-between-two-places-using-google-map-and-python-d299ef77ef6
    


   

    