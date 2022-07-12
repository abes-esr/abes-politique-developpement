Cette FAQ technique a pour objectif de rassembler des résolutions de problèmes récurrents rencontrés lors de nos activités de développement. 

# Erreur 404 lors d'un déploiement de war dans un tomcat

## Problème

Lorsqu'on se connecte à l'url de l'application, on obtient un message comme ci-dessous : 

```
État HTTP 404 – Not Found

Type Rapport d'état

message /Theses-Imports-0.0.1-SNAPSHOT/

description La ressource demandée n'est pas disponible.
Apache Tomcat/9.0.12
```

## Solution

pour les war conçu avec Spring, il faut :
* mettre ```<packaging>war</packaging> ``` dans le pom 
* ne pas oublier :  **extends SpringBootServletInitializer** dans la classe principale

---

# Versioning : supprimer les derniers commit erronés en local

## Problème

J'ai commité des changements en local mais l'application ne fonctionne plus, je n'aurais pas du commiter

## Solution

```terminal
git reset --hard HEAD~n
```
 avec n commits que l'on souhaite supprimer
 
 # Versioning : supprimer les derniers commit erronés push sur le dépot distant
 
 ## Problème 
 
 J'ai commit puis push sur le dépôt distant des modifications que je n'aurais pas du envoyer.
 
 ## Solution
 ```terminal
git reset --hard hashDuCommitSurLequelJeVeuxRevenir
git push origin develop -f
```

Ici le push se fait sur le develop, mais remplacer ``develop`` par la branche sur laquelle vous voulez revenir en arrière.

Attention : les commits supprimées disparaissent de l'historique

---

# Versioning avec Intellij : rafraichir le cache des fichiers versionnés (être sur de ce qui va partir sur le dépôt) - codes couleurs explorateur

## Problème

J'ai modifié mon .gitignore, mais je ne sais pas si ce que j'ai mis dedans est bien pris en compte, intellij ne rafraichit pas la couleur de mes fichiers. Dois-je commiter avec le risque d'avoir indexé des fichiers que je souhaitais voir ignorés ?

## Solution

### Permet d'être sur avant un commit d'avoir dans l'onglet 1[Project] les couleurs des différents fichiers à jour en se basant sur le .gitignore

Ainsi on est sur de savoir quels fichiers seront ignorés, indexés avant tout commit, notamment sur un dépôt public.

La solution pour rafraichir le cache intellij pour le File Status Highlights de l'explorateur
taper les commandes suivantes dans l'onglet terminal d'intellij ou dans un terminal à part, en se plaçant à la racine du projet

```terminal
git rm -r --cached .
git add .
git commit -m 'git cache cleared'
git push
```

ou version rapide

```terminal
git rm -r --cached . && git add . && git commit -m 'git cache cleared' && git push
```

Cela permet d'avoir à jour dans l'onglet Project sur tous les fichiers les couleurs à jour
et d'être sur en cas d'envoi sur un dépôt public que les fichiers sensibles sont bien ignorés.
Ca à l'air de marcher à tous les coups :)
* rouge -> non versionné
* bleu -> modifié
* or -> ignoré
* vert -> ajouté

Pour toutes les couleurs / status
[https://www.jetbrains.com/help/idea/file-status-highlights.html#views](https://www.jetbrains.com/help/idea/file-status-highlights.html#views)

Pour la manip
[https://gist.github.com/joemaffia/bacf72580d425c8eee67ec68708a4124](https://gist.github.com/joemaffia/bacf72580d425c8eee67ec68708a4124)

Pour ignorer les applications.properties correctement dans le fichier .gitignore
```terminal
### Applications.properties ###
**/resources/*.properties
```

---

# Versioning : supprimer ou remplacer le dernier commit

## Problème

J'ai commité en local des changements que j'ai envoyé sur le depôt distant avec des erreurs. Je souhaiterais revenir en arrière.

### Cas 1 : Il a été envoyé sur un autre dépôt

* revient en fait à effectuer le commit inverse de celui qu'on veut supprimer, car on ne peut pas casser l'historique des commits sur le dépôt distant.
* ce commit va supprimer les lignes qui ont été ajoutées, et remodifier les lignes qui ont été modifiées.

```terminal
git revert HEAD
```

* Un nouveau commit sera créé, ce commit contiendra les modifications inverses de **HEAD**.

### Cas 2 : Il n'a pas été envoyé sur un dépôt distant : modification

* il est tout à fait possible de le modifier, sans devoir passer par un commit inverse
* Il faut effectuer les modifications qui ont été oubliées, ou qui n'avaient pas lieu d'être puis commiter en utiliser l'argument --amend

```terminal
git commit --amend
```

* Après cette commande, Git redemandera un nouveau message de commit. Rien n'empêche d'utiliser celui qui a déjà été utilisé.

### Cas 2 : Il n'a pas été envoyé sur un dépôt distant : suppression

* Suppression du commit local + MAJ du répertoire de travail et l'index (on supprime tout)

```terminal
git reset --hard HEAD^
```

* Suppression du commit local, mais conservation des changements en cours dans le repertoire de travail et l'index

```terminal
git reset --mixed HEAD^
```

---

# Versioning : commiter avec prise en compte du # en premier caractère

## Problème

Normalement tous les commits des projets doivent avoir la syntaxe suivante

```syntaxe
#NUMERO_TICKET_GITHUB TYPE: message_commit_en_anglais
```

Parfois le # n'est pas pris en compte pour remontée dans gitlab, notamment sous linux, ou bien git affiche un message d'erreur disant qu'il ne peut commiter un message commençant par un #

## Solution

Commencer son message de commit avec l'option suivante

```syntaxe
$git commit --cleanup=whitespace
```

# Des annotations @Value renvoient null

## Problème 

Dans un projet Spring, des annotations @Value ne récupèrent pas les valeurs depuis les fichiers *.properties

## Solution

Cette annotation ne fonctionne que pour les objets instanciés via Spring c'est à dire par exemple avec l'annotation @Autowired.
Un objet instancié via ```new``` ne pourra pas utiliser @Value. 

# Erreur "ORA-28040: No matching authentication protocol"

## Problème 

Lors de la migration vers Oracle 12C, on a l'erreur : ORA-28040: No matching authentication protocol

## Solution

Il faut mettre à jour la dépendance jdbc, par exemple remplacer :
```
<dependency>
    <groupId>com.oracle.jdbc</groupId>
    <artifactId>ojdbc6</artifactId>
    <version>11.2.0.3.0</version>
</dependency>
```
par : 
```
<dependency>
    <groupId>oracle.ojdbc</groupId>
     <artifactId>ojdbc</artifactId>
     <version>12.1.0.1.0</version>
 </dependency>
```
Si on manipule des champs XMLTYPE, il faut ajouter les librairies xdb et xmlparser. Mais elles doivent être compatibles entre elles, par exemple : 
```
<dependency>
   <groupId>oracle.ojdbc</groupId>
   <artifactId>xdb6</artifactId>
   <version>11.2.0.3.0</version>
 </dependency>
 <dependency>
   <groupId>com.oracle</groupId>
   <artifactId>ojdbc6</artifactId>
   <version>11.2.0.3</version>
 </dependency>
 <dependency>
   <groupId>oracle.ojdbc</groupId>
   <artifactId>xmlparserv2</artifactId>
   <version>11.2.0.3.0</version>
   <scope>runtime</scope>
 </dependency>
```

Autre possibilité si jamais on est bloqué pour mettre à jour les librairies : utiliser la même version ojdbc6 et configurer l'authentification Oracle pour accepter des connexions de niveau 10, 11 et 12.

# Erreur SAXParser.. suite à la mise à jour de la dépendance Oracle xmlparserv2 ou suite au passage à Tomcat 9

## Problème 

Lors de la mise à jour des dépendances Oracle, on a une erreur : SAXParser.
L'erreur peut aussi arriver lorsqu'on passe une webapp de Tomcat 8 à Tomcat 9, sans forcément changer les dépendances Oracle : erreur SAXParser...

ex : 
```
java.lang.NoClassDefFoundError: oracle/i18n/util/LocaleMapper
```
(cette erreur peut se produire à l'appel d'un service ou au chargement de la webapp par Tomcat).

## Solution

La dépendance Oracle xmlparserv2 devient l'implémentation par défaut pour les javax.xml.parsers et javax.xml.transform

Pour re-initialiser les implémentations par défaut, il faut : 

Soit mettre ce bout de code au démarrage de l'application (par exemple dans une classe implémentant ServletContextListener et la méthode contextInitialized) : 
```
System.setProperty("javax.xml.parsers.SAXParserFactory","com.sun.org.apache.xerces.internal.jaxp.SAXParserFactoryImpl");
System.setProperty("javax.xml.transform.TransformerFactory","com.sun.org.apache.xalan.internal.xsltc.trax.TransformerFactoryImpl");
System.setProperty("javax.xml.parsers.DocumentBuilderFactory","com.sun.org.apache.xerces.internal.jaxp.DocumentBuilderFactoryImpl");
```
Soit définir ces propriétés en paramètre de la JVM : 
```
-Djavax.xml.parsers.DocumentBuilderFactory=com.sun.org.apache.xerces.internal.jaxp.DocumentBuilderFactoryImpl
-Djavax.xml.transform.TransformerFactory=com.sun.org.apache.xalan.internal.xsltc.trax.TransformerFactoryImpl
-Djavax.xml.parsers.SAXParserFactory=com.sun.org.apache.xerces.internal.jaxp.SAXParserFactoryImpl
```

Voir aussi : https://stackoverflow.com/questions/43944803/java-lang-securityexception-org-xml-sax-saxnotrecognizedexception-feature-htt

# Erreur : SQLException: Validation (commit) impossible lorsque le mode autocommit est activé

## Problème 

Ou :
```
java.sql.SQLException: Could not commit with auto-commit set on
```
Cette erreur peut survenir suite à la mise à jour de la dépendance ojdbc.jar lors de la migration vers une version plus récente d'Oracle (12c en l'occurrence).

## Solution

il faut ajouter cette option lors du démarrage de la JVM (par exemple dans JAVA_OPTS du bin/catalina.sh de Tomcat) : 
```
-Doracle.jdbc.autoCommitSpecCompliant=false
```

# Oracle SQL Developer : Multiple table view

## Problème

Oracle SQL ne permet pas de base les onglets multiples pour gérer les tables.

## Solution

https://stackoverflow.com/questions/1912129/oracle-sql-developer-multiple-table-views
Outils > Preferences > Bases de donnees > Visualiseur d'objets

# VueJS : Force resolution of vulnerabilities

## Problème

Sous vuejs ou autre projet utilisant npm, lors du lancement de l'application avec npm run serve, ou lors de l'installation d'un nouveau module avec npm install, des vulnerabilités dans les modules peuvent apparaitre.
- la commande npm audit permet de les investiguer.
- la commande nom audit fix --force ne permet souvent pas de les fixer. Cela est du au fait que cette commande n'agit que sur les versions des modules, et non les versions des sous-modules empaquetés par certains modules. Il faut alors paramétrer les versions des sous-modules dans le package.json de l'application, puis lancer un script spécifique, après chaque npm install, afin de rétablir les version qui évitent ces vulnérabilités.

# Solution

install in package.json file
```javascript
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "test:unit": "vue-cli-service test:unit",
    "lint": "vue-cli-service lint",
    "preinstall": "npx npm-force-resolutions"
  },
  "resolutions": {
    "yargs-parser": "15.0.1"
  },
```
As the example, the script preinstall was added, and a specific version of yargs-parser (who depends on top level jest npm module)
will be forced to update in node_module.
Then, run the script: npx npm-force-resolutions
and just tap on commands:
```
npm i && npm audit fix --force
```
Tip: think to run the script after each npm installation modules.

Après cela, les vulnérabilités doivent avoir disparues.

# Oracle SQL Developer : optimisation de requêtes

## Problème

Parfois une requête peut être très lente.

## Solution

Dans sql developer, après s'être connecté à une instance de base de données, taper la requête, faire ctrl+f12 (ou cliquer sur la cinquième icone (à côté de "commit")).
Ensuite dans l'onglet "détail", nous avons les plans d'éxecutions, les indexes à créer, les reformulations de requêtes éventuelles...il suffit de suivre les indications.

# VueJS : Cannot find module : problème de librairie

## Problème

TS2307: Cannot find module... alors que le module à bien été installé
Note: npm i -g installe globalement les modules

## Solution

Il ne faut pas intégrer le repertoire node_modules globalement dans le tsconfig.json. Regarder dans l'IDE quelle librairie est manquante.
Modifier le fichier tsconfig.json comme suit :
```
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx",
    "node_modules/[NOM_LIBRAIRIE_A_INTEGRER]"
  ],
```

## En dernier recours

Supprimer le fichier tsconfig.json à la racine du projet
Faire 
```
npx tsc --init
```
pour le recréer. Les imports doivent désormais fonctionner.

# VueJS : Travailler avec des fichiers JSON stockés dans le projet pour simuler des retours WS du back-end

## Problème

Pour des raisons diverses, certains ws peuvent être anormalement long en termes de temps de réponse pour fournir leur retour, sous forme de Json ou xml. Stocker le retour d'un ws en local sous forme d'un fichier json permet de travailler beaucoup plus rapidement dans un environnement isolé et non dépendant pour le developpement front.

## Solution

A partir de Typescript 2.9
Exemple de fichier JSON placé dans le projet

```
{

  "primaryBright":    "#2DC6FB",
  "primaryMain":      "#05B4F0",
  "primaryDarker":    "#04A1D7",
  "primaryDarkest":   "#048FBE",

  "secondaryBright":  "#4CD2C0",
  "secondaryMain":    "#00BFA5",
  "secondaryDarker":  "#009884",
  "secondaryDarkest": "#007F6E",

  "tertiaryMain":     "#FA555A",
  "tertiaryDarker":   "#F93C42",
  "tertiaryDarkest":  "#F9232A",

  "darkGrey":         "#333333",
  "lightGrey":        "#777777"
}
```

Le fichier ts ou l'on veut utiliser le json
```
import colorsJson from '../colors.json'; // This import style requires "esModuleInterop", see "side notes"
console.log(colorsJson.primaryBright);
```

Le fichier tsconfig.json doit contenir dans la rubrique compilerOptions
```
"resolveJsonModule": true,
"esModuleInterop": true,
```

Source :
[Stackoverflow : importing-json-file-in-typescript](https://stackoverflow.com/questions/49996456/importing-json-file-in-typescript)

# Remplacer le mot de passe de l'utilitaire git sur Windows

## Problème 

A partir du 13 aout 2021, l'authentification par mot de passe ne fonctionnera plus sur Github. On veut remplacer son mot de passe dès maintenant.

## Solution

* se connecter sur son compte Github, dans "Settings", dans "Developer settings", dans "Personal access tokens", il faut créer un token

* dans le panneau de contrôle de Windows, dans "comptes utilisateurs", dans "gérer vos informations d'identification", dans "informations d'identification Windows", dans "informations d'identification génériques", on clique sur la clé : "git:https://github.com" et en cliquant "modifier", on peut remplacer le mot de passe par le token créé préalablement sur Github.


# Harmoniser la configuration des fichiers .prettierrc.yaml, .eslintrc.js, tsconfig.json dans une architecture front, désactiver certaines règles eslint par rapport a un projet mixant typescript et javascript

## Problème

La configuration des fichiers mentionnés ci-dessus doit respecter une inter-compatibilité entre eux afin d'éviter des erreurs consoles ou des signalement de l'IDE.
Les projets en ts vont parfois utiliser des librairies ou des portions de code historiquement construite en js. Le typage n'est alors pas le même, la syntaxe peut changer.
Comment configurer eslint pour le mettre en accord avec ts config et les règles de prettier ?
Voici un tableau de compatibilite
![1 HRABdfNr2DHpNfrgpjqO0Q](https://user-images.githubusercontent.com/19894885/120649922-92ee9f00-c47d-11eb-8d79-f8126d1da388.png)

###Solution
- Désactiver certaines règles eslint en regardant sur la documentation officielle dans le fichier .eslintrc.js (sur chaque règle il y a une rubrique expliquant comment désactiver la règle à travers le fichier .eslintrc.js
[https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md)
- Configurer les fichiers en respectant le tableau de compatibilité.
- Configurer prettierrc avec trailingComma pas en es5
- Règler la conf

---

# Erreur lors de la création d'une release avec Jenkins et OpenJDK 11

## Problème

Lorsqu'on veut réaliser une release, elle ne fonctionne pas : car il y a des ERROR dans la génération de la javadoc :

```
[INFO] [ERROR] Failed to execute goal org.apache.maven.plugins:maven-javadoc-plugin:3.3.0:jar (attach-javadocs) on project autorites: MavenReportException: Error while generating Javadoc: 
```

## Solution

Il faut indiquer au plugin maven-javadoc qu'on souhaite un niveau WARN à la place de ERROR, afin que la release puisse se faire : 
```
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <release.javadoc.root.path>javadocAPPLI/</release.javadoc.root.path>
    <additionalparam>-Xdoclint:none</additionalparam>
    <doclint>none</doclint>
</properties>
```
et
```
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-javadoc-plugin</artifactId>
    <executions>
        <execution>
            <id>attach-javadocs</id>
            <goals>
                <goal>jar</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
        <additionalOptions>
            <additionalOption>-Xdoclint:none</additionalOption>
        </additionalOptions>
        <failOnError>false</failOnError>
    </configuration>
</plugin>
```

# Jenkins : générer du code dans les Jenkinsfile

## Problème

On veut réaliser certaines actions dans un Jenkinsfile.

## Solution

Jenkins met à disposition un générateur de code "Snippet Generator" accessible depuis les jobs de type "multibranch pipeline".
Dans le menu de gauche du job, il faut cliquer sur "Pipeline Syntax". On accède alors à un formulaire pour choisir l'action à réaliser (checkout de code, publier via ssh etc.) et on peut générer le code à copier dans le jenkinsfile pour notre job.

# Maven Plugin not found in IntelliJ IDE

## Problème

Régulièrement dans les pom.xml le plugin suivant pose problème.
```xml
<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>
```

Plugin 'org.springframework.boot:spring-boot-maven-plugin:' not found  

## Solution

Dans les préférences d'Intelli J, naviguez jusqu'à "Build, Execution, Deployment > Build Tools > Maven", cochez "Use plugin registry", et cliquez sur "OK".
Puis "File > Invalidate Caches / Restart" pour recharger Intelli J. L'erreur disparaîtra automatiquement.

# Problème d'injection d'un mock dans les tests unitaires

## Problème

Dans un test unitaire il arrive que, lors de la création d'un mock, l'objet ne soit pas injecté correctement dans la classe et qu'on ait une NullPointerException sur l'objet (par exemple, on mock une classe de la couche service qui est injectée dans un controller).

## Solution

Le problème peut venir de la façon dont les injections de dépendances sont déclarées. Si les objets sont injectés via une annotation @Autowired, cela peut créer le problème. Pour le corriger, il suffit de supprimer l'annotation @Autowired, de passer le champ en final, et de l'initialiser dans le constructeur de la classe (en passant l'objet en paramètre).

Exemple : 
```@Autowired
private EtablissementService service;
```
devient : 
```
private final EtablissementService service;

public MaClasse(EtablissementService service) {
	this.service = service;
}
```

# Faille de sécurité log4shell et applications Java

## Problème

On veut mettre à jour log4j dans les application java qui utilisent des vielles versions.
La version préconisée de log4j qui corrige log4shell est la version **2.17.1**

## Solution

### Application Java utilisant slf4j-log4j12

Si l'appli java dépend de `slf4j-log4j12` alors voici comment procéder. Le principe sera de modifier un minimum de code en utilisant la librairie `log4j-1.2-api` qui permet de conserver l'ancienne interface java de log4j v1 tout en utilisant la nouvelle version de log4j v2.17.1. Une subtilité est d'empêcher ` slf4j-log4j12` d'utiliser log4j v1 en utilisant le système d'`<exclusion>`.

1) Dans pom.xml placer ces dépendances :
```xml
	<!-- Utilisation de log4j 2.17.1 qui corrige la faille log4shell -->
	<dependency>
	    <groupId>org.apache.logging.log4j</groupId>
	    <artifactId>log4j-core</artifactId>
	    <version>2.17.1</version>
	</dependency>
	<dependency>
	    <groupId>org.apache.logging.log4j</groupId>
	    <artifactId>log4j-api</artifactId>
	    <version>2.17.1</version>
	</dependency>

	<!-- Wrapper qui permet de faire en sorte que le code qui appelle 
	   l'API de log4j v1.2 fonctionne et log dans une version log4j v2.17.1
	   (qui elle corrige la faille log4shell)
	-->
	<dependency>
	    <groupId>org.apache.logging.log4j</groupId>
	    <artifactId>log4j-1.2-api</artifactId>
	    <version>2.17.1</version>
	</dependency>

	<!-- C'est slf4j-log4j12 qui est utilisé dans le code de Rafa -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
            <version>1.7.32</version>
	    <!-- exclusion de log4j pour que slf4j-log4j12 utilise
	         log4j-1.2-api (cf plus haut) qui lui même utilise
	         log4j-core dans sa version 2.17.1 (qui corrige la faille log4shell)  -->
	    <exclusions>
	        <exclusion>
	            <groupId>log4j</groupId>
		    <artifactId>log4j</artifactId>
	        </exclusion>
	    </exclusions>
        </dependency>
```

2) Dans le répertoire `src/main/resources`, remplacer le fichier de paramétrage log4j.properties par log4j2.xml dont voici un exemple de contenu :
```xml
<Configuration>
    <Appenders>
        <Console name="STDOUT" target="SYSTEM_OUT">
            <PatternLayout pattern="%style{%d{ISO8601}}{black} %highlight{%-5level }[%style{%t}{bright,blue}] %style{%C{1.}}{dark,yellow}: %msg%n%throwable" />
        </Console>
    </Appenders>
    <Loggers>
        <Root level="INFO">
            <AppenderRef ref="STDOUT"/>
        </Root>
    </Loggers>
</Configuration>
```

3) Recompiler et redéployer l'application en veillant à la tester dans les grandes lignes.

# Monitoring des conteneurs docker

## Problème

J'aimerais connaitre la consommation CPU et RAM de mon/mes conteneurs sur un serveur.

## Solution

Utiliser l'outil ctop en tapant ceci en ligne de commande sur le serveur :
```
sudo docker run --rm -ti   --name=ctop   --volume /var/run/docker.sock:/var/run/docker.sock:ro   quay.io/vektorlab/ctop:latest
```

Vous obtiendrez une visualisation qui ressemblera à ceci :
![image](https://user-images.githubusercontent.com/328244/165930667-bbf6bd07-f294-4270-b473-ccd484964802.png)

# Configuration d'un environnement Docker sous Windows 10

## Installation de WSL et d'une distribution Linux

source  : [docs.microsoft.com](https://docs.microsoft.com/fr-fr/windows/wsl/install)

### Installation et activation de WSL2

1. vérifier si WSL est installé :

    ```console
    wsl -l -v
    ```

2. pour être certain de disposer de la dernière version (WSL2) ou pour installer WSL2 depuis zéro, voici la commande à taper dans un PowerShell en mode administrateur :

    ```console
    wsl –-install
    ```

### Installation d'une distribution Linux (Ubuntu pour l'exemple) dans WSL

_Par défaut, l'installation de WSL 2 installera également une distribution Linux (Ubuntu). Néanmoins, si tel n'est pas le cas, suivre le protocole ci-dessous._

1. vérifier si une distribution Linux est déjà installée dans WSL

    ```console
    wsl -l -v
    ```

- Si une distribution Linux est listée en version 1, saisissez

    ```console
    wsl -–set-version <nom_de_la_distribution> 2
    ```

- si aucune distribution n'est installée,  saisir

    ```console
    wsl –-install -d <nom_de_la_distribution>
    ```

### Passer la distribution de Linux installée dans WSL par défaut :

- PowerShell en mode administrateur

    ```console
    wsl --set-default <nom_de_la_distribution>
    ```

## Installation de Docker Desktop

- Télécharger et installer docker desktop avec l’option d’installation de WSL2 (cocher la case « Enable Hyper-V Windows Features » durant l'installation) :
[www.docker.com](https://www.docker.com/products/docker-desktop/)

- Une fois l'installation terminée, ouvrir Docker et aller dans les Settings/Resources/WSL Integration pour cocher les cases
  - [x]  Enable integration with my default WSL distro »
  - [x] <nom_de_la_distribution_Linux>

## Création d'un user individuel dans la distribution Linux WSL2

- Ouvrir PowerShell ou une invite de commande

- entrer dans la machine virtuelle :

    ```console
    wsl
    ```

- ajouter un utilisateur Linux (indiquer son login individuel habituel) :

    ```console
    adduser <nom_de_l'utilisateur>
    ```

- donner les droits sudo à l'utilisateur

    ```console
    usermod –aG sudo <nom_de_l'utilateur>
    ```

- donner les droits Docker à l'utilisateur

    ```console
    usermod –aG docker  <nom_de_l'utilateur>
    ```

- sortir de la machine virtuelle

    ```console
    exit
    ```

- changer l'utilisateur par défaut qui sera utilisé au moment de démarrer la distribution Linux WSL2

    ```console
    ubuntu config --default-user <nom_de_l'utilateur>
    ```

## Vérification du fonctionnement de Docker

- Ouvrir PowerShell ou une invite de commande

- Entrer dans la machine virtuelle :

    ```console
    wsl
    ```

- Afficher la version de Docker :

    ```console
    docker -v
    ```

- Afficher la version de Docker-Compose :

    ```console
    docker-compose -v
    ```

- Télécharger et démarrer le conteneur docker d'essai hello-world :

    ```console
    docker run --rm hello-world
    ```

    Le message « Hello from Docker !» s'affiche dans la console

## Installer et paramétrer Git

- Ouvrir PowerShell ou une invite de commande

- Entrer dans la machine virtuelle :

    ```console
    wsl
    ```

- installer Git :

    ```console
    sudo apt install git
    ```

- créer un jeu de clefs SSH privée/publique en suivant les recommandations du document suivant (chapitre "Générer des clés avec ssh-keygen") :
[docs.microsoft.com](https://docs.microsoft.com/fr-fr/azure/virtual-machines/linux/create-ssh-keys-detailed)

- enregistrer la clef publique sur son compte GitHub :
  - ouvrir les "Settings" de son compte GitHub et aller dans la rubrique "SSH and GPG keys" ici : https://github.com/settings/keys
  - cliquer sur le bouton "New SSH key"
  - donner un nom à la nouvelle clef SSH dans le champ "Title"
  - coller l'intégralité de la clef publique dans le champ "Key"
- dans WSL, en 'user' saisir :

    ```console
    cd
    ```

    Puis saisir :

    ```console
    explorer.exe .
    ```

    Cela ouvre une nouvelle fenêtre Windows qui affiche le répertoire racine de la machine virtuelle en cours. Ouvrir le répertoire .ssh
    `\\wsl$\<nom_de_la_distribution_linux>\home\<nom_de_l'utilisateur_défini_dans_wsl>\.ssh`

- Dans cette nouvelle fenêtre, coller la paire de clefs privée/publique que vous trouverez dans le répertoire .ssh de votre session utilisateur Windows 
    `C:\Users\<votre_nom_d'utilisateur>\.ssh`

## Préparation du répertoire de travail

- Ouvrir PowerShell ou une invite de commande

- Entrer dans la machine virtuelle :

    ```console
    wsl
    ```

- créer le répertoire pod :

    ```console
    sudo mkdir /opt/pod/
    ```

- donner les droits de lecture/écriture à tous au répertoire pod :

    ```console
    sudo chmod a+wrx /opt/pod
    ```

- entrer dans le répertoire pod :

    ```console
    cd /opt/pod
    ```

## Exemple d'utilisation du répertoire /opt/pod avec Qualimarc

- Cloner le projet à partir de GitHub. Dans wsl, saisir :

    ```console
    cd /opt/pod/
    ```

    puis

    ```console
    git clone git@github.com:abes-esr/qualimarc-docker.git
    ```

- Pour la suite, se référer au ReadMe Qualimarc-Docker  https://github.com/abes-esr/qualimarc-docker.git

