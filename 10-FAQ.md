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
