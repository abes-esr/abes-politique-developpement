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

#Oracle SQL Developper : Multiple table view

##Probleme

Oracle SQL ne permet pas de base les onglets multiples pour gérer les tables.

##Solution

https://stackoverflow.com/questions/1912129/oracle-sql-developer-multiple-table-views

Outils > Preferences > Bases de donnees > Visualiseur d'objets
