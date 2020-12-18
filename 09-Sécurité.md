# Sécurité

## Règles générales

Les documents publiés par l'Agence Nationale de la Sécurité des Système d'Information (https://www.ssi.gouv.fr/uploads/IMG/pdf/NP_Securite_Web_NoteTech.pdf) ou la communauté OWASP (https://owasp.org/www-project-application-security-verification-standard/) fournissent des ensembles de règles que nous nous efforçons de garder à l'esprit lors des phases de conception de nos applications.

Nous utilisons les analyses Sonarqube pour repérer les éventuels problèmes de sécurité dans le code que nous produisons. Les règles appliquées pour le langage Java sont disponibles ici : https://rules.sonarsource.com/java
Nos projets dont les dépôts sont sur Github sont analysés via Sonarcloud.

La CNIL fournit un guide de bonnes pratiques : https://github.com/LINCnil/Guide-RGPD-du-developpeur/blob/master/06-S%C3%A9curiser%20vos%20sites%20web%2C%20vos%20applications%20et%20vos%20serveurs.md

## Gestion des authentifications

Pour la sécurisation de nos applications Java, nous utilisons systématiquement le framework Spring Security pour les nouveaux développements.
Comme pour les autres éléments du framework Spring, il existe différents niveaux d'implémentation, de la plus standardisée à la plus personnalisée.
Le framework permet de gérer à la fois : 

* l'authentification (qui consiste à prouver l'identité d'un utilisateur). L'authentification est également mise en place à l'aide de tokens JWT.
* l'autorisation (gérer les droits des utilisateurs sur les services). 

## Mot de passe oublié

Lorsque nous devons implémenter un circuit de récupération de mot de passe, nous suivons ce modèle : 
* proposer un formulaire de login avec lien "mot de passe oublié". Cette page permet de saisir une adresse mail.
* Un lien est envoyé à cette adresse mail, ce lien est valable une journée au maximum. 
* Lorsque l'utilisateur clique sur le lien, il arrive sur une page protégée qui permet de choisir un nouveau mot de passe.
* Le mot de passe est mis à jour.

## Règles relatives à la définition des mots de passe

Les mots de passe doivent respecter des règles relatives à la complexité : longueur, mélange de caractères etc. Les vérifications de mots de passe doivent avoir lieu aussi bien côté client que serveur.
Les règles suivantes : 
* au moins 8 caractères, 
* au moins une majuscule, 
* au moins un chiffre
* au moins un caractère spécial (!@#$%&*())

peuvent être vérifiées par cette expression régulière : "(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}"
Les mots de passe doivent obligatoirement être stockés encryptés : nous utilisons BCrypt.

## Blocage après un certain nombre de tentatives de connexion

Il faut ajouter un système pour bloquer momentanément le compte au-delà d'un certain nombre de tentatives de connexions infructueuses (il faut par exemple se prémunir contre les attaques de type "brute force" qui consiste à essayer de trouver un mot de passe en faisant de multiples tentatives). Nous implémentons ce type de protection dans le code.

## Analyse dependabot

Dependabot est un outil qui analyse les vulnérabilités des dépendances utilisées par nos codes sources. Lorsque une faille est découverte, dependabot propose une pull request avec la montée en version de la dépendance. L'activation de dependabot se configure via l'onglet Security. L'outil analyse la branche master. Voici la procédure à suivre lorsqu'une PR est proposée : 

* Récupérer en local la branche avec la montée de version proposée par depenbdabot et tester si l'application fonctionne avec la nouvelle version. Pour le code VueJS, il faut lancer les commandes "npm install" (pour récuperer les dependances) puis "npm run serve" pour vérifier l'application.
* Si aucun problème n'est détecté, il faut merger la branche sur master. On reporte ensuite master sur develop.

## Sécurisation d'un formulaire web anonyme (par Captcha)

Les formulaires web pouvant être renseignés anonymement sont exposés aux robots spammeurs qui trainent sur le web public.

Généralement ces robots ne vont pas tout de suite trouver comment publier du spam sur le formulaire en question, il leur faudra un certain temps avant de le repérer. Les formulaires web générés par des plateformes ou framework comme par exemple Wordpress ou Drupal sont repérés beaucoup plus rapidement par ces robots du fait de la popularité de ces plateformes.

La mise en place d'un Captcha est une protection efficace. L'utilisation du système [reCaptcha](https://www.google.com/recaptcha/about/) est préconisé de manière à obtenir une uniformisation de l'expérience utilisateur sur les sites web produits par l'Abes (démarche UX). A noter que le compte commun Abes (applications.abes) est à utiliser pour administrer l'ensemble des instances de reCaptcha.

Plusieurs sites de l'Abes implémentent un Captcha dont voici un recensement :

- Theses.fr dans la section "signaler une erreur" (reCaptcha) : https://www.theses.fr/feedbacktheses.jsp?origine=2005PA05S018&lng=fr&ppn_origine=026404788&appli_origine=Sudoc
- IdRef dans la section "signaler une erreur" (reCaptcha) : https://www.idref.fr/assistance.jsp?ppn=139753753&titre=Dacos,%20Marin%20(1971-....)
- Licences Nationales pour la création de compte (reCaptcha) : https://acces.licencesnationales.fr/creation-compte
- Calames (système ad-hoc qui serait à modifier en reCaptcha) : http://www.calames.abes.fr/pub/ssl/Reg.aspx
