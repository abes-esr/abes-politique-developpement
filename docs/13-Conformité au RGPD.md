# Conformité au RGPD

## Cookies et autres traceurs
### Cadre juridique

Lorsqu'ils visitent un site web, les utilisateurs doivent être informés et donner leur consentement préalablement au dépôt ou la lecture de cookies et autres traceurs, à moins que ces traceurs ne bénéficient d’une des exemptions prévues par l’[article 82 de la loi Informatique et Libertés](https://www.cnil.fr/fr/la-loi-informatique-et-libertes#article82).

Les cookies permettant de collecter les données personnelles de l'utilisateur doivent faire l'objet d'une **information** et d'un **recueil de consentement**
Seuls les cookies indispensables au bon fonctionnement du site sont exemptés de consentement, mais ils doivent être consultables dans le bandeau de recueil de consentement et dans la page de politique des cookies.

Pour rappel, d'après la CNIL
*L'article 5(3) de la directive 2002/58/CE modifiée en 2009 pose le principe :*
- *d'un consentement préalable de l'utilisateur avant le stockage d'informations sur son terminal ou l'accès à des informations déjà stockées sur celui-ci ;*
- *sauf si ces actions sont strictement nécessaires à la fourniture d'un service de communication en ligne expressément demandé par l'utilisateur ou ont pour finalité exclusive de permettre ou faciliter une communication par voie électronique.*

Pour plus de précisions, vous pouvez vous référer au [site web de la CNIL](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/que-dit-la-loi).
### Rédaction de la politique de cookies

La politique des cookies permet d'informer les utilisateurs sur la nature des cookies qui sont stockés par le site web dans leur navigateur.
Elle concerne l'intégralité des cookies : les cookies tiers comme les cookies nécessaires au bon fonctionnement de l'application.
Une page accessible aux utilisateurs depuis l'application doit lister les cookies déposés par celle-ci. 

Ces informations doivent être listées sur la page de la politique de confidentialité et les mentions légales doivent faire figurer un lien vers celle-ci.

Pour chaque cookie, la page doit préciser : 
- Son nom
- Sa finalité
- Sa durée de stockage

Pour ce faire, avant de rédiger la politique, il est nécessaire de recenser exhaustivement tous les cookies utilisés par le site web.
Il est à noter que les cookies tiers peuvent évoluer et être mis à jour par leurs éditeurs, ce qui implique la mise à jour régulière de la politique relative aux cookies.
La politique des cookies doit également préciser à l'utilisateur de manière claire qu'il a le choix d'accepter ou refuser les cookies.

Vous pouvez consulter un exemple sur la page dédiée à la gestion des données personnelles et des cookies du site [theses.fr](https://abes.fr/pages-donnees-personnelles/thesesfr.html)

### Tarteaucitron : bandeau de recueil de consentement

Tarteaucitorn est un outil open-source javascript utiliser dans la gestion des cookies sur les sites web. Il est facilement et rapidement implémentable, il est spécifiquement concu pour répondre aux exigences du RGPD en matière de consentement des utilisateurs pour le dépôt de cookies.
Il prend en charge une large gamme de services tiers.

#### Fonctionnalités
- Gestion des catégories de cookies: Vous pouvez catégoriser vos cookies (nécessaires, statistiques, marketing, etc.) pour offrir à l'utilisateur un choix plus granulaire.
- Personnalisation de l'apparence du bandeau (couleurs, textes, position).
- Suivi des consentements: Tarteaucitron permet de suivre les choix des utilisateurs et de générer des rapports.
- Intégration avec d'autres outils: Tarteaucitron peut être intégré avec d'autres outils de gestion de consentement ou de protection des données.

#### Mise en place
[Guide d'installation](https://tarteaucitron.io/fr/install/)

##### VueJS

##### HTML
1. Collez le script suivant dans le head de la ou des pages.s concernée.s
2. Rendez-vous à l'étape 3 du [Guide d'installation](https://tarteaucitron.io/fr/install/) et cherchez les services tiers qui déposent des traceurs sur votre site (ex: reCAPTCHA de *Google*).
3. Le guide vous donne les scripts et balises à ajouter à votre page 


` <head>

        <script src="/tarteaucitron/tarteaucitron.js"></script>

        <script type="text/javascript">
        tarteaucitron.init({
    	  "privacyUrl": "", /* Privacy policy url */
          "bodyPosition": "bottom", /* or top to bring it as first element for accessibility */

    	  "hashtag": "#tarteaucitron", /* Open the panel with this hashtag */
    	  "cookieName": "tarteaucitron", /* Cookie name */
    
    	  "orientation": "middle", /* Banner position (top - bottom) */
       
          "groupServices": false, /* Group services by category */
          "showDetailsOnClick": true, /* Click to expand the description */
          "serviceDefaultState": "wait", /* Default state (true - wait - false) */
                           
    	  "showAlertSmall": false, /* Show the small banner on bottom right */
    	  "cookieslist": false, /* Show the cookie list */
                           
          "closePopup": false, /* Show a close X on the banner */

          "showIcon": true, /* Show cookie icon to manage cookies */
          //"iconSrc": "", /* Optionnal: URL or base64 encoded image */
          "iconPosition": "BottomRight", /* BottomRight, BottomLeft, TopRight and TopLeft */

    	  "adblocker": false, /* Show a Warning if an adblocker is detected */
                           <
          "DenyAllCta" : tr<ue, /* Show the deny all button */
          "AcceptAllCta" : <true, /* Show the accept all button when highPrivacy on */
          "highPrivacy": true, /* HIGHLY RECOMMANDED Disable auto consent */
          "alwaysNeedConsent": false, /* Ask the consent for "Privacy by design" services */
                           
    	  "handleBrowserDNTRequest": false, /* If Do Not Track == 1, disallow all */

    	  "removeCredit": false, /* Remove credit link */
    	  "moreInfoLink": true, /* Show more info link */

          "useExternalCss": false, /* If false, the tarteaucitron.css file will be loaded */
          "useExternalJs": false, /* If false, the tarteaucitron.js file will be loaded */

    	  //"cookieDomain": ".my-multisite-domaine.fr", /* Shared cookie for multisite */
                          
          "readmoreLink": "", /* Change the default readmore link */

          "mandatory": true, /* Show a message about mandatory cookies */
          "mandatoryCta": true, /* Show the disabled accept button when mandatory on */
    
          //"customCloserId": "", /* Optional a11y: Custom element ID used to open the panel */
          
          "googleConsentMode": true, /* Enable Google Consent Mode v2 for Google ads and GA4 */
          
          "partnersList": false /* Show the number of partners on the popup/middle banner */
        });
        </script>`

**Exemple pour ReCAPTCHA :**

1. Ajoutez ce code Javascript à la suite du script principal de Tarteaucitron pour initialiser le service :

`<script type="text/javascript">
   tarteaucitron.user.recaptchaapi = 'XXXXX';
   (tarteaucitron.job = tarteaucitron.job || []).push('recaptcha');
   </script>`

2. Ajoutez cette balise à l'endroit ou le service doit s'afficher :

`<div class="g-recaptcha" data-sitekey="sitekey"></div>`

3. Retirez le script original de l'outil tiers :

`<script src='https://www.google.com/recaptcha/api.js?render=XXXXX'></script>`