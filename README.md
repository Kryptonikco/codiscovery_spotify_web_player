# Codiscovery - Spotify Web Player

---

# Installation

- Téléchargez [Node.JS](https://nodejs.org/en/download/)
- Téléchargez [Atom](https://atom.io/)
- Téléchargez [Chrome](https://www.google.com/chrome/)
- Ouvrez le Terminal/Invite de commandes (en mode administrateur pour Windows) et utilisez la commande `npm i -g create-react-app` pour installer un serveur de développement pour des applications HTML/CSS/JS

# Préparation

Exécutez les commandes suivantes dans le dossier de votre choix (pensez à ouvrir l'invite de commande en administrateur sous Windows) :

```
create-react-app spotify_web_player
cd spotify_web_player
npm start
```

Votre navigateur devrait s'ouvrir automatiquement à la page : [http://localhost:3000](http://localhost:3000)
Votre application React avec live reload et transpilation de ES6 à ES5 est prête. Comme on ne veut pas utiliser React, on va enlever certains fichiers.

- Ouvrez le dossier `spotify_web_player` dans l'explorateur de fichiers.
- Dans le dossier `spotify_web_player/src` effacez tous les fichiers et créez un fichier `index.js` vide (pour le moment).
- Dans le dossier `spotify_web_player/public`, effacez les fichiers `favicon.ico` et `manifest.json`

- Téléchargez cette [image]() dans le dossier `spotify_web_player/public`

Ouvrez le dossier `spotify_web_player` dans votre éditeur de texte. On va pouvoir commencer à coder ! 🤗

# Etape 1 - Structure de la page HTML (TODO cours sur l'HTML)

# Etape 2 - HTML

Ouvrez le fichier `public/index.html`

- Changez le contenu de la balise `title` dans le `head` en *Spotify Player - Codiscovery*
- Effacez tout entre les balises `body` pour n'avoir que ça :

```html
<body>
</body>
```
- Ajoutez une balise `div`
  - avec l'attribut `class` et la valeur `container-fluid`
  - avec une balise `h1` avec le texte `Spotify` à l'intérieur
  - avec une balise `div` qui contiendra les balises suivantes :
    - avec l'attribut `class` et la valeur `input-group`
    - avec une balise `input` (auto-fermante)
      - avec l'attribut `id` et la valeur `text`
      - avec l'attribut `class` et la valeur `form-control`
      - avec l'attribut `placeholder` et la valeur `Album...`
    - avec une balise `span`
      - avec l'attribut `class` et la valeur `input-group-btn`
      - avec une balise `button`
        - avec l'attribut `id` et la valeur `search`
        - avec l'attribut `class` et la valeur `btn`
        - avec l'attribut `class` et la valeur `btn-default` (vous pouvez mettre plusieurs valeurs dans un même attribut en les séparant par un espace)
        - avec le texte `Search`
  - avec une balise `div`
    - avec l'attribut `id` et la valeur `list`
  - avec une balise `div`
    - avec l'attribut `id` et la valeur `player`

Admirez votre travail sur le navigateur (les 2 dernières `div` ne sont pas visibles : c'est normal).

# Etape 3 - CSS avec Bootstrap

- Dans le `public/index.html`, ajoutez la balise `link`
  - avec l'attribut `rel` et la valeur `stylesheet`
  - avec l'attribut `href` et la valeur `https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css`

Avant de passer à l'étape suivante, vérifiez que la police d'écriture a changé


# Etape 4 - Les bases du CSS (TODO cours sur le CSS)

- Dans le `public/index.html`, ajoutez la balise `link`
  - avec l'attribut `rel` et la valeur `stylesheet`
  - avec l'attribut `href` et la valeur `css/app.css`
- Créez le dossier `css` dans le dossier `public` et créez le fichier `app.css`

- Dans le `public/css/app.css`
  - ajoutez le sélecteur `body` et dans ce sélecteur
    - ajoutez la propriété `background-color` avec la valeur `#2F2F2F`
    - ajoutez la propriété `color` avec la valeur `#F1F1F1`
    - ajoutez la propriété `font-family` avec la valeur `Arial, sans-serif`
  - ajoutez le sélecteur `h1` et dans ce sélecteur
    - ajoutez la propriété `color` avec la valeur `#1ED760`
    - ajoutez la propriété `text-align` avec la valeur `center`
  - ajoutez le sélecteur `input` et dans ce sélecteur
    - ajoutez la propriété `background-color` avec la valeur `#2F2F2F`
    - ajoutez la propriété `color` avec la valeur `#F1F1F1`
  - ajoutez le sélecteur `button` et dans ce sélecteur
    - ajoutez la propriété `background-color` et la valeur `#1ED760`

Regardez le résultat dans votre navigateur, la page et le texte ont changé de couleur.

🤓 IZI !

# Etape 5 - Détection du click (TODO cours sur Javascript)

N.B: On utilisera ES6

- Importez jQuery:

```
npm i jquery
```

```js
import $ from 'jquery';
```

- Créez la variable constante `attachEvents` qui est une fonction sur laquelle vous attacherez l'événement `click` à l'objet jQuery `#search`.
- Dans cet événement, récupérez la valeur de l'input `#text` dans une variable constante nommée `query`
- Toujours dans cet événement, appelez la fonction `callSpotifyAlbums` avec la variable `query` en paramètre.
- Créez la variable constante `callSpotifyAlbums` qui est une fonction à laquelle on mettra temporairement un `console.log` qui appelera la variable `query`
- Enfin, à la dernière ligne, appelez la fonction `attachEvents`

<details>
<summary>Réponse</summary>
```js
const attachEvents = () => {
  $('#search').click(() => {
    const query = $('#text').val();
    callSpotifyAlbums(query);
  });
};

const callSpotifyAlbums = (query) => {
  console.log('>> #callSpotifyAlbums query', query);
};

attachEvents();
```
</details>

Avant de passer à l'étape suivante, tapez un texte, cliquez sur le bouton "Search" et vérifiez que la `query` apparaît dans la console JavaScript de Chrome.

N.B: Pour ouvrir la console: `View > Developer > JavaScript console`

# Etape 6 - Appel à l'API (TODO cours sur les objets et lecture d'API/JSON)

- Créez un appel à la méthode `ajax` de jQuery qui a pour paramètre un objet.

```js
const callSpotifyAlbums = (query) => {
  $.ajax({
    // ...
  });
};
```

- Ajoutez la clé `url` avec pour valeur une chaîne de caractère : `https://api.spotify.com/v1/search`
- Ajoutez la clé `data` qui aura pour valeur, un autre objet :
  - qui aura pour clé `type` de valeur `album` (chaîne de caractère)
  - et une autre clé `q` de valeur `query` (la variable)
- Ajoutez la clé `success` avec pour valeur une fonction qui aura pour paramètre `response` qui contiendra la réponse du serveur Spotify
  - ajoutez un `console.log` qui appelera la variable `response`

N.B: Les appels à une API en JavaScript sont asynchrones. C'est à dire que la réponse ne suit pas la logique de lisibilité du code. Dans notre exemple, on récupère la réponse du serveur distant dans la fonction de clé `success`

Avant de passer à l'étape suivante, vérifiez que vous affichez bien le message de votre `console.log`

# Etape 7 - Faire une boucle (TODO cours sur les boucles `forEach`)

- Dans la fonction qui récupère réponse du serveur, créez une variable `items` qui a pour valeur `response.albums.items`. Le but est uniquement de simplifier la lecture et l'écriture des lignes suivantes pour éviter d'écrire `response.albums.items`.
- Faites une boucle `forEach` sur la variable `items`
- Dans la fonction de cette boucle qui aura pour paramètre la variable `item` (au singulier) appelez la div `#list` avec jQuery et ajoutez temporairement une balise `p` qui contiendra le titre de l'album que l'on récupère avec la variable `item.name`. Utilisez la méthode `append` pour ajouter un élément à un autre.  

# Etape 8 - La puissance du template

- Dans le fichier `public/index.html`,  

# Etape 9 - Let the music play



# Etape 10 - Gérer les exceptions (TODO cours sur les conditions) (TODO certains titre sont `null` et renvoient une erreur)

# Etape 11 - Avec un peu d'`id` et de `class`, on a beaucoup de `style`


# Bonus 1 - Police d'écriture

- Nunito

# Bonus 2 - Template du player

# Master Bonus - Lister les titres d'un album
