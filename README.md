# Codiscovery - Spotify Web Player

---

# Installation

- Téléchargez [Node.JS](https://nodejs.org/en/download/)
- Téléchargez [VSCode](https://code.visualstudio.com/) ou [Atom](https://atom.io/)
- Téléchargez [Chrome](https://www.google.com/chrome/)
- Créez un compte [Spotify](https://www.spotify.com/fr/) si vous n'en avez pas déjà un
- Ouvrez le Terminal/Invite de commandes (en mode administrateur pour Windows) et utilisez la commande `npm i -g create-react-app` pour installer un serveur de développement pour des applications HTML/CSS/JS

N.B : Ceux qui veulent tenter de tout faire par eux-mêmes peuvent démarrer maintenant en clonant le master. Lancez la commande `npm i` et ensuite `npm start` pour voir le résultat final. N'hésitez pas à poser des questions.

# Explications

La création de l'application sera séparée en étapes. Chaque étape aura sa solution à la fin. Et avant de passer à l'étape suivante, une petite phrase vous expliquera ce qu'il faut pour passer à l'étape suivante (si vous n'avez pas utilisé la solution).

Les instructions sont parfois très détaillées : elles le sont pour ceux qui découvrent la programmation.

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

- Téléchargez cette [image](./public/favicon.png) dans le dossier `spotify_web_player/public` sans la renommer.

Ouvrez le dossier `spotify_web_player` dans votre éditeur de texte. On va pouvoir commencer à coder ! 🤗

⚠️ L'API de Spotify a changé dernièrement : il vous faut avoir un compte Spotify et vous authentifier (ce qui fait beaucoup en 2h).

Insérez ce code de base pour faciliter votre démarrage :

<details>
<summary>Démarrage</summary>

- `public/index.html` remplacez tout le `body` par ça :

```html
<div class="col-xs-12 login">
  <p>To use the player, login with your Spotify account</p>
  <button id="login" class="btn btn-default text-align">Login</button>
</div>
```

- `src/index.js`

```js
let accessToken = null;

const login = (callback) => {
  const CLIENT_ID = '7b1fc9ad7b5d4197a17901f7b62677e0';
  const REDIRECT_URI = 'http://labs.kryptonik.net/spotify-oauth-localhost-proxy/';
  const getLoginURL = (scopes) => {
      return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
        '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
        '&scope=' + encodeURIComponent(scopes.join(' ')) +
        '&response_type=token';
  };
  
  const url = getLoginURL([
      'user-read-email'
  ]);
  
  const width = 450;
  const height = 730;
  const left = (screen.width / 2) - (width / 2); // eslint-disable-line no-restricted-globals
  const top = (screen.height / 2) - (height / 2); // eslint-disable-line no-restricted-globals

  window.addEventListener("message", (event) => {
      var hash = JSON.parse(event.data);
      if (hash.type == 'access_token') {
          accessToken = hash.access_token;
          callback(null, true);
      }
  }, false);
  
  const w = window.open(url,
    'Spotify',
    'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
  );
}

const displaySearch = () => {
  $('.login').hide();
  // To uncomment after step 2
  // $('.input-group').css({
  //   display: 'table',
  // });
};

$('#login').click(() => {
  login(displaySearch);
});

login(displaySearch);
```

</details>


# Etape 1 - Les imports externes

- Dans le `head` du fichier `public/index.html`:
  - ajoutez la balise auto-fermante `link`
    - avec l'attribut `rel` et la valeur `stylesheet`
    - avec l'attribut `href` et la valeur `https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css`
  - ajoutez la balise auto-fermante `link`
    - avec l'attribut `rel` et la valeur `stylesheet`
    - avec l'attribut `href` et la valeur `https://fonts.googleapis.com/icon?family=Material+Icons`

<details>
<summary>Réponse</summary>

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
```

</details>


Avant de passer à l'étape suivante, vérifiez que la police d'écriture a changé

# Etape 2 - HTML

Dans le fichier `public/index.html`

- Changez le contenu de la balise `title` dans le `head` en *Spotify Player - Codiscovery*
- Avant la balise de fermeture `</body>`, placez le code suivant :

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

- Replacez l'élément `div.login` juste en dessous de la balise `h1`


<details>
<summary>Réponse</summary>

```html
<div class="container-fluid">
  <h1>Spotify</h1>
  <div class="col-xs-12 login">
    <p>To use the player, login with your Spotify account</p>
    <button id="login" class="btn btn-default text-align">Login</button>
  </div><!-- /.login -->
  <div class="input-group col-xs-10 col-xs-offset-1">
    <input id="text" class="form-control" placeholder="Album..." />
    <span class="input-group-btn">
      <button id="search" type="button" class="btn btn-default">Search</button>
    </span>
  </div><!-- /.input-group -->

  <div id="list"></div>
  <div id="player-container"></div>
</div><!-- /.container-fluid -->
```

</details>


Admirez votre travail sur le navigateur. Vous devez voir votre titre, un formulaire pour taper du texte et un bouton (les 2 dernières `div` ne sont pas visibles : c'est normal).


# Etape 3 - Avec un peu d'`id` et de `class`, on a beaucoup de `style`

- Dans le `public/index.html`, dans le `head` ajoutez la balise `link`
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
  - ajoutez le sélecteur `.input-group` et dans ce sélecteur
    - ajoutez la propriété `background-color` avec la valeur `#2F2F2F`
    - ajoutez la propriété `color` avec la valeur `#F1F1F1`
    - ajoutez la propriété `display` avec la valeur `none`
  - ajoutez le sélecteur `.btn-default` et dans ce sélecteur
    - ajoutez la propriété `background-color` et la valeur `#1ED760`


<details>
<summary>Réponse</summary>

```css
body {
  background-color: #2F2F2F;
  color: #F1F1F1;
  font-family: 'Nunito', sans-serif;
}

.input-group {
  display: none;
  margin-bottom: 20px;
}

.btn-default {
  background-color: #1ED760;
}

h1 {
  color: #1ED760;
  text-align: center;
}
```

</details>


Regardez le résultat dans votre navigateur, la page et le texte ont changé de couleur.

😎 IZI !

# Etape 4 - Détection du click

N.B: On utilisera ES6 (la version moderne de JavaScript)

- Importez jQuery:

```
npm install --save jquery
```

```js
import $ from 'jquery';
```

- Créez la variable constante `attachEvents` qui est une fonction sur laquelle vous attacherez l'événement `click` à l'objet jQuery `#search`.
- Dans cet événement, récupérez la valeur de l'input `#text` avec la méthode jQuery `val` dans une variable constante nommée `query`
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

- `src/index.js`

```js
const itemTemplateSource = $('#result').html();
const itemTemplate = Handlebars.compile(itemTemplateSource);

// ...

    // $('#list').append(`<p>${item.name}</p>`);
    $('#list').append(itemTemplate(item));
```

- `public/index.html`

```html
<script id="result" type="text/x-handlebars-template">
  <div class="row album">
    <div class="col-xs-3 pic">
      <i class="material-icons play-btn">play_arrow</i>
      <img src="{{images.0.url}}" data-album-id="{{id}}" class="cover img-responsive" />
    </div>
    <div class="col-xs-9 details">
      <p class="title">{{name}}</p>
      <p class="artist">{{artists.0.name}}</p>
    </div>
  </div>
</script>
```

</details>


# Etape 8 - La beauté du template

- Dans le fichier `public/css/app.css`, ajoutez :
  - le sélecteur `.row.album`
    - avec la propriété `border-top` et sa valeur : `1px solid #CCC`
    - avec la propriété `cursor` et sa valeur `pointer`
  - le sélecteur `.row.album:hover`
    - avec la propriété `background-color` et sa valeur `rgba(0, 0, 0, .4)`
  - le sélecteur `.row.album .play-btn`
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
  - le sélecteur `.cover`
    - avec la propriété `font-size` de valeur `0.8em`
  - le sélecteur `.album .details .artist`
    - avec la propriété `position` de valeur `absolute`
  - le sélecteur `.album .details`
    - avec la propriété `padding-top` de valeur `10px`
    - avec la propriété `padding-left` de valeur `0`


<details>
<summary>Réponse</summary>

```css
.row.album {
  border-top: 1px solid #CCC;
  cursor: pointer;
}

.row.album:hover {
  background-color: rgba(0, 0, 0, .4);
}

.row.album .play-btn {
  display: none;
  position: absolute;
  text-align: center;
  bottom: 5px;
  padding-top: 3px;
  background-color: rgba(0, 0, 0, .4);
  width: 30px;
  height: 30px;
  border-radius: 15px;
}

.row.album:hover .play-btn {
  display: block;
}

.album .details {
  padding-top: 10px;
  padding-left: 0;
}
.album .details .artist {
  font-size: 0.8em;
}

.cover {
  width: 100%;
}
```

</details>


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
Le code est fortement inspiré des tutoriaux de [Spotify](https://developer.spotify.com/web-api/tutorial/) et de [@jmperezperez](https://twitter.com/jmperezperez)