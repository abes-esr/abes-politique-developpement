# Gestion du code source

Pour gérer nos codes sources, nous utilisons :
- Github comme gestionnaire de code open source (ou SCM pour source control management)
- Artifactory (en interne à l'Abes) comme gestionnaire de dépôt d'objets binaires (ou repository manager). 

Pour les anciens projets que nous ne pouvons pas encore migrer en opensource, nous utilisons Gitlab en interne à l'Abes comme gestionnaire de code source.

## Licences

Tous les nouveaux projets créés par l'Abes depuis 2019 produisent du code opensource.

Nous appliquons la [Licence CeCILL](https://fr.wikipedia.org/wiki/Licence_CeCILL) : c'est une licence équivalente à la GPL compatible avec le droit Français et [préconisée par la loi pour une République numérique](https://www.data.gouv.fr/fr/licences). Elle est donc "contaminante", c'est à dire qu'elle impose aux contributeurs de publier les modifications/améliorations réalisées sous la même licence. Les [bibliothèques de logiciels](https://fr.wikipedia.org/wiki/Biblioth%C3%A8que_logicielle) ("librairies") développées seront elles publiées sous la [licence MIT](https://fr.wikipedia.org/wiki/Licence_MIT) qui permet une réutilisation moins contraignante et donc plus adapté à la nature de ces  codes.

## Github / Gitlab

Github et Gitlab fournissent une interface web qui : 
* donne accès aux fichiers, aux commits, à un moteur de recherche sur le code source
* propose un éditeur de code en ligne
* permet de suivre facilement les modifications apportées par les développeurs
* permet de visualiser l'activité de chaque développeur.
* donne accès un tableau de type Kanban qui nous permet de gérer les sprints lorsque le projet est mené en méthode agile. Un atout de ce tableau est de pouvoir lier les tâches aux commits.

## Artifactory

Artifactory (outil interne à l'Abes) permet de stocker le code source compilé des projets Java. Il contient l'ensemble des versions que les développeurs ont construites, qu'ils s'agissent de version SNAPTSHOT ou de RELEASE. On y trouve à la fois le code source compilé produit par l'Abes et les dépendances externes.
L'utilisation d'Artifactory nous permet aussi d'accélerer les phases de construction puisque les dépendances sont d'abord recherchées sur notre Artifactory local. En cas d'échec, elles sont recherchées sur Maven central.

## Numéros de version

Le projet est une succession d’itération : demande de fonctionnalités, implémentation, correction des bugs etc. Ces évolutions sont reflétées par les numéros de version des projets.

Nous utilisons la notation X.Y.Z., préconisée ici : https://semver.org/spec/v2.0.0.html

X correspond à une version majeure du système. Cette mise à jour peut potentiellement provoquer des incompatibilités par rapport aux versions précédentes.

Y correspond à une version mineure, ce numéro est incrémenté lors d'ajouts de fonctionnalités.

Z est le numéro du build, il est incrémenté par exemple lors de la correction d'un ensemble de bugs ou de la factorisation d'une partie du projet.

Enfin, nous distinguons les release et les snapshot. Pour les snapshot, les numéros de version sont suffixés par "-SNAPSHOT". Rien n'est ajouté au numéro pour les releases.

Un snapshot est la version en cours de développement. 

Une release correspond à l'état stable d’une version. Si par exemple la construction de la 2.0.6 est lancée en release, le numéro de version pour le snapshot suivant devient 3.0.0 ou 2.1.0 ou 2.0.7. Ce fonctionnement est automatisé pour Java via l'utilisation de Maven.

## Utilisation des branches

Nous utilisons un système de branches inspiré de [Gitflow](https://www.atlassian.com/fr/git/tutorials/comparing-workflows/gitflow-workflow) : nous avons donc systématiquement deux branches : "master" (version en production) et "develop" (version en cours de développement). Lorsqu'on souhaite ajouter une fonctionnalité, on crée une nouvelle branche du nom de la fonctionnalité (feature/nomDeLaFonctionnalité). Une fois cette fonctionnalité déployée en environnement de test et validée, une merge request (ou pull request) est créée.
Lorsque un autre développeur a pris connaissance du code, la branche est fusionnée sur la branche "develop". 

On peut également corriger un bug dans la version en production sans toucher à la version en développement. On dérive alors une branche "hotfix" de la branche "master". Une fois validée, la correction est intégrée sur la branche "master" et on ne doit pas trop tarder pour l'intégrer aussi à "develop".

Lorsque la version de développement passe en production, elle est fusionnée avec la branche master.

Les releases sont mises en oeuvre via Jenkins qui ajoute une version taguée dans Gitlab. Parmi les bonnes pratiques à suivre on peut citer :  

* ne pas attendre (maximum deux semaines) pour merger une branche et la branche dont elle est dérivée (par exemple une "feature" sur "develop"). En général, la durée maximale est celle du sprint.
* les commits doivent obligatoirement être accompagnés d'un certain nombre d'informations (voir ci-dessous la section spécifique aux messages de commit).
* il faut toujours lancer les tests unitaires en local avant de commiter le code.
* privilégier un découpage de projet en modules permet d'avoir des commits les plus indépendants les uns des autres. Lorsqu'on travaille à plusieurs, on limite ainsi le risque de modifier les mêmes parties du code.
* à chaque correction de bug, il faut ajouter le test unitaire qui, s'il avait existé, aurait permis d'éviter le bug.
* tout le code impacté par un ajout de fonctionnalité ou une correction doit être commité en une seule fois. Si plusieurs fonctionnalités ou bugs sont impactés, il est donc recommandé de réaliser plusieurs commits, chacun correspondant à une modification.
* les builds sont en général lancé à la main depuis Jenkins. Mais il est aussi possible de programmer des builds automatique, par exemple tous les jours à la même heure.
* il faut utiliser le fichier .gitignore pour exclure systématiquement des commits tout ce qui est spécifique à l’IDE (.classpath, .project), le répertoire avec le code compilé : target et les fichiers .properties lorsqu'on travaille sur Github.
* Pour les dépôts Github, les fichiers application.properties sont stockés sur un dépôt Gitlab interne et déployé via nos jobs de déploiement Jenkins.
* le code compilé ne doit pas être envoyé sur le SCM (puisque les sources suffisent à créer le programme)
* les dépendances externes ne doivent pas être envoyées sur le SCM (elles sont dans le repository manager)
* Pour le PL/SQL : un batch parcourt tous les scripts PL/SQL et les envoie automatiquement dans un dépôt spécifique. On peut aussi exporter le code depuis l'IDE sqldeveloper sur son poste en local en fichiers .sql (qui contient fonctions, procédures, types, DDL). Ces fichiers sont alors regroupés dans un répertoire "sql" dans le projet et sont versionnés avec le projet.
* procéder de la même manière que pour le PL/SQL pour tout code susceptible d’être stocké dans des tables de base de données (fichiers XSL, XQuery etc.)
* il faut ajouter des fichiers release-notes à chaque release. Ces fichiers contiennent les dernières fonctionnalités ajoutées, les corrections de bugs...
Le fichier est édité à la main directement depuis Gitlab sur la page des "releases".
* Nous utilisons les "merge request" sur Gitlab ("pull request" sur Github) : les branches "master" et "develop" n'acceptent que les "merge" et non les "push". Les "merge" sont conditionnés à l'approbation d'au moins un autre développeur. Cette pratique permet de renforcer la qualité du code (relecture) et de partager le code produit.

## Messages de commit

Un soin particulier doit être apporté à la rédaction des messages de commit. Pour les dépôts Github, la langue privilégiée est l'anglais.
* il faut être le plus spécifique possible, par exemple "Correction du bug login" devient "Redirection de l’utilisateur vers la page adaptée après le login"
* si plusieurs points doivent mentionnés, il est possible de les présenter sous forme de listes via * ou -
* il faut écrire un court paragraphe d'explication en plus du titre
* le lien entre le commit et le ticket se fait en ajoutant le numéro du ticket au message sous le format : #NumeroDuTicket (voir exemple plus bas)
* chaque commit doit être typé : 
    * Fix : Correction de  bugs
    * Feat : Nouvelles fonctionnalités
    * Doc : Ajout de documentation
    * Test : Ajout de tests unitaires
    * Refactor : Refactorisation ou nettoyage de code existant, sans impact sur les fonctionnalités

Un message de commit doit donc être structuré ainsi : 

#NumeroISSUE Type : Message du commit

Court paragraphe décrivant les modifications plus en détail si nécessaire

## Nommage des dépôts

Les noms de nos dépôts sur Github doivent être en minuscule, les éléments séparés par des tirets. Chaque dépôt doit posséder, dès sa création, une description ainsi qu'un `README.md` minimaliste pour donner dès le début un cadre au contenu attendu dans le dépôt (même si ce dernier est vide dans un premier temps).

Les demandes de création de dépôt doivent être transmises à l'alias github@abes.fr qui assure le maintien d'une certaine cohérence dans le nommage des dépôts.

## Création et configuration d'un nouveau dépôt

La création de dépôt opensource sur GitHub doit être privilégiée. La création de dépôt sur GitLab (interne à l'Abes) est utile dans certain rares cas (dépôt contenant des secrets, réorganisation de vieux codes). 

Voici la procédure pour la création de dépôt Gitlab : 

* se loguer en utilisateur "depots" pour Gitlab (ou un compte avec les droits admin pour Github)
* le nommer en respectant le standard PascalCase pour Gitlab et les règles de nommage ci-dessus pour Github 
* ajouter une description

Une fois le dépôt créé : 
* ajouter un readme (et le renseigner)
* ajouter un .gitignore
* créer une branche develop

* dans les settings du dépôt, dans "Members" pour Gitlab ou "Manage access" pour Github : inviter les développeurs, leur attribuer un rôle (maintainer ou developers)

* dans "Settings / repository" pour Gitlab ou "Branches" pour Github, il faut protéger les branches ainsi:
    * master : allowed to push : no one, allowed to merge : maintainers + developers
    * develop : allowed to push : maintainers + developers, allowed to merge : maintainers + developers
    
## Codes partiellement ouverts sur Github

Les dépôts Github publiés par l'Abes qui contiennent du code qui dépend de librairies non opensource (car pas encore libérées par l'Abes) doivent le mentionner dans le `README.md` du dépot par la mention suivante :
> Attention : ce code (open)source, développé et maintenu par l'Abes ne peut pas (encore) être réutilisé à l'exterieur car il dépend de librairies internes. Contactez nous (github@abes.fr) si vous souhaitez y contribuer.

Ainsi les collègues contributeurs externes à l'Abes sont prévenus rapidement et cela leur évite de perdre du temps à essayer de compiler/réutiliser le code.

