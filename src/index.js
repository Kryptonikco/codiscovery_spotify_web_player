import $ from 'jquery';
import Handlebars from 'handlebars';

let accessToken = null;
const itemTemplateSource = $('#result').html();
const itemTemplate = Handlebars.compile(itemTemplateSource);
const playerTemplateSource = $('#player').html();
const playerTemplate = Handlebars.compile(playerTemplateSource);
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
  // extra: start a search by typing `enter` instead of clicking on the button
  $('.input-group').keypress((e) => {
    if (e.which === 13) {
      const query = $('#text').val();
      callSpotifyAlbums(query);
    }
  });
};

const callSpotifyAlbums = (query) => {
  $.ajax({
    url: 'https://api.spotify.com/v1/search',
    data: {
      type: 'album',
      q: query,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    success: (response) => {
      // console.log('#callSpotifyAlbums response', response.albums.items);
      $('#list').empty();
      $('#text').val('');
      const items = response.albums.items;
      items.forEach((item) => {
        $('#list').append(itemTemplate(item));
      });
    }
  });
};

const callSpotifyTrack = (albumId) => {
  $.ajax({
    url: 'https://api.spotify.com/v1/albums/' + albumId,
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    success: (response) => {
      // console.log('#callSpotifyTrack response', response);
      const track = response.tracks.items[0]; // to simplify we purposefully use the first track of each album
      const url = track.preview_url;

      audioPlayer.pause();
      audioPlayer.src = url;
      audioPlayer.play();
    }
  });
};


attachEvents();
