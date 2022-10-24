# Intégration continue

L’intégration continue est un ensemble de pratiques de l'ingénierie logicielle qui poursuit deux objectifs :
* minimiser l’effort et le temps nécessaire à la phase d'intégration
* donner la possibilité à tout moment de livrer une version du code stable pouvant être déployée en production.

Ces objectifs sont atteints via la mise en place d'une pipeline composée d'un outil de gestion du code source vers lequel les développeurs vont soumettre ("commiter") leur code. A chaque modification, un outil de "build" récupère le code, exécute les tests unitaires et d'intégration et construit le composant. Le code est ensuite envoyé vers l'outil de vérification de la qualité. Le composant est publié sur le dépôt des artefacts (référentiel binaire). Enfin, les développeurs sont informés du résultat du build, qu'il ait réussi ou non. 

## Plateforme d'intégration continue open source

Notre plateforme d'intégration continue open source en place depuis 2019 est constituée de :

* [__GitHub__](https://github.com/abes-esr/) est le gestionnaire de codes sources. Il fournit une interface web qui permet de naviguer dans les différents projets, d’effectuer des recherches dans le code.
* __GitHub Action__ qui sert à compiler les source, lancer les tests, générer les versions, et générer les images docker des applications.
* [__DockerHub__](https://hub.docker.com/u/abesesr) qui sert à stocker et à distribuer les images docker de nos applications une fois compilées par les GitHub Actions. Les images docker sont alors prêtes à être déployées en local, dev, test, et prod.
* [__WatchTower__](https://containrrr.dev/watchtower/) qui sert à déployer automatiquement les applications docker sur les environnements dev, test, et prod. 
* [__Maven Central__](https://search.maven.org/search?q=abes) qui est le gestionnaire de dépôts de librairies JAVA pour tous nos développements opensource depuis 2019 (remplace donc le Artifactory interne)
* [__GitGuardian__](https://www.gitguardian.com/) qui sert à détecter d'éventuelles secret qui pourraient fuitter dans les commits envoyés en opensource sur GitHub.

## Ancienne plateforme d'intégration continue 

Notre ancienne plateforme d'intégration continue est constituée de

* __Gitlab__ est le gestionnaire de codes sources. Il fournit une interface web qui permet de naviguer dans les différents projets, d’effectuer des recherches dans le code. Il propose aussi des fonctionnalités de wiki et de gestionnaire de tickets. A noter que nos nouveaux codes sont déposés sur __Github__ qui fournit des fonctionnalités similaires à Gitlab.
* __Jenkins__ qui sert de chef d’orchestre. Son travail est de récupérer les sources sur Gitlab, de les compiler avec Maven, de lancer une analyse SonarQube et d’enregistrer la compilation dans Artifactory. Si l’on souhaite un déploiement en DEV, TEST ou PROD, PUPPET prendra le relais.
* __Artifactory__ permet de sauvegarder dans un même lieu l’ensemble des dépendances de chaque projet ainsi que la compilation de chacun. Il permet également de gérer les « releases » (versions stables d’une application) et les « snapshots », compilation à un instant « t ».
* __SonarQube__ analyse le code en y appliquant un ensemble de règles permettant de vérifier que les standards sont respectés en termes de conventions de codage, sécurité etc.
* __Puppet__ déploie sur les machines de DEV, TEST et PRODUCTION à partir d’un langage spécifique. Les scripts de déploiement Puppet ne sont pas stockés avec le code source des applications mais dans un dépôt à part. Une grande partie de ce code a été factorisé et est partagé par les applications. Ainsi le code puppet spécifique à chaque application est minimisé et il s'agit principalement de configuration.

## Bénéfices de l'intégration continue

L'intégration continue a de nombreux bénéfices : 

* __Pour les développeurs__
  * Le débogage du code est facilité car les erreurs sont associées à des petites incrémentations du code. La correction des bugs est faite avant l’accumulation des erreurs interférant les unes avec les autres. Le risque lié à l’intégration d’une quantité de code trop importante au moment de la fin du projet est écarté car le code est dans un état vérifié et exécutable à tout moment.
  * le retour du cycle de développement est réduit donc des distributions applicatives fréquentes sont possibles
  * le risque de conflits de fusion du code source est réduit et la résolution de ces conflits est simplifiée car les fusions sont fréquentes
  * l’automatisation de l’exécution des tests unitaires et la réalisation des distributions permet d’obtenir une meilleure qualité du code et améliore la productivité. Une bonne couverture du code par les tests unitaires offre aux nouveaux développeurs un environnement sûr pour rapidement comprendre le code. 
  * les développeurs ne passent plus leur temps dans des tâches de débogage, fusion du code source, déploiement, etc. Ce temps peut alors être utilisé pour améliorer le code via par exemple des tâches de refactoring (modifier le code non pour ajouter une fonctionnalité mais pour améliorer sa structure)

* __Pour le management__
  * réduire les risques et le temps de distribution des applications
  * réduire les coûts de développement et déploiement
  * améliorer la qualité du code source

* __Pour les utilisateurs__
  * les utilisateurs peuvent à tout moment évaluer le produit qui est dans un état stable

L'intégration continue facilite les déploiements fréquents, notamment si elle est couplée à l'utilisation d'une méthode agile. On peut par exemple définir un sprint de quinze jours sur un projet : les fonctionnalités développées lors de ce sprint sont déployées en test. Si les tests sont concluants, on peut ensuite intégrer les nouvelles fonctionnalités à la version en production qui sera déployée dans la foulée.

## Perspectives de l'intégration continue

La configuration de la plateforme d'intégration continue est réalisée par l'équipe en charge de la plateforme en partenariat avec les développeurs et le service infrastructure de l'Abes. La mise en place d'un workflow open source depuis 2019 engendre des évolutions importantes dont certaines briques restent à traiter comme par exemple la documentation technique d'une application (non ouverte à la date d'octobre 2022).
