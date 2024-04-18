# Documentation

La documentation d’un logiciel est indispensable car elle permet de :

* donner une vue d'ensemble de l'intérêt et de l'usage d’un logiciel
* reprendre plus aisément le code développé par un autre programmeur
* retrouver plus facilement comment le logiciel a été structuré
* partager le logiciel avec d’autres programmeurs : ce point est essentiel lors de la publication d’une API

On distingue trois types de documentation :

* __La documentation à l’usage des utilisateurs__
* __La documentation à l'usage des développeurs__
* __La documentation à l'usage des administrateurs__

# __La documentation à l’usage des utilisateurs__

* Elle explique comment prendre en main l'application. On y retrouve la description des fonctionnalités, des interfaces... exemple : http://documentation.abes.fr/aidestar/accueil/

* Les nouvelles applications développées à l'Abes privilégient une architecture qui sépare la partie interface utilisateur de la partie serveur qui peut être interrogée indépendamment. Cette partie serveur API est documentée au format openAPI qui décrit chaque service. Cette documentation s'adresse donc plutôt aux développeurs qui veulent utiliser l'API.

https://swagger.io/docs/specification/about/ décrit la spécification openAPI. Des outils permettent de générer automatiquement du code client à partir de cette description. Elle est accessible sous format brut (ex : https://item.sudoc.fr/api/v2/api-docs) ou via une présentation en html.

# __La documentation à l'usage des développeurs__

Nous identifions le besoin de deux types de documentation :

## Une documentation décrivant l’architecture et la conception

Il ne s’agit pas de décrire de manière exhaustive et systématique chaque détail de l'application, mais plutôt de __donner une vue d'ensemble, de décrire les éléments indispensables à la compréhension de la structure de l’application__. Nous pouvons éventuellement utiliser le formalisme UML et ses principaux type de diagrammes. Les diagrammes UML peuvent être générés avec différents éditeurs, par exemple http://www.umlet.com.

* le diagramme de classes donne une vue statique des éléments
* le diagramme de séquence montre les interactions entre les objets
* le diagramme de déploiement situe l’application dans son contexte
* un diagramme des flux entrants et sortants permet de décrire la communication et les dépendances de l’application

Cette documentation doit être rédigée en adoptant le point de vue d'un(e) nouveau(velle) développeur(se) à qui l'on veut fournir le niveau d'information minimal essentiel pour lui permettre d'aborder le projet.

__Ces informations liées à la structure de l'application doivent être consignées dans un fichier README-dev.md. présent à la racine du dépôt.__

* il faut aussi inclure les informations jugées utiles pour faciliter la prise en main de l'application par un nouveau développeur :
  * l’adresse du dépôt Github ou Gitlab
  * les éléments de configuration
  * les projets associés à l'application

__Ces méta-informations doivent être consignées dans un fichier README.md. présent à la racine du dépôt.__

Des fichiers README-xxx.md supplémentaires peuvent être ajoutés si nécessaire, par exemple un README-faq.md peut recenser les questions relatives à l'application.

## Une documentation technique

Nous utilisons la Javadoc pour documenter le code Java. Les blocs sont rédigés et ajoutés en en-tête de chaque classe et méthode de l’application. Il faut décrire ce que fait la méthode, quels sont les paramètres en entrée et en sortie et quelles erreurs sont susceptibles d'être renvoyées.
Il faut aussi ajouter des commentaires dans le code lui-même lorsqu'ils sont nécessaires à la compréhension du traitement.

Pour le Javascript et le PL/SQL, les commentaires sont actuellement inclus dans le code.

# __La documentation à l'usage des administrateurs__

Pour certaines applications, des tâches de maintenance doivent être réalisées régulièrement (mise à jour de données par exemple). L'exécution de ces tâches peut prendre la forme de lancement de traitements via une interface utilisateur ou via des outils accessibles en lignes de commande. Ces tâches doivent être décrites ainsi que leur mode d'exécution.
