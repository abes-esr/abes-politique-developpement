# Accessibilité Web

<a id="sommaire" />

## I. Sommaire

  * [Principe](#principe)
  * [Champ d'application](#application)
  * [En pratique, pour les développeuses et développeurs](#pratique)
    * [Images](#image)
    * [Icônes](#icone)
    * [Titre](#titre)
    * [Titre et icône imbriquée](#titreavecicone)
    * [Tableau](#tableau)
    * [Bouton](#bouton)
    * [Navigation](#navigation)
    * [Tests](#test)

<a id="principe" />

## II. Principe

<!-- Balise d'ouverture de l'indentation des sous-titres du chapitre I -->
<ul>
L'accessibilité du web est la possibilité d'accéder aux contenus et services web pour les personnes handicapées (visuels, auditifs, moteurs, neurologiques, handicapées temporaires, etc.), pour les personnes âgées ou peu habituées aux conténus et services web et plus généralement pour tous les utilisateurs, quels que soient leurs moyens d'accès (mobile, tablette, ordinateur, télévision, etc.) ou leur conditions d'environnement (luminosité, niveau sonore, bande passante réduite, etc.)

Les pratiques d'accessibilité ont pour vocation de réduire ou supprimer les obstacles qui empêchent les utilisateurs d'accéder ou d'interagir avec des services. Le respect de ces pratiques s'applique autant aux UX/UI designers lors de la conception de l'identité graphique et du fonctionnement d'un projet web qu'aux développeuses et développeurs lors de l'écriture du code d'un projet.

<!-- Balise de fermeture de l'indentation des sous-titres du chapitre I -->
</ul>

[Sommaire](#sommaire)

<a id="application" />

## III. Champ d'application

<!-- Balise d'ouverture de l'indentation des sous-titres du chapitre II -->
<ul>

Les acteurs et actrices qui participent à la création d'un service web doivent considérer que les utilisateurs peuvent :

* ne pas pouvoir entendre, bouger, voir;
* rencontrer des difficultés à lire ou à comprendre le contenu textuel ;
* ne pas posséder, ou ne pas être en mesure d'utiliser un clavier ou une souris ;
* utiliser un écran n'affichant que le texte, un petit écran ou une connexion internet lente ;
* ne pas comprendre couramment la langue dans laquelle le document est rédigé ;
* se trouver dans une situation où leurs yeux, leurs oreilles ou leurs moans sont occupés ou gênés ;
* utiliser une version ancienne d'un logiciel de consultation, un logiciel entièrement différent ou un système d'exploitation différent.

La prise en compte de ces problématiques est essentielle afin de rendre les services web accessibles à tous.

<!-- Balise de fermeture de l'indentation des sous-titres du chapitre II -->
</ul>

[Sommaire](#sommaire)

<a id="pratique" />

## IV. En pratique, pour les développeuses et développeurs

<!-- Balise d'ouverture de l'indentation des sous-titres du chapitre III -->
<ul>


:warning: Ce document est encore en cours de rédaction. Il sera étoffé dans les semaines/mois à venir.
Si vous avez des correctifs à apporter, n'hésitez pas à faire remonter vos idées.



<ul>
La structure d'une application web est importante. En effet, celle-ci peut être lu par un lecteur d'écran 
et servir à la navigation. De fait, il est nécessaire d'y porter une attention particulière. 
En ce sens, il faut définir des 'zones' (<i>header, main, nav, footer, section</i>) avec les balises correspondantes.
La présence de ces zones oblige à veiller à ne pas surcharger le code avec une imbrication de balises 
(<i>v-container, div, section, v-sheet, etc.</i>) pouvant être fusionnées.

La plupart des composants VueJs génère un code HTML propre et lisible par les lecteurs d'écran (v-btn, v-img, etc.).
Néanmoins, certains composants ne génèrent pas d'information exploitable pour les lecteurs d'écran.
Il est donc nécessaire de remédier à ce problème.

Voici listé ci-dessous quelques composants et les méthodes pour améliorer leur accessibilité.
</ul> 

[Sommaire](#sommaire)

<a id="image" />

**1. Image :**

<ul>
Les balises HTML <b>< img></b> et VueJs <b>< v-img></b> possédant toutes les deux un attribut <b>alt=""</b>, la mise en place de description est facilitée.

*Exemple :*
```HTML
<img src="/img/logo.svg" alt="logo [nom_de_l_application]">
```
ou :
```HTML
<v-img src="/img/logo.svg" alt="logo [nom_de_l_application]">
```
</ul>

[Sommaire](#sommaire)

<a id="icone" />

**2. Icône :**

<ul>
L'élément VueJs <b>v-icon</b> ne prend pas en compte l'attribut <b>alt</b>.<br> 
De plus, un <b>v-icon</b> simple (ex : <i>< v-icon>mdi-home< /v-icon></i>) ne permet pas 
l'utilisation d'un <b>aria-label</b>, même si ce dernier est associé à un <b>role="img"</b>. 
Il ne renverra donc aucune information exploitable pour une lecteur de d'écran.<br>
Pour palier ce problème, deux solutions existent.<br><br>

*Exemple avec utilisation d'une balise **div** :*
```HTML
<div aria-label="Premièrement" role="img">
    <v-icon>mdi-numeric-1-box</v-icon>
</div>
```

*Exemple avec utilisation des attributs **@click** et **role="img"**:*
```HTML
<v-icon @click="goToHome()" aria-label="Retourner à l'interface de vérification" role="img">mdi-home</v-icon>
```

> [!TIP]
>
> L'ajout des attributs <b>@click=""</b> et  <b>role="img"</b> à un <b>v-icon</b>
> permet la reconnaissance de l'attribut <b>aria-label</b>

</ul>

[Sommaire](#sommaire)

<a id="titre" />

**3. Titre :**

<ul>
Utiliser les balises <b>h1</b> à <b>h6</b>, afin que les lecteurs d'écran puissent les détecter et permettre la navigation par titre au clavier.

*Exemple d'un titre avec un style dans un fichier css lié au projet :*
```HTML
<h2>Premier titre simple</h2>
```

```CSS
h2 {
  font-size: 1.26em; 
  color : #252C61; 
  font-weight: bold;
}
```
</ul>

[Sommaire](#sommaire)

<a id="titreavecicone" />

**4. Titre et icône imbriquée :**

<ul>
Dans le cas des titres avec numérotation par icônes, il est possible d'imbriquer une icône de numérotation dans la balise de titre (h1 à h6).  
Il n'est pas nécessaire d'appliquer un <b>aria-label</b> ainsi qu'un <b>role="img"</b> à l'icône. En effet, l'icône étant imbriquée dans la balise de titre (h1 à h6), le titre sera lu par le lecteur d'écran au passage de la souris sur l'icône.

*Exemple d'une icône de numérotation imbriquée dans un titre :*
```HTML
<h2>
    <v-icon color="#252C61" style="margin-top: -4px">mdi-numeric-1-box</v-icon>
    Premier titre
</h2>
```
>[!TIP]
>
>un ```margin-top``` négatif peut être appliqué à l'icône afin que le titre s'aligne avec elle au mieux, dans le cas où un ```vertical-align``` (<i>baseline, text-top, text-bottom, sub ou super</i>) ne le permet pas efficacement.

</ul>

[Sommaire](#sommaire)

<a id="tableau" />

**5. Tableau**

<ul>
Les éléments des tableaux sont régis selon les mêmes principes que leur type de base. C'est-à-dire que les titres de colonne sont du texte et seront donc lus comme du texte. 
Il est cependant possible d'attribuer un <b>aria-label</b> à un titre de colonne trop peu explicite (<i>ex : Nb. Exemp.</i>)

*Exemple d'une colonne triable :*
```HTML
<span v-if="header.text === 'Nb. Exemp.'" aria-label="Trier par nombre d'exemplaire" role="img">
  {{ header.text }}
</span>
```

Les images et icônes, elles, seront traitées comme tel. À ce propos, voir : [image](#image) ou [icone](#icone) plus haut.

</ul>

[Sommaire](#sommaire)

<a id="bouton" />

**6. Bouton**

<ul>
Plusieurs types de boutons existe. Chacun sera lu et interprété différemment par un lecteur d'écran.
</ul>

<br>

<ul>
<li>Cas d'un bouton avec uniquement du texte. Le texte sera lu directement par un lecteur d'écran et reconnu comme un bouton dans la structure de la page. 

*Exemple d'un bouton simple :*
```HTML
<v-btn text tile color="blue" value="accueil" to="/accueil">
  Accueil
</v-btn>
```
</li>

<li>Cas d'un bouton avec un texte et une icône. Le texte sera lu directement par un lecteur d'écran et reconnu comme un bouton dans la structure de la page.

*Exemple d'un bouton avec texte et icône, sans aria-label sur l'icône :*
```HTML
<v-btn text tile color="blue" value="accueil" to="/accueil">
    Accueil
  <v-icon small color="blue">mdi-home</v-icon>
</v-btn>
```

*Exemple d'un bouton avec texte et icône, avec aria-label pour l'icône :*
```HTML
<v-btn text tile color="blue" value="accueil" to="/accueil">
    Accueil
  <div aria-label="Accueil" role="img">
    <v-icon small color="blue">mdi-home</v-icon>
  </div>
</v-btn>
```

*Exemple d'un bouton avec texte et icône :*
```HTML
<v-btn fab color="white" href="https://stp.abes.fr/node/3?origine=sudocpro" target="_blank" aria-pressed="false" tabindex="4">
 <v-img src="@/assets/chatBubbles.svg" :max-height="($vuetify.breakpoint.mdAndUp) ? '34px' : '24px'" :max-width="($vuetify.breakpoint.mdAndUp) ? '34px' : '24px'" alt="Poser une question sur Abes STP"></v-img>
</v-btn>
```

</li>
</ul>

[Sommaire](#sommaire)

<a id="navigation" />

**7. Navigation**

<ul>
La balise <b>< nav></b> permet la reconnaissance des zones de navigation (<i>menu ou fil d'Ariane</i>) comme élément de structure par les lecteurs d'écran, offrant de fait plus d'option de navigation, notamment au clavier. 

*Exemple :*
```HTML
<nav>
  <v-icon @click="goToHome()" aria-label="Retourner à la page d'accueil" role="img">mdi-home</v-icon>
  <v-icon>mdi-chevron-right</v-icon>
  <span @click="goToHome()" class="v-slider__thumb" aria-label="Retourner à l'interface de vérification" role="img">Accueil</span>
  <v-icon>mdi-chevron-right</v-icon>
  <span aria-label="Vous êtes sur la page 1" role="img">
    Page 1
  </span>
</nav>
```

> L'attribut <b>class="v-slider__thumb"</b> associé à l'attribut <b>@click="goToHome()"</b> permet d'activer la reconnaissance d'une balise <b>< span></b> en tant que lien.

</ul>

<!-- Balise de fermeture de l'indentation des sous-titres du chapitre III -->
</ul>

[Sommaire](#sommaire)

<a id="test" />

## V. Tests

<!-- Balise d'ouverture de l'indentation des sous-titres du chapitre IV -->
<ul>
Plusieurs outils permettent de contrôler que le code de l'application respecte les règles d'accessibilité. 

* Application.s lourde.s :
    * NVDA (application open source pour ordinateur). Lecteur d'écran.

<br>

* Plugins pour navigateurs :

|    Nom de l'application     |  Navigateurs supportés  | Fonctionnalité.s                                                                                                                                                                                                                                          |
|:---------------------------:|:-----------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|          NoCoffee           |         FireFox         | Simule des altérations de la perception visuelle (couleurs, dégénération maculaire, etc.)                                                                                                                                                                 |
|  IBM Accessibility Checker  |     FireFox, Chrome     | Analyse l'accessibilité d'une page et propose une manière de corriger les erreurs (ne recharge pas la page pour effectuer le test)                                                                                                                        |
|         LightHouse          |         Chrome          | Analyse l'accessibilité d'une page et propose une manière de corriger les erreurs (doit recharger la page pour effectuer le test)                                                                                                                         |
|    Wave Evaluation Tool     |     FireFox, Chrome     | Affiche l'ordre de défilement des éléments de l'interface (via la touche Tab). <br/> Affiche la structure de l'interface. <br/> Contrôle le taux de contraste entre les éléments superposés et propose un pickup color intégré pour effectuer des tests.  |
|    WCAG Contrast checker    |     Firefox, Chrome     | Contrôle le taux de contraste entre les éléments superposés et propose un pickup color intégré pour effectuer des tests.                                                                                                                                  |

<!-- Balise de fermeture de l'indentation des sous-titres du chapitre IV -->
</ul>

[Sommaire](#sommaire)
