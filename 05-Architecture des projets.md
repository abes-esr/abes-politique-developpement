# Architecture des projets

## Dette technique

L’analyse des projets menés à l'ABES a permis de découvrir des structures de projets hétérogènes dépendant de plusieurs facteurs : IDE utilisé, plugins d’IDE, type de projet, expérience personnelle de l'agent dans le développement. Lors d'un transfert de responsabilité d'application vers un autre agent, ou lors de l'intervention d’un développeur sur le code de l’application, il était donc difficile de s'approprier le code en raison de ces aspects hétérogènes.

C'est pourquoi l'utilisation de frameworks spécifiques à chaque type de projet est maintenant préconisée.
 
## Types de projets

Nous pouvons classer nos projets / applications de la façon suivante : 

### Applications Web

Nous privilégions dorénavant systématiquement une architecture avec un fort découplage entre client et serveur : ceci permet une meilleure expérience utilisateur (le client s'exécute dans le navigateur) et donne la possibilité d'ajouter ou de remplacer facilement le client.
La partie serveur se traduit par une API qui est un ensemble de services web accessibles, versionnés et documentés.

Pour développer la partie cliente, nous avons choisi d'utiliser le framework VueJs.
Quant aux API, elles sont développées avec le framework Spring Boot et les différents composants Spring : web, security etc.

__Les services web sont sécurisés__
* l'authentification (sur LDAP, base de données, service web etc.) et une gestion via l'utilisation de token JWT
* l'autorisation: droits sur les services vérifiés par spring security

__Le versionning des API__

les API doivent être versionnées en utilisant la notation v1, v2 dans l'url. Ainsi, on peut mettre en ligne une nouvelle version d'une API (/v2) tout en préservant pour un temps donné la version en cours (/v1). 
La documentation est proposée via OpenAPI. Pour les projets Java Spring, la documentation peut être générée facilement via l'outil SpringFox: 

* ajouter la dépendance dans le pom.xml 
* ajouter les annotations sur les méthodes dans les interfaces @ApiOperation(value = "renvoie les demandeModifs pour les administrateurs", notes ="...")
* ajouter une classe SwaggerConfig



* Application J2EE / architecture MVC : certaines de nos applications ont été développées entièrement en Java, notamment la couche UI avec des frameworks comme JSF. Ces applications Java web sont en général structurées en couches (DAO pour l’accès à la base de données, métier, contrôleur, interface). 

### Application Batch

Ces applications permettent de réaliser des tâches côté serveur sans IHM. L'utilisation du framework Spring Batch est devenu notre standard.

Tous nos projets Java sont obligatoirement gérés via Maven.

## Configuration d'un projet

La première étape lorsque nous démarrons un projet est de créer un dépôt dans le gestionnaire de source : nos nouveaux projets étant par défaut open source, il s'agit d'un dépôt Github.
Puis nous créons ensuite les jobs de construction et de déploiement sur Jenkins.
L'application peut nécessiter la création d'autres services : indexation Solr ou ElasticSearch, bases de données relationnelles Oracle etc.
Pour les projets Java qui sont gérés avec Maven, le fichier pom.xml est configuré pour que notre Jenkins local puisse envoyer les artifacts (code compilé) sur notre Artifactory local. La balise scm doit être renseignée pour faciliter les release via Jenkins. L'encodage des fichiers est UTF-8.
* Le groupId doit être le même pour toutes les applications de l’Abes : fr.abes
* L'artifactId doit correspondre au nom de l’application. Les applications peuvent parfois être composée de plusieurs modules. Enfin, pour nos projets interne, les pom.xml peuvent dépendre du pom parent Abes. 

* Les fichiers de configuration dépendant de l’environnement d'exécution de l'application (contenant par exemple les chaines de connexion à la base de données qui sera différente si l’application est exécutée sur l’environnement de test, de développement ou de production) sont déposés dans le répertoire /resources. Un fichier par environnement d’exécution est présent et porte un nom spécifique à cet environnement suivant la convention Spring : 

* application-DEV.properties pour l’environnement de développement
* application-TEST.properties pour l’environnement de test
* application-PROD.properties pour l’environnement de production
* application.properties pour les éléments partagés par tous les environnements.

pour les dépôts Github, les fichiers de configuration ne sont pas versionnés avec le projet. Ils sont versionnés sur un dépôt interne et envoyés sur les environnements de déploiement au moment de l'exécution du job de déploiement.  

Les fichiers journaux de l’application doivent se situer dans un répertoire nomAppli/logs. Un fichier log4j.properties est fourni dans l’application pour déterminer la structure du fichier de log.

## Configuration d'un projet avec docker

Cette section est un **travail en cours** depuis début 2022 car la politique de développement évolue pour viser un packaging et un déploiement sur les environnements avec Docker à moyen terme.

### Configuration d'une application docker

Une application dockerisée respecte plusieurs règles :
- l'application possède un dépôt pour son code source et c'est ce même dépôt qui est chargé de générer et de publier son image docker.
  - ce dépôt contient le ``Dockerfile`` de l'application dont l'objectif est de produire l'image docker de l'application pour qu'elle soit ensuite prête à être exécutée (ex: sur [abes-hello-back](https://github.com/abes-esr/abes-hello-back/blob/develop/Dockerfile))
  - le ``Dockerfile`` de l'application execute également les tests de l'application ce qui permet d'éviter de produire une image docker embarquant un code qui ne fonctionne pas (exemple de paramétrage maven sur [abes-hello-back](https://github.com/abes-esr/abes-hello-back/blob/develop/Dockerfile#L27))
  - ce dépôt contient une github action souvent nommée ``build-test-pubtodockerhub.yml`` (ex: sur [abes-hello-front](https://github.com/abes-esr/abes-hello-front/blob/develop/.github/workflows/build-test-pubtodockerhub.yml)) permettant de construire l'image Docker et de la publier sur l'[espace abesesr sur dockerhub](https://hub.docker.com/orgs/abesesr).
  - ce dépôt contient une github action souvent nommée ``create-release.yml`` (ex: sur [abes-hello-front](https://github.com/abes-esr/abes-hello-front/blob/develop/.github/workflows/create-release.yml)) permettant de créer une nouvelle version/release de l'application
 - l'application peut générer plusieurs images docker, par exemple pour le front en vuejs (ex: [abes-hello-front](https://github.com/abes-esr/abes-hello-front/blob/develop/.github/workflows/build-test-pubtodockerhub.yml)), ou pour l'API en java Spring (ex: [abes-hello-back](https://github.com/abes-esr/abes-hello-front/blob/develop/.github/workflows/build-test-pubtodockerhub.yml)
 - l'application possède un dépôt dédiée à son déploiement avec docker/docker-compose. La règle de nommage de ce dépôt est de commencer par le nom de l'application et de terminer par le suffix ``-docker`` (ex: [abes-hello-docker](https://github.com/abes-esr/abes-hello-docker)). Il permet à n'importe qui sur le web de venir tester l'application sur son environnement local ou sur son serveur. Ce dépôt permet de faciliter la réutilisation et les contributions externes. Ce dépôt permet surtout de formaliser comment installer, démarrer, stopper l'application et il héberge ainsi la fiche d'exploitation de l'application.

### Configuration des logs des conteneurs dockers

Chaque application qui est "dockerisée" et qui produit des logs (c'est à dire toutes les applis ?), doit les produire de la même façon et indiquer au démon filebeat comment les récupérer pour qu'il puisse ensuite les envoyer correctement au puits de log (logstash / elasticsearch / kibana).

L'application doit respecter quelques règles :

1) produire ses logs à surveiller sur stdout et stderr
2) paramétrer filebeat avec des labels docker
3) produire ses logs personnalisées en respectant un format

#### stderr stdout

Pour que le conteneur de l'application produise ses logs sur stdout et stderr, il y a plusieurs possibilités.
  - Si c'est une application Java le mieux est d'exécuter le process java en premier plan (foreground). Exemple de point d'entrée docker exécutant l'appli java à partir d'un JAR en premier plan : ``ENTRYPOINT ["java","-jar","/app.jar"]``
  - Si c'est une script shell (exemple un batch), alors on logguer sur stdout ou stderr au choix en utilisant ``>/dev/stdout`` (par défaut si rien n'est précisé c'est sur stdout que ça va) ou ``>/dev/stderr`` pour logguer les erreurs. Exemple :
    ```bash
    echo "INFO: ma ligne de log pour aller sur stdout" >/dev/stdout
    echo "ERROR: ma ligne de log pour aller sur stderr" >/dev/stderr
    ```
  - Si c'est une application tierce qu'on ne peut donc pas trop modifier et qui loggue déjà dans un fichier, alors on peut soit configurer l'application pour lui demander de logguer les erreurs sur le fichier ``/proc/self/fd/2`` (c'est la même chose que le fichier ``/dev/stderr``) sur le fichier ``/proc/self/fd/1`` (ou au choix ``/dev/stdout``), soit identifier le chemin du fichier vers lequel l'application va logguer et s'en sortir avec un système de lien symbolique comme par exemple ce que l'image docker officielle de nginx fait : cf son [Dockerfile](https://github.com/nginxinc/docker-nginx/blob/8921999083def7ba43a06fabd5f80e4406651353/mainline/jessie/Dockerfile#L21-L23).
  
#### paramètres pour filebeat - labels docker

Le paramétrage de la remontée des logs dans filebeat se fait au niveau de chaque conteneur en suivant une nomenclature de "labels docker" (cf [recommandations](https://www.elastic.co/guide/en/beats/filebeat/current/running-on-docker.html#_customize_your_configuration)).

La configuration la plus simple est de seulement signaler à filebeat que les logs du conteneur sont à prendre en compte en indiquant aucun format de log. Pour cela il est nécessaire d'ajouter les labels suivant au conteneur. Voici un extrait à copier coller dans un `docker-compose.yml` qui montre comment signaler à filebeat de prendre les logs en compte :
```
    labels:
      - "co.elastic.logs/enabled=true"
      - "co.elastic.logs/processors.add_fields.target="
      - "co.elastic.logs/processors.add_fields.fields.abes_appli=monapplication"
      - "co.elastic.logs/processors.add_fields.fields.abes_middleware=httpd"
```

Les labels ont la signification suivante :
- `co.elastic.logs/enabled=true` : signifie qu'on souhaite que filebeat remonte les logs de ce conteneur (par défault c'est `false`)
- `co.elastic.logs/processors.add_fields.target=` : signifie qu'on souhaite ajouter les deux champs `abes_appli` et `abes_middleware` dans le puits de logs en rateau à la racine des champs (cf [la doc](https://www.elastic.co/guide/en/beats/filebeat/current/add-fields.html#add-fields))
- `co.elastic.logs/processors.add_fields.fields.abes_appli=monapplication` : signifie qu'on souhaite faire remonter un champs personnalisé nommé "abes_appli" qui contiendra comme valeur "monapplication" pour le conteneur présent. Ce champ "abes_appli" est obligatoire, il doit contenir le nom de l'application car cette dernière peut être éclatée en plusieurs conteneurs (un pour le web, un pour le back, un pour les batch etc ...), c'est ce champ qui permet de regrouper tous les conteneur d'une même application au niveau du puits de logs. Remarque : dans une architecture de type orchestrateur (ex: OKD), c'est probablement le nom du pod qui remplacera la valeur de "abes_appli".
- `co.elastic.logs/processors.add_fields.fields.abes_middleware=Httpd` : le champs "abes_middleware" est obligatoire, il permet d'indiquer au puits de logs de l'Abes (via logstash précisément) la nature des logs envoyées et donc dans quel index elasticsearch doit il classer ces logs. Les valeurs possibles sont : "adhoc", "Httpd" (mettre "adhoc" si ce sont des logs dont le format est spécifique à l'application).

Pour un exemple complet qui montre aussi comment spécifier un format de log précis, on peut se référer à https://github.com/abes-esr/abes-filebeat-docker/blob/f4b19dfdccab690801c550c61724bd09cbeb6f5b/docker-compose.yml#L24-L37

On trouve alors d'autres labels dont voici la signification :
- `co.elastic.logs/module=nginx` : signifie qu'on dit à filebeat que ce conteneur produit des logs au format nginx ce qui lui permettra de les envoyées découpées dans le puits de logs (cf la liste des [modules filebeat disponibles](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-modules.html))
- `co.elastic.logs/fileset.stdout=access` : signifie que filebeat doit surveiller les logs stdout du conteneur
- `co.elastic.logs/fileset.stderr=error` : signifie que filebeat doit surveiller les logs stderr du conteneur

#### format pour les log personnalisées

TODO expliquer ici que les appli java/métier doivent produire des logs spécifique en respectant certaines règles, lister les règles, donner des exemple de configuration de log4j etc ...


## Bonnes pratiques de programmation

En termes d'architecture, nous cherchons à privilégier : 

* la programmation avec des interfaces et non des implémentations
* l'inversion de contrôle pour réduire le couplage entre classes
* l'utilisation des design patterns reconnus (tout en prenant soin d'éviter l'écueil de la sur-utilisation)

Concernant plus spécifiquement la notion d’informatique et liberté, on peut dégager les bonnes pratiques suivantes : 

* Ne pas effectuer de développements ni de tests sur les environnements de production. 
* Ne pas effectuer de tests sur des données personnelles réelles et utiliser des techniques d’anonymisation.
* Prévoir une gestion rigoureuse des habilitations et droits d’accès sur les applications.
* Prévoir en préalable à la mise en production d’une application la durée de conservation de tous les comptes utilisateurs et administrateurs.
* Ne pas partager les comptes administrateurs entre plusieurs personnes.
* Sécuriser systématiquement l’interface d’administration des applications.
* Dans le cadre des données personnelles, prévoir des systèmes de purge automatique afin de respecter la durée de conservation des données, définie en amont de la mise en production.
* Etre vigilant quant à la compatibilité du format des données avec la durée de conservation (ex : date sur 4 caractères et non 2).
* Prévoir des modalités sécurisées lorsque l’application permet le dépôt de fichiers.
* Prévoir dans les applications une mention de mise en garde contre un contenu abusif, pour toutes les zones de texte libre.
* Prévoir une page Mentions légales dès lors que l’application contient des données personnelles.

De façon générale, il faut se référer au guide RGPD fourni par la CNIL : https://github.com/LINCnil/Guide-RGPD-du-developpeur

## Frameworks préconisés

### Quelques considérations sur les frameworks

Le framework sont des cadres de développement qui permettant de définir de manière standardisée l'architecture d’une application. Les développeurs peuvent focaliser leur travail sur la conception de la couche métier de l’application, le framework prenant en charge un ensemble de tâches techniques récurrentes telles que : 

* l'accès aux données
* l'internationalisation
* la journalisation des événements (logging)
* la sécurité (authentification et gestion des rôles)
* le paramétrage de l'application

La mise en oeuvre d'un framework permet notamment : 

* de capitaliser le savoir-faire sans "réinventer la roue"
* d'accroître la productivité des développeurs une fois le framework pris en main
* d'homogénéiser les développements des applications en assurant la réutilisation de composants fiables
* de faciliter la maintenance notamment évolutive des applications

### Framework Spring pour les applications serveurs (Java)

Le framework qui s'est imposé ces dix dernières années est Spring. Il est très largement utilisé dans le monde Java, ce qui en fait un standard de fait et constitue une certaine garantie sur la pérennité du framework. Spring propose une très bonne intégration avec d'autres frameworks open source comme Hibernate ou des standards de Java (Servlets, JMS, JDO etc.) Toutes les fonctionnalités de Spring peuvent s'utiliser dans un serveur Java EE et pour la plupart dans un simple conteneur web ou une application standalone.

Les fonctionnalités offertes par Spring sont très nombreuses et les sujets couverts ne cessent d'augmenter au fur et mesure des nouvelles versions et des nouveaux projets ajoutés au portfolio.

La documentation de Spring est complète et régulièrement mise à jour lors de la diffusion de chaque nouvelle version. La mise en oeuvre de Spring n'est pas toujours aisée car il existe généralement plusieurs solutions pour implémenter une fonctionnalité. Nous essayons autant que possible de réutiliser des architectures validées dans nos différents projets.

A noter qu'il n'est pas rare que les livrables aient une taille importante du fait des nombreuses librairies requises par Spring et ses dépendances.

### Framework VueJs pour les applications clientes (CSS/Javascript)

Les frameworks Javascript permettent de construire des applications s'exécutant essentiellement dans le navigateur web en minimisant les échanges avec la partie serveur. Ce fonctionnement permet d'obtenir une expérience utilisateur plus fluide et riche. Côté développeur, ces frameworks ajoutent une couche d'abstraction qui manquait dans l'univers Javascript. 
Actuellement les frameworks Javascript les plus populaires sont React, Angular et VueJs.  
Nous avons fait le choix de VueJs pour sa légèreté et facilité à prendre à main. Nous utilisons également Vuetify qui propose une galerie de composants graphiques.
Ce framework implémente le modèle MVVM (modèle-vue-vue-modèle) via un système de binding qui permet d'échanger instantanément des données entre le modèle et la vue.

#### Technique du "cache busting" pour les applications clients pas encore en VueJS

Il est préconisé de mettre en place la technique du [cache busting](https://www.keycdn.com/support/what-is-cache-busting) pour les application HTML/CSS/JS qui n'utilisent pas encore VueJS. Cette technique permet de palier les problèmes de mise en cache des "vieilles" ressources statiques (CSS/JS) lorsque l'on publie une nouvelle version de l'application (et évite par exemple de demander aux utilisateur de faire CTRL+F5 pour avoir la bonne version des ressources). Cette technique consiste à ajouter le numéro de version ou le hash du dernier commit dans l'URL de la CSS/JS au moment de l'inclusion ou bien d'y indiquer une valeur arbitraire qui est modifiée au moment où la ressource statique CSS/JS a été modifiée.

Voici un exemple sur IdRef avant la mise en place du cache busting :
```html
<link rel="stylesheet" type="text/css" href="css/style.css" title="style" media="screen"/>
```

Et voici ce que cela donne après la mise en place du cache busting :
```html
<link rel="stylesheet" type="text/css" href="css/style.css?v1" title="style" media="screen"/>
```
