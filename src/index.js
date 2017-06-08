import $ from 'jquery';
import Handlebars from 'handlebars';

let accessToken = null;
const itemTemplateSource = $('#result').html();
const itemTemplate = Handlebars.compile(itemTemplateSource);
const audioPlayer = new Audio();

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
      if (hash.type === 'access_token') {
          accessToken = hash.access_token;
          callback(null, true);
      }
  }, false);
  
  window.open(url,
    'Spotify',
    'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
  );
}

const displaySearch = () => {
  $('.login').hide();
  $('.input-group').css({
    display: 'table',
  });
};

const attachEvents = () => {
  $('#search').click(() => {
    const query = $('#text').val();
    callSpotifyAlbums(query);
  });
  $('#list').on('click', '.album', (e) => {
    const img = $(e.target).parents('.album').find('.cover');
  const id = img.data('albumId');
  callSpotifyTrack(id);
  });

  // for login
  $('#login').click(() => {
    login(displaySearch);
  });
};

const callSpotifyAlbums = (query) => {
  $.ajax({
    url: 'https://api.spotify.com/v1/search',
    data: {
      type: 'album',
      q: query,
    },
    success: (response) => {
      // console.log('Appel serveur réussi');
      $('#list').empty();
      $('#text').val('');
      const items = response.albums.items;
      items.forEach((item) => {
        // $('#list').append(`<p>${item.name}</p>`);
        $('#list').append(itemTemplate(item));
      });
    },
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

const callSpotifyTrack = (albumId) => {
  $.ajax({
    url: 'https://api.spotify.com/v1/albums/' + albumId,
    success: (response) => {
      const track = response.tracks.items[0];
      const url = track.preview_url;
      audioPlayer.pause();
      audioPlayer.src = url;
      audioPlayer.play();
    },
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};


attachEvents();
