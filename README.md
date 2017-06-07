# Codiscovery - Spotify Web Player

---

# Installation

- Téléchargez [Node.JS](https://nodejs.org/en/download/)
- Téléchargez [VSCode](https://code.visualstudio.com/) ou [Atom](https://atom.io/)
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

- Téléchargez cette [image](./public/favicon.png) dans le dossier `spotify_web_player/public`

Ouvrez le dossier `spotify_web_player` dans votre éditeur de texte. On va pouvoir commencer à coder ! 🤗

# Etape 1 - HTML

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

# Etape 2 - Les imports externes

- Dans le `public/index.html`:
  - ajoutez la balise `link`
    - avec l'attribut `rel` et la valeur `stylesheet`
    - avec l'attribut `href` et la valeur `https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css`
  - ajoutez la balise `link`
    - avec l'attribut `rel` et la valeur `stylesheet`
    - avec l'attribut `href` et la valeur `https://fonts.googleapis.com/icon?family=Material+Icons`

Avant de passer à l'étape suivante, vérifiez que la police d'écriture a changé


# Etape 3 - Avec un peu d'`id` et de `class`, on a beaucoup de `style`

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

# Etape 4 - Détection du click

N.B: On utilisera ES6

- Importez jQuery:

```
npm install --save jquery
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

# Etape 5 - Appel à l'API 

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


<details>
<summary>Réponse</summary>

```js
  $.ajax({
    url: 'https://api.spotify.com/v1/search',
    data: {
      type: 'album',
      q: query,
    },
    success: (response) => {
      console.log('Appel serveur réussi');
    }
  });
```

</details>

# Etape 6 - Faire une boucle

- Dans la fonction qui récupère réponse du serveur, créez une variable `items` qui a pour valeur `response.albums.items`. Le but est uniquement de simplifier la lecture et l'écriture des lignes suivantes pour éviter d'écrire `response.albums.items`.
- Faites une boucle `forEach` sur la variable `items`
- Dans la fonction de cette boucle qui aura pour paramètre la variable `item` (au singulier) appelez la div `#list` avec jQuery et ajoutez temporairement une balise `p` qui contiendra le titre de l'album que l'on récupère avec la variable `item.name`. Utilisez la méthode `append` pour ajouter un élément à un autre.  


<details>
<summary>Réponse</summary>

```js
  $.ajax({
    url: 'https://api.spotify.com/v1/search',
    data: {
      type: 'album',
      q: query,
    },
    success: (response) => {
      // console.log('Appel serveur réussi');

      const items = response.albums.items;
      items.forEach((item) => {
        $('#list').append(`<p>${item.name}</p>`);
      });
    }
  });
```

</details>

Pour passer à l'étape suivante, faîtes une recherche et vérifiez que les titres d'albums apparaîssent.

![trap](./trap.gif)

Oups 😅 : Faites une autre recherche lorsque la précédente est affichée et vous verrez la nouvelle recherche apparaître en bas.
C'est sûrement pas le résultat escompté...
Si vous utilisez la méthode `empty` sur un objet jQuery, vous pourrez vider un node du DOM, avant de le remplir avec `append`.

<details>
<summary>Réponse</summary>

```js
  $.ajax({
    url: 'https://api.spotify.com/v1/search',
    data: {
      type: 'album',
      q: query,
    },
    success: (response) => {
      // console.log('Appel serveur réussi');
      $('#list').empty();
      const items = response.albums.items;
      items.forEach((item) => {
        $('#list').append(`<p>${item.name}</p>`);
      });
    }
  });
```

</details>


# Etape 7 - La puissance du template

- Dans le fichier `public/index.html`, au dessus de la balise fermante de `body` : ajoutez la balise `script` :
  - avec l'id `result`
  - avec l'attribut `type` de valeur `text/x-handlebars-template`
  - avec une balise `div`
    - avec les classes `row` et `album`
    - avec une balise `div` de classe `pic`
      - avec une balise `i`
        - avec les classes `material-icons` et `play-btn`
        - avec le texte `play_arrow`
      - avec une balise `img`
        - avec les classes `cover` et `img-responsive`
        - avec l'attribut `src` et la valeur `{{images.0.url}}`
        - avec l'attribut personnalisé `data-album-id` de valeur `{{id}}`
    - avec une balise `div` de classe `details`
      - avec une balise `p`
        - de classe `title`
        - avec le texte `{{name}}`
      - avec une autre balise `p`
        - de classe `artist`
        - avec le texte `{{artists.0.name}}`

- Maintenant, on va modifier notre code précédent pour qu'il utilise notre template. Importez Handlebars au début de votre fichier `src/index.js`

```
npm install --save handlebars
```

```js
import Handlebars from 'handlebars';
```

- Appelez le node que vous venez de créer dans la variable `itemTemplateSource`. Avec jQuery, vous utiliserez la méthode `html`
- Ensuite, créer la variable `itemTemplate` qui contiendra le template Handlebars. Utilisez la méthode `compile` de `Handlebars` qui attend en paramètre de l'HTML.
- Revenez sur le code écrit dans l'étape précédente. Dans la méthode `append` effacez tout son contenu, et remplacez le par le template :

<details>
<summary>Réponse</summary>

```js
const itemTemplateSource = $('#result').html();
const itemTemplate = Handlebars.compile(itemTemplateSource);

// ...

    // $('#list').append(`<p>${item.name}</p>`);
    $('#list').append(itemTemplate(item));
```

</details>



# Etape 8 - La beauté du template

- Dans le fichier `public/css/app.css`, ajoutez :
  - le sélecteur `.row.album`
    - avec la propriété `border-top` et sa valeur : `1px solid #CCC`
    - avec la propriété `cursor` et sa valeur `pointer`
  - le sélecteur `.row.album:hover`
    - avec la propriété `background-color` et sa valeur `rgba(0, 0, 0, .4)`
  - le sélecteur `.row.album play-btn`
    - avec la propriété `position` de valeur `absolute`
    - avec la propriété `display` de valeur `none`
    - avec la propriété `text-align` de valeur `center`
    - avec la propriété `bottom` de valeur `5px`
    - avec la propriété `background-color` de valeur `rgba(0, 0, 0, .4)`
    - avec la propriété `width` de valeur `30px`
    - avec la propriété `height` de valeur `30px`
    - avec la propriété `border-radius` de valeur `15px`
  - le sélecteur `.row.album:hover play-btn`
    - avec la propriété `display` de valeur `block`

Vous voyez le bouton Play quand vous passez la souris sur un item ? Alors passez à l'étape suivante 😬

# Etape 9 - Let's the music play

- Créez en début de fichier `src/index.js` la variable constante `audioPlayer` qui sera une instance de l'objet natif `Audio` en HTML5.
- Dans la fonction `attachEvents`, ajoutez l'event `click` via la méthode jQuery [on](http://api.jquery.com/on/#on-events-selector-data-handler) et ajoutez `.album` en sélecteur
- Récupérez la valeur `-data-album-id` dans l'image de l'item
  1. Nommez `e` le paramètre de la fonction de votre événement
  2. Créez une variable `img` qui contiendra le node `img`. Pour le faire, utilisez les méthodes `parents` et `find` de jQuery sur l'objet `e.target` que vous aurez transformez en objet jQuery au préalable.
  3. Utilisez la méthode jQuery `data` sur la variable `img`. Notez que pour appeler l'attribut HTML `data-album-id`, en JavaScript vous utiliserez `albumId`. Oui, oui! 🤓
  4. Récupérez l'album ID et envoyez le en paramètre d'une fonction (pas encore créée) qu'on appellera `callSpotifyTrack`
- Créez la fonction `callSpotifyTrack` qui fera un appel à la méthode `ajax` de jQuery qui a pour paramètre un objet.

```js
const callSpotifyAlbums = (query) => {
  $.ajax({
    // ...
  });
};
```

- Ajoutez la clé `url` avec pour valeur une chaîne de caractère : `http://api.spotify.com/v1/albums/<albumId>` (en remplaçant `<albumId>` par la variable) 
- Ajoutez la clé `success` avec pour valeur une fonction qui aura pour paramètre `response` qui contiendra la réponse du serveur Spotify
  - créez la variable `track` qui contiendra la 1ère chanson de l'album que vous récupérerez avec `response.tracks.items[0]`
  - créez la variable `url` où vous récupérerez la `preview_url` de l'objet `track`
  - appelez la méthode `pause` sur l'instance `audioPlayer` (pour éviter 2 chansons qui jouent en même temps)
  - assignez la variable `url` à la propriété `src` d'`audioPlayer`
  - appelez la méthode `play` de la variable `audioPlayer`

<details>
<summary>Réponse</summary>

```js
const callSpotifyTrack = (albumId) => {
  $.ajax({
    url: 'https://api.spotify.com/v1/albums/' + albumId,
    success: (response) => {
      const track = response.tracks.items[0];
      const url = track.preview_url;
      audioPlayer.pause();
      audioPlayer.src = url;
      audioPlayer.play();
    }
  });
};
```

</details>

Faites une recherche et cliquez sur une musique (assurez vous que le son de votre ordinateur est audible).

Si vous avez fini, voici d'autres exercices pour améliorer votre produit

# Bonus 1 - Police d'écriture

Ajoutez la police d'écriture [Nunito](https://fonts.google.com/specimen/Nunito) en tant que police par défaut.

Référez vous à l'étape 2 si vous oubliez comment faire

# Bonus 2 - Template du player

Créez un autre template pour que l'on voit le titre de la musique qui joue

Référez vous à l'étape 7 si vous oubliez comment faire

# Master Bonus - Lister les titres d'un album

Vous avez aussi fini ça ? 😳
GG !

Créez un template qui apparaitra quand on clique sur l'item et qui affiche un sous-template avec tous les titres de l'album.
Et une fois qu'on clique sur un titre, on entend ce morceau spécifique.

GLHF!

# THE END

Tutoriel créé par [Kryptonik 🍃 Evolving with technology](http://kryptonik.net)